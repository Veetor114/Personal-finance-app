import { useState } from 'react';
import { X, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface RequestMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RequestMoneyModal({ isOpen, onClose }: RequestMoneyModalProps) {
  const [from, setFrom] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestMoney = async () => {
    if (!from || !amount || parseFloat(amount) <= 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-3b6cb73c/request-money`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          from,
          amount: parseFloat(amount),
          description
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setFrom('');
        setAmount('');
        setDescription('');
        onClose();
      } else {
        toast.error(data.error || 'Failed to request money');
      }
    } catch (error) {
      console.error('Request money error:', error);
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
            <Download size={20} className="text-primary" />
            Request Money
          </DialogTitle>
          <DialogDescription>
            Send a money request to someone and they'll receive a notification.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="from">Request From</Label>
            <Input
              id="from"
              placeholder="Enter name or account number"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
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
          
          <div>
            <Label htmlFor="description">What's this for? (Optional)</Label>
            <Input
              id="description"
              placeholder="Lunch, movie tickets, etc."
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
            onClick={handleRequestMoney}
            className="flex-1 bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? 'Sending Request...' : 'Send Request'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}