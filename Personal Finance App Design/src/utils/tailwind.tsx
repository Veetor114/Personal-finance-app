import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Transaction amount styling utilities for fintech app
 */
export const transactionStyles = {
  /**
   * Get color classes for transaction amounts
   * @param amount - The transaction amount (positive for income, negative for expense)
   * @param variant - Style variant ('default', 'muted', 'bold')
   */
  amount: (amount: number, variant: 'default' | 'muted' | 'bold' = 'default') => {
    const isPositive = amount > 0;
    const baseClasses = {
      default: isPositive ? 'text-success' : 'text-destructive',
      muted: isPositive ? 'text-success/70' : 'text-destructive/70',
      bold: isPositive ? 'text-success font-semibold' : 'text-destructive font-semibold'
    };
    return baseClasses[variant];
  },

  /**
   * Get background classes for transaction items
   */
  background: (amount: number, variant: 'subtle' | 'card' = 'subtle') => {
    const isPositive = amount > 0;
    if (variant === 'subtle') {
      return isPositive ? 'bg-success/5' : 'bg-destructive/5';
    }
    return isPositive ? 'bg-success/10' : 'bg-destructive/10';
  },

  /**
   * Get icon container classes for transactions
   */
  iconContainer: (amount: number) => {
    const isPositive = amount > 0;
    return cn(
      'w-10 h-10 rounded-full flex items-center justify-center',
      isPositive ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
    );
  }
};

/**
 * Currency formatting utilities
 */
export const currency = {
  /**
   * Format amount to Nigerian Naira with proper localization
   */
  format: (amount: number, options?: { 
    showSign?: boolean;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }) => {
    const { showSign = true, minimumFractionDigits = 2, maximumFractionDigits = 2 } = options || {};
    
    const formatted = Math.abs(amount).toLocaleString('en-NG', {
      minimumFractionDigits,
      maximumFractionDigits
    });
    
    const sign = showSign && amount !== 0 ? (amount > 0 ? '+' : '-') : '';
    return `${sign}₦${formatted}`;
  },

  /**
   * Format amount for display in cards/components
   */
  display: (amount: number, variant: 'full' | 'compact' = 'full') => {
    if (variant === 'compact' && Math.abs(amount) >= 1000000) {
      const millions = amount / 1000000;
      return `₦${millions.toFixed(1)}M`;
    }
    if (variant === 'compact' && Math.abs(amount) >= 1000) {
      const thousands = amount / 1000;
      return `₦${thousands.toFixed(1)}K`;
    }
    return currency.format(amount);
  }
};

/**
 * Responsive design utilities
 */
export const responsive = {
  /**
   * Container classes for different screen sizes
   */
  container: 'max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl',
  
  /**
   * Padding utilities for mobile-first design
   */
  padding: {
    page: 'p-4 pb-20 sm:p-6 sm:pb-24',
    card: 'p-4 sm:p-6',
    section: 'px-4 py-6 sm:px-6 sm:py-8'
  },

  /**
   * Grid utilities for responsive layouts
   */
  grid: {
    actions: 'grid grid-cols-2 gap-4 sm:grid-cols-4',
    cards: 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3',
    transactions: 'space-y-3 sm:space-y-4'
  }
};

/**
 * Animation and interaction utilities
 */
export const animations = {
  /**
   * Common button interactions
   */
  button: 'transition-all duration-150 active:scale-95 hover:shadow-md',
  
  /**
   * Card hover effects
   */
  card: 'transition-all duration-200 hover:shadow-lg hover:scale-[1.02]',
  
  /**
   * Loading states
   */
  loading: 'animate-pulse',
  
  /**
   * Fade in animation
   */
  fadeIn: 'animate-in fade-in duration-300',
  
  /**
   * Slide up animation
   */
  slideUp: 'animate-in slide-in-from-bottom-4 duration-300'
};

/**
 * Status and state utilities
 */
