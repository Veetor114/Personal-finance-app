import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase client with service role key
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-3b6cb73c/health", (c) => {
  return c.json({ status: "ok" });
});

// Send money endpoint
app.post("/make-server-3b6cb73c/send-money", async (c) => {
  try {
    const { recipient, amount, description, senderName } = await c.req.json();
    
    if (!recipient || !amount || amount <= 0) {
      return c.json({ error: "Invalid recipient or amount" }, 400);
    }

    // Generate transaction ID
    const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Store transaction in KV store
    const transaction = {
      id: transactionId,
      type: "send",
      recipient,
      amount: parseFloat(amount),
      description: description || "",
      senderName: senderName || "You",
      status: "completed",
      date: new Date().toISOString(),
      category: "Transfer"
    };

    await kv.set(`transaction_${transactionId}`, transaction);
    
    // Also store in recent transactions list
    const recentKey = "recent_transactions";
    const recent = await kv.get(recentKey) || [];
    recent.unshift(transaction);
    // Keep only last 50 transactions
    if (recent.length > 50) recent.pop();
    await kv.set(recentKey, recent);

    console.log(`Money sent successfully: ${amount} to ${recipient}`);
    return c.json({ 
      success: true, 
      transactionId,
      message: `₦${amount.toLocaleString()} sent to ${recipient} successfully` 
    });
  } catch (error) {
    console.error("Send money error:", error);
    return c.json({ error: "Failed to send money" }, 500);
  }
});

// Request money endpoint
app.post("/make-server-3b6cb73c/request-money", async (c) => {
  try {
    const { from, amount, description } = await c.req.json();
    
    if (!from || !amount || amount <= 0) {
      return c.json({ error: "Invalid recipient or amount" }, 400);
    }

    // Generate request ID
    const requestId = `REQ_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Store request in KV store
    const request = {
      id: requestId,
      type: "request",
      from,
      amount: parseFloat(amount),
      description: description || "",
      status: "pending",
      date: new Date().toISOString(),
      category: "Request"
    };

    await kv.set(`request_${requestId}`, request);

    console.log(`Money requested successfully: ${amount} from ${from}`);
    return c.json({ 
      success: true, 
      requestId,
      message: `Request for ₦${amount.toLocaleString()} sent to ${from}` 
    });
  } catch (error) {
    console.error("Request money error:", error);
    return c.json({ error: "Failed to request money" }, 500);
  }
});

// Get transactions endpoint
app.get("/make-server-3b6cb73c/transactions", async (c) => {
  try {
    const transactions = await kv.get("recent_transactions") || [];
    return c.json({ transactions });
  } catch (error) {
    console.error("Get transactions error:", error);
    return c.json({ error: "Failed to get transactions" }, 500);
  }
});

// Pay bills endpoint
app.post("/make-server-3b6cb73c/pay-bills", async (c) => {
  try {
    const { billType, provider, amount, accountNumber } = await c.req.json();
    
    if (!billType || !provider || !amount || amount <= 0) {
      return c.json({ error: "Invalid bill payment details" }, 400);
    }

    // Generate transaction ID
    const transactionId = `BILL_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Store bill payment in KV store
    const transaction = {
      id: transactionId,
      type: "bill_payment",
      billType,
      provider,
      amount: parseFloat(amount),
      accountNumber: accountNumber || "",
      status: "completed",
      date: new Date().toISOString(),
      category: "Bills"
    };

    await kv.set(`transaction_${transactionId}`, transaction);
    
    // Add to recent transactions
    const recentKey = "recent_transactions";
    const recent = await kv.get(recentKey) || [];
    recent.unshift(transaction);
    if (recent.length > 50) recent.pop();
    await kv.set(recentKey, recent);

    console.log(`Bill payment successful: ${billType} - ${provider}`);
    return c.json({ 
      success: true, 
      transactionId,
      message: `₦${amount.toLocaleString()} paid to ${provider} successfully` 
    });
  } catch (error) {
    console.error("Pay bills error:", error);
    return c.json({ error: "Failed to pay bill" }, 500);
  }
});

Deno.serve(app.fetch);