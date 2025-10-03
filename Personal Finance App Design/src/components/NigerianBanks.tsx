import { Building2, CreditCard, Plus, ArrowRight } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function NigerianBanks() {
  const connectedBanks = [
    {
      name: 'GTBank',
      accountNumber: '0123456789',
      accountType: 'Savings',
      balance: 1250000.50,
      logo: '🏦',
      status: 'connected'
    },
    {
      name: 'Access Bank',
      accountNumber: '0987654321',
      accountType: 'Current',
      balance: 890000.25,
      logo: '🏛️',
      status: 'connected'
    },
    {
      name: 'First Bank',
      accountNumber: '1122334455',
      accountType: 'Savings',
      balance: 453750.75,
      logo: '🏦',
      status: 'pending'
    }
  ];

  const availableBanks = [
    'Zenith Bank', 'UBA', 'Fidelity Bank', 'Sterling Bank', 
    'FCMB', 'Unity Bank', 'Wema Bank', 'Polaris Bank'
  ];

  const paymentMethods = [
    { name: 'Paystack', type: 'Payment Gateway', logo: '💳', status: 'active' },
    { name: 'Flutterwave', type: 'Payment Gateway', logo: '🔄', status: 'active' },
    { name: 'Opay', type: 'Mobile Money', logo: '📱', status: 'connected' },
    { name: 'PalmPay', type: 'Mobile Money', logo: '🌴', status: 'available' }
  ];

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl mb-2">Bank Accounts</h1>
          <p className="text-gray-600">Manage your Nigerian bank connections</p>
        </div>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
          <Plus size={16} className="mr-2" />
          Add Bank
        </Button>
      </div>

      {/* Connected Banks */}
      <div className="space-y-4">
        <h3>Connected Accounts</h3>
        {connectedBanks.map((bank, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">{bank.logo}</span>
                </div>
                <div>
                  <h4 className="font-medium">{bank.name}</h4>
                  <p className="text-sm text-gray-600">{bank.accountNumber} • {bank.accountType}</p>
                  <p className="text-lg font-semibold text-green-600">
                    ₦{bank.balance.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant={bank.status === 'connected' ? 'secondary' : 'destructive'}
                  className={bank.status === 'connected' ? 'bg-green-100 text-green-700' : ''}
                >
                  {bank.status === 'connected' ? 'Connected' : 'Pending'}
                </Badge>
                <ArrowRight size={16} className="text-gray-400" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        <h3>Payment Methods</h3>
        {paymentMethods.map((method, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">{method.logo}</span>
                </div>
                <div>
                  <h4 className="font-medium">{method.name}</h4>
                  <p className="text-sm text-gray-600">{method.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant="secondary"
                  className={
                    method.status === 'active' ? 'bg-green-100 text-green-700' :
                    method.status === 'connected' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }
                >
                  {method.status}
                </Badge>
                {method.status === 'available' && (
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Available Banks */}
      <div className="space-y-4">
        <h3>Available Nigerian Banks</h3>
        <Card className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {availableBanks.map((bankName, index) => (
              <button
                key={index}
                className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Building2 size={16} className="text-gray-500" />
                <span className="text-sm">{bankName}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* BVN Verification */}
      <Card className="p-4 border-blue-200 bg-blue-50">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <CreditCard size={16} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-blue-800">BVN Verification Required</h4>
            <p className="text-sm text-blue-700 mt-1">
              Link your Bank Verification Number (BVN) to enable seamless bank transfers and comply with CBN regulations.
            </p>
            <Button variant="outline" size="sm" className="mt-3 border-blue-300 text-blue-700">
              Verify BVN
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}