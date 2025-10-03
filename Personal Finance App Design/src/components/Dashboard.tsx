import { Eye, EyeOff, Plus, Send, Download, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { SendMoneyModal } from './SendMoneyModal';
import { RequestMoneyModal } from './RequestMoneyModal';
import { PayBillsModal } from './PayBillsModal';
import { currency, transactionStyles, responsive, animations, layouts, dynamic } from '../utils/tailwind';

export function Dashboard() {
  const [showBalance, setShowBalance] = useState(true);
  const [sendMoneyOpen, setSendMoneyOpen] = useState(false);
  const [requestMoneyOpen, setRequestMoneyOpen] = useState(false);
  const [payBillsOpen, setPayBillsOpen] = useState(false);
  
  const balance = 2543750.50;
  const monthlyIncome = 850000.00;
  const monthlyExpenses = 456230.75;

  const quickActions = [
    { icon: Send, label: 'Send Money', color: 'bg-blue-500' },
    { icon: Download, label: 'Request', color: 'bg-green-500' },
    { icon: Plus, label: 'Pay Bills', color: 'bg-purple-500' },
    { icon: MoreHorizontal, label: 'Savings', color: 'bg-gray-500' },
  ];

  const recentTransactions = [
    { id: 1, name: 'Shoprite Victoria Island', amount: -15420.00, date: 'Today', category: 'Food' },
    { id: 2, name: 'Salary - Andela Nigeria', amount: 425000.00, date: 'Yesterday', category: 'Income' },
    { id: 3, name: 'Netflix Subscription', amount: -2900.00, date: '2 days ago', category: 'Entertainment' },
    { id: 4, name: 'Uber Ride - Ikeja', amount: -3500.00, date: '3 days ago', category: 'Transport' },
  ];

  return (
    <div className={`${responsive.padding.page} space-y-6`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl text-foreground">Good morning,</h1>
          <p className="text-muted-foreground">Adebayo Oladele</p>
        </div>
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <span className="text-primary">AO</span>
        </div>
      </div>

      {/* Balance Card */}
      <Card className={`${responsive.padding.card} bg-gradient-to-r from-primary to-primary/90 text-primary-foreground ${animations.card}`}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-primary-foreground/70 mb-2">Total Balance</p>
            <div className="flex items-center gap-3">
              <h2 className={`text-3xl ${dynamic.balanceVisibility(showBalance)}`}>
                {showBalance ? currency.format(balance, { showSign: false }) : '••••••'}
              </h2>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                aria-label={showBalance ? 'Hide balance' : 'Show balance'}
              >
                {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between text-sm">
          <div>
            <p className="text-primary-foreground/70">Monthly Income</p>
            <p className="text-green-300">{currency.format(monthlyIncome)}</p>
          </div>
          <div className="text-right">
            <p className="text-primary-foreground/70">Monthly Expenses</p>
            <p className="text-red-300">{currency.format(-monthlyExpenses)}</p>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div>
        <h3 className="mb-4 text-foreground">Quick Actions</h3>
        <div className={responsive.grid.actions}>
          {quickActions.map((action) => {
            const Icon = action.icon;
            
            const handleQuickAction = () => {
              switch (action.label) {
                case 'Send Money':
                  setSendMoneyOpen(true);
                  break;
                case 'Request':
                  setRequestMoneyOpen(true);
                  break;
                case 'Pay Bills':
                  setPayBillsOpen(true);
                  break;
                case 'Savings':
                  console.log('Opening Savings screen...');
                  alert('Savings feature - Coming soon!');
                  break;
                default:
                  console.log(`${action.label} action triggered`);
              }
            };
            
            return (
              <button
                key={action.label}
                onClick={handleQuickAction}
                className={`flex flex-col items-center p-4 rounded-xl bg-muted hover:bg-muted/80 ${animations.button}`}
                aria-label={action.label}
              >
                <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-2`}>
                  <Icon size={20} className="text-white" />
                </div>
                <span className="text-xs text-muted-foreground text-center">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-foreground">Recent Transactions</h3>
          <Button variant="ghost" size="sm" className="text-primary">
            See All
          </Button>
        </div>
        
        <div className={responsive.grid.transactions}>
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className={layouts.transactionItem}>
              <div className="flex items-center gap-3">
                <div className={transactionStyles.iconContainer(transaction.amount)}>
                  <span className="text-sm">
                    {transaction.category === 'Income' ? '💰' : transaction.category === 'Food' ? '🛒' : transaction.category === 'Entertainment' ? '🎬' : '⛽'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{transaction.name}</p>
                  <p className="text-sm text-muted-foreground">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${transactionStyles.amount(transaction.amount, 'bold')}`}>
                  {currency.format(transaction.amount)}
                </p>
                <p className="text-xs text-gray-500">{transaction.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <SendMoneyModal 
        isOpen={sendMoneyOpen} 
        onClose={() => setSendMoneyOpen(false)} 
      />
      <RequestMoneyModal 
        isOpen={requestMoneyOpen} 
        onClose={() => setRequestMoneyOpen(false)} 
      />
      <PayBillsModal 
        isOpen={payBillsOpen} 
        onClose={() => setPayBillsOpen(false)} 
      />
    </div>
  );
}