export const status = {
  /**
   * Transaction status styling
   */
  transaction: (status: 'completed' | 'pending' | 'failed') => {
    const styles = {
      completed: 'bg-success/10 text-success border-success/20',
      pending: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800/30',
      failed: 'bg-destructive/10 text-destructive border-destructive/20'
    };
    return cn('px-2 py-1 rounded-full text-xs font-medium border', styles[status]);
  },

  /**
   * Priority levels for different UI elements
   */
  priority: (level: 'high' | 'medium' | 'low') => {
    const styles = {
      high: 'bg-destructive text-destructive-foreground',
      medium: 'bg-orange-500 text-white',
      low: 'bg-muted text-muted-foreground'
    };
    return styles[level];
  }
};

/**
 * Form utilities
 */
export const forms = {
  /**
   * Input validation states
   */
  input: (state?: 'error' | 'success') => {
    const base = 'transition-colors duration-200';
    if (state === 'error') return cn(base, 'border-destructive focus:border-destructive focus:ring-destructive/20');
    if (state === 'success') return cn(base, 'border-success focus:border-success focus:ring-success/20');
    return base;
  },

  /**
   * Label states
   */
  label: (required?: boolean) => cn(
    'block text-sm font-medium leading-6',
    required && 'after:content-["*"] after:ml-0.5 after:text-destructive'
  )
};

/**
 * Nigerian fintech specific utilities
 */
export const nigeria = {
  /**
   * Bank color coding (major Nigerian banks)
   */
  bankColors: {
    'GTBank': 'bg-orange-500 text-white',
    'Access Bank': 'bg-blue-600 text-white',
    'First Bank': 'bg-blue-800 text-white',
    'UBA': 'bg-red-600 text-white',
    'Zenith Bank': 'bg-red-500 text-white',
    'Fidelity Bank': 'bg-purple-600 text-white',
    'FCMB': 'bg-green-600 text-white',
    'Union Bank': 'bg-blue-700 text-white'
  },

  /**
   * Payment gateway styling
   */
  paymentGateways: {
    'Paystack': 'bg-blue-500 text-white',
    'Flutterwave': 'bg-orange-500 text-white',
    'Interswitch': 'bg-red-600 text-white'
  }
};

/**
 * Security level indicators
 */
export const security = {
  level: (level: 'low' | 'medium' | 'high') => {
    const styles = {
      low: 'bg-destructive/10 text-destructive border-destructive/20',
      medium: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400',
      high: 'bg-success/10 text-success border-success/20'
    };
    return cn('px-3 py-1 rounded-full text-sm font-medium border', styles[level]);
  }
};

/**
 * Common layout patterns for fintech apps
 */
export const layouts = {
  /**
   * Dashboard card layout
   */
  dashboardCard: 'bg-card rounded-xl p-6 shadow-sm border',
  
  /**
   * Transaction list item
   */
  transactionItem: 'flex items-center justify-between p-4 bg-card rounded-lg border hover:bg-muted/50 transition-colors',
  
  /**
   * Modal/Sheet content
   */
  modalContent: 'bg-background p-6 rounded-t-2xl sm:rounded-lg border shadow-lg',
  
  /**
   * Bottom navigation safe area
   */
  bottomSafe: 'pb-20 sm:pb-6'
};

/**
 * Utility to generate dynamic classes based on app state
 */
export const dynamic = {
  /**
   * Generate classes based on balance visibility
   */
  balanceVisibility: (isVisible: boolean) => cn(
    'transition-all duration-300',
    isVisible ? 'opacity-100' : 'opacity-50 blur-sm'
  ),

  /**
   * Generate classes for active/inactive states
   */
  activeState: (isActive: boolean, activeClasses: string, inactiveClasses: string) => 
    isActive ? activeClasses : inactiveClasses,

  /**
   * Generate classes for loading states
   */
  loadingState: (isLoading: boolean) => cn(
    'transition-all duration-200',
    isLoading && 'opacity-50 pointer-events-none'
  )
};