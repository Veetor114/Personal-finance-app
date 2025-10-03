import { useState } from 'react';
import { X, Send } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { currency, forms, animations } from '../utils/tailwind';

interface SendMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SendMoneyModal({ isOpen, onClose }: SendMoneyModalProps) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMoney = async () => {
    if (!recipient || !amount || parseFloat(amount) <= 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-3b6cb73c/send-money`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          recipient,
          amount: parseFloat(amount),
          description,
          senderName: 'You'
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setRecipient('');
        setAmount('');
        setDescription('');
        onClose();
      } else {
        toast.error(data.error || 'Failed to send money');
      }
    } catch (error) {
      console.error('Send money error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatAmount = (value: string) => {
    const num = parseFloat(value.replace(/,/g, ''));
    return isNaN(num) ? '' : currency.display(num, 'compact');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send size={20} className="text-primary" />
            Send Money
          </DialogTitle>
          <DialogDescription>
            Transfer money to anyone using their name or account number.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="recipient">Recipient Name or Account</Label>
            <Input
              id="recipient"
              placeholder="Enter recipient name or account number"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="amount">Amount (₦)</Label>
            <Input
              id="amount"
              type="text"
              placeholder="0"
              value={amount}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.]/g, '');
                setAmount(value);
              }}
              className="mt-1"
            />
            {amount && (
              <p className="text-sm text-muted-foreground mt-1">
                Preview: {formatAmount(amount)}
              </p>
            )}
          </div>
          
          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              placeholder="What's this for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
        
        <div className="flex gap-3 pt-4">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="flex-1"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSendMoney}
            className={`flex-1 bg-success hover:bg-success/90 ${animations.button}`}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Money'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}