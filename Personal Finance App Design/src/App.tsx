import { useState, useEffect } from 'react';
import { BottomNavigation } from './components/BottomNavigation';
import { Dashboard } from './components/Dashboard';
import { TransactionHistory } from './components/TransactionHistory';
import { BudgetOverview } from './components/BudgetOverview';
import { NigerianBanks } from './components/NigerianBanks';
import { Settings } from './components/Settings';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved preference, default to false (light mode)
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : false;
  });

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <TransactionHistory />;
      case 'budget':
        return <BudgetOverview />;
      case 'banks':
        return <NigerianBanks />;
      case 'settings':
        return <Settings isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? 'dark' : ''}`}>
      {/* Status Bar Spacing */}
      <div className="h-6 bg-card"></div>
      
      {/* Main Content */}
      <main className="relative">
        {renderActiveComponent()}
      </main>
      
      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
      
      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}