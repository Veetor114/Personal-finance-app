import { useState } from 'react';
import { X, CreditCard } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface PayBillsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const billCategories = [
  { value: 'electricity', label: 'Electricity', providers: ['IKEDC', 'EKEDC', 'NEPA', 'PHED'] },
  { value: 'telecoms', label: 'Telecoms', providers: ['MTN', 'Airtel', 'Glo', '9mobile'] },
  { value: 'cable_tv', label: 'Cable TV', providers: ['DSTV', 'GOtv', 'StarTimes', 'Cable TV'] },
  { value: 'internet', label: 'Internet', providers: ['Spectranet', 'Swift', 'Smile', 'ipNX'] },
  { value: 'water', label: 'Water', providers: ['Lagos Water Corp', 'Abuja Water Board'] }
];

export function PayBillsModal({ isOpen, onClose }: PayBillsModalProps) {
  const [billType, setBillType] = useState('');
  const [provider, setProvider] = useState('');
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const selectedCategory = billCategories.find(cat => cat.value === billType);

  const handlePayBill = async () => {
    if (!billType || !provider || !amount || parseFloat(amount) <= 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-3b6cb73c/pay-bills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          billType,
          provider,
          amount: parseFloat(amount),
          accountNumber
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setBillType('');
        setProvider('');
        setAmount('');
        setAccountNumber('');
        onClose();
      } else {
        toast.error(data.error || 'Failed to pay bill');
      }
    } catch (error) {
      console.error('Pay bills error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatAmount = (value: string) => {
    const num = parseFloat(value.replace(/,/g, ''));
    return isNaN(num) ? '' : num.toLocaleString();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard size={20} className="text-primary" />
            Pay Bills
          </DialogTitle>
          <DialogDescription>
            Pay your electricity, telecom, cable TV, and other utility bills instantly.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="billType">Bill Category</Label>
            <Select value={billType} onValueChange={(value) => {
              setBillType(value);
              setProvider(''); // Reset provider when category changes
            }}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select bill type" />
              </SelectTrigger>
              <SelectContent>
                {billCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCategory && (
            <div>
              <Label htmlFor="provider">Service Provider</Label>
              <Select value={provider} onValueChange={setProvider}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  {selectedCategory.providers.map((prov) => (
                    <SelectItem key={prov} value={prov}>
                      {prov}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div>
            <Label htmlFor="accountNumber">Account/Meter Number</Label>
            <Input
              id="accountNumber"
              placeholder="Enter your account or meter number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
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
                ₦{formatAmount(amount)}
              </p>
            )}
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
            onClick={handlePayBill}
            className="flex-1 bg-destructive hover:bg-destructive/90"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Pay Bill'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}