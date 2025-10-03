import { CreditCard, User, Shield } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { 
  currency, 
  transactionStyles, 
  responsive, 
  animations, 
  layouts, 
  status,
  nigeria,
  security,
  dynamic,
  cn
} from '../utils/tailwind';

export function TailwindUtilsDemo() {
  const sampleTransactions = [
    { id: 1, amount: 15000, description: 'Salary Payment', status: 'completed' as const },
    { id: 2, amount: -2500, description: 'Grocery Shopping', status: 'completed' as const },
    { id: 3, amount: -500, description: 'Transfer to John', status: 'pending' as const },
  ];

  const banks = ['GTBank', 'Access Bank', 'UBA', 'First Bank'];

  return (
    <div className={cn(responsive.padding.page, 'space-y-6')}>
      <h1>Tailwind Utils Demo</h1>
      
      {/* Currency Formatting Demo */}
      <Card className={layouts.dashboardCard}>
        <h3 className="mb-4">Currency Formatting</h3>
        <div className="space-y-2">
          <p>Standard: {currency.format(1234567.89)}</p>
          <p>Compact: {currency.display(1234567.89, 'compact')}</p>
          <p>No sign: {currency.format(1234567.89, { showSign: false })}</p>
        </div>
      </Card>

      {/* Transaction Styling Demo */}
      <Card className={layouts.dashboardCard}>
        <h3 className="mb-4">Transaction Styling</h3>
        <div className={responsive.grid.transactions}>
          {sampleTransactions.map((transaction) => (
            <div key={transaction.id} className={layouts.transactionItem}>
              <div className="flex items-center gap-3">
                <div className={transactionStyles.iconContainer(transaction.amount)}>
                  <CreditCard size={16} />
                </div>
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <div className={status.transaction(transaction.status)}>
                    {transaction.status}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={transactionStyles.amount(transaction.amount, 'bold')}>
                  {currency.format(transaction.amount)}
                </p>
                <p className="text-xs text-muted-foreground">Just now</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Nigerian Banks Demo */}
      <Card className={layouts.dashboardCard}>
        <h3 className="mb-4">Nigerian Bank Colors</h3>
        <div className={responsive.grid.actions}>
          {banks.map((bank) => (
            <div key={bank} className="text-center">
              <div className={cn(
                'w-12 h-12 rounded-lg flex items-center justify-center mb-2 mx-auto',
                nigeria.bankColors[bank as keyof typeof nigeria.bankColors]
              )}>
                <User size={20} />
              </div>
              <p className="text-xs">{bank}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Security Levels Demo */}
      <Card className={layouts.dashboardCard}>
        <h3 className="mb-4">Security Levels</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield size={16} />
              <span>Password Strength</span>
            </div>
            <div className={security.level('high')}>High</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield size={16} />
              <span>Two-Factor Auth</span>
            </div>
            <div className={security.level('medium')}>Medium</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield size={16} />
              <span>Backup Codes</span>
            </div>
            <div className={security.level('low')}>Low</div>
          </div>
        </div>
      </Card>

      {/* Animation Demo */}
      <div className="space-y-4">
        <Button className={animations.button}>
          Interactive Button
        </Button>
        <Card className={cn(layouts.dashboardCard, animations.card)}>
          <p>Hover over this card to see animation</p>
        </Card>
      </div>

      {/* Dynamic Classes Demo */}
      <Card className={layouts.dashboardCard}>
        <h3 className="mb-4">Dynamic Classes</h3>
        <div className="space-y-4">
          <div className={dynamic.balanceVisibility(true)}>
            Visible Balance: ₦1,234,567.89
          </div>
          <div className={dynamic.balanceVisibility(false)}>
            Hidden Balance: ₦1,234,567.89
          </div>
          <Button className={dynamic.loadingState(true)}>
            Loading Button
          </Button>
        </div>
      </Card>
    </div>
  );
}