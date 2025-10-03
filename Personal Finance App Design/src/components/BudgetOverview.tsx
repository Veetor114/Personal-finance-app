import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Progress } from './ui/progress';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';

export function BudgetOverview() {
  const budgetData = [
    { category: 'Food', budget: 120000, spent: 95500, color: '#ef4444' },
    { category: 'Transport', budget: 45000, spent: 38200, color: '#f97316' },
    { category: 'Entertainment', budget: 25000, spent: 18500, color: '#eab308' },
    { category: 'Shopping', budget: 60000, spent: 47800, color: '#22c55e' },
    { category: 'Utilities', budget: 35000, spent: 32100, color: '#3b82f6' },
    { category: 'Healthcare', budget: 20000, spent: 12500, color: '#8b5cf6' },
  ];

  const totalBudget = budgetData.reduce((sum, item) => sum + item.budget, 0);
  const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0);
  const remainingBudget = totalBudget - totalSpent;

  const pieData = budgetData.map(item => ({
    name: item.category,
    value: item.spent,
    color: item.color
  }));

  const monthlyTrend = [
    { month: 'Jan', spent: 280000, budget: 305000 },
    { month: 'Feb', spent: 295000, budget: 305000 },
    { month: 'Mar', spent: 320000, budget: 305000 },
    { month: 'Apr', spent: 265000, budget: 305000 },
    { month: 'May', spent: 290000, budget: 305000 },
    { month: 'Jun', spent: totalSpent, budget: totalBudget },
  ];

  const getPercentage = (spent: number, budget: number) => {
    return Math.round((spent / budget) * 100);
  };

  const getBudgetStatus = (spent: number, budget: number) => {
    const percentage = getPercentage(spent, budget);
    if (percentage >= 90) return { status: 'danger', color: 'text-red-600' };
    if (percentage >= 75) return { status: 'warning', color: 'text-orange-600' };
    return { status: 'good', color: 'text-green-600' };
  };

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl mb-2">Budget Overview</h1>
          <p className="text-gray-600">Track your spending by category</p>
        </div>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
          <Plus size={16} className="mr-2" />
          Add Budget
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">Total Budget</p>
          <p className="text-xl font-semibold text-blue-600">₦{totalBudget.toLocaleString('en-NG')}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">Spent</p>
          <p className="text-xl font-semibold text-red-600">₦{totalSpent.toLocaleString('en-NG')}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">Remaining</p>
          <p className="text-xl font-semibold text-green-600">₦{remainingBudget.toLocaleString('en-NG')}</p>
        </Card>
      </div>

      {/* Spending Breakdown Chart */}
      <Card className="p-4">
        <h3 className="mb-4">Spending Breakdown</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {pieData.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-sm text-gray-600">{entry.name}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Category Budgets */}
      <div className="space-y-4">
        <h3>Category Budgets</h3>
        {budgetData.map((item, index) => {
          const percentage = getPercentage(item.spent, item.budget);
          const status = getBudgetStatus(item.spent, item.budget);
          
          return (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="font-medium">{item.category}</span>
                </div>
                <div className="text-right">
                  <p className="font-medium">₦{item.spent.toLocaleString('en-NG')} / ₦{item.budget.toLocaleString('en-NG')}</p>
                  <p className={`text-sm ${status.color}`}>{percentage}% used</p>
                </div>
              </div>
              <Progress 
                value={percentage} 
                className="h-2"
                style={{ 
                  '--progress-background': item.color 
                } as React.CSSProperties}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">
                  ₦{(item.budget - item.spent).toLocaleString('en-NG')} remaining
                </span>
                {percentage >= 90 ? (
                  <div className="flex items-center gap-1 text-red-600">
                    <TrendingUp size={12} />
                    <span className="text-xs">Over budget</span>
                  </div>
                ) : percentage >= 75 ? (
                  <div className="flex items-center gap-1 text-orange-600">
                    <TrendingUp size={12} />
                    <span className="text-xs">Almost limit</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingDown size={12} />
                    <span className="text-xs">On track</span>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Monthly Trend */}
      <Card className="p-4">
        <h3 className="mb-4">Monthly Spending Trend</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Bar dataKey="budget" fill="#e5e7eb" name="Budget" />
              <Bar dataKey="spent" fill="#3b82f6" name="Spent" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}