import { useState } from 'react';
import { Search, Filter, Calendar, ChevronDown } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function TransactionHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');

  const transactions = [
    { id: 1, name: 'Shoprite Victoria Island', amount: -15420.00, date: '2024-01-15', category: 'Food', description: 'Weekly groceries' },
    { id: 2, name: 'Salary - GTBank', amount: 425000.00, date: '2024-01-14', category: 'Income', description: 'Monthly salary deposit' },
    { id: 3, name: 'Netflix Subscription', amount: -2900.00, date: '2024-01-13', category: 'Entertainment', description: 'Monthly streaming' },
    { id: 4, name: 'Total Energies - Ikeja', amount: -8750.00, date: '2024-01-12', category: 'Transport', description: 'Fuel purchase' },
    { id: 5, name: 'Cafe Neo Lekki', amount: -1200.00, date: '2024-01-12', category: 'Food', description: 'Morning coffee' },
    { id: 6, name: 'Freelance - Paystack', amount: 75000.00, date: '2024-01-11', category: 'Income', description: 'Web design project' },
    { id: 7, name: 'EKEDC Bill', amount: -18500.00, date: '2024-01-10', category: 'Utilities', description: 'Electricity bill' },
    { id: 8, name: 'Jumia Order', amount: -24999.00, date: '2024-01-09', category: 'Shopping', description: 'Online shopping' },
  ];

  const categories = ['all', 'Income', 'Food', 'Transport', 'Entertainment', 'Utilities', 'Shopping'];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || transaction.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl mb-2 text-foreground">Transactions</h1>
        <p className="text-muted-foreground">Track your spending and income</p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="flex-1">
              <div className="flex items-center gap-2">
                <Filter size={16} />
                <SelectValue placeholder="Category" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="flex-1">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <SelectValue placeholder="Period" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Transaction List */}
      <div className="space-y-3">
        {filteredTransactions.map((transaction) => (
          <div key={transaction.id} className="bg-card border border-border rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  transaction.amount > 0 ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <span className="text-lg">
                    {transaction.category === 'Income' ? '💰' : 
                     transaction.category === 'Food' ? '🛒' : 
                     transaction.category === 'Entertainment' ? '🎬' : 
                     transaction.category === 'Transport' ? '⛽' :
                     transaction.category === 'Utilities' ? '💡' :
                     transaction.category === 'Shopping' ? '🛍️' : '📋'}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{transaction.name}</h3>
                  <p className="text-sm text-muted-foreground">{transaction.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{formatDate(transaction.date)}</span>
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                      {transaction.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-lg font-medium ${
                  transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}₦{Math.abs(transaction.amount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No transactions found</p>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}