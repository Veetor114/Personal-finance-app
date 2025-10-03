import { useState } from 'react';
import { Shield, Lock, Smartphone, Eye, CreditCard, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';

export function SecuritySettings() {
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoLockEnabled, setAutoLockEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const securityFeatures = [
    {
      icon: Lock,
      title: 'PIN Protection',
      description: 'Require PIN to access the app',
      enabled: true,
      action: 'Change PIN'
    },
    {
      icon: Smartphone,
      title: 'Biometric Authentication',
      description: 'Use fingerprint or face recognition',
      enabled: biometricEnabled,
      action: 'Configure',
      toggle: true,
      onToggle: setBiometricEnabled
    },
    {
      icon: Shield,
      title: 'Two-Factor Authentication',
      description: 'Add extra security for transactions',
      enabled: twoFactorEnabled,
      action: 'Setup',
      toggle: true,
      onToggle: setTwoFactorEnabled
    },
    {
      icon: Eye,
      title: 'Transaction Notifications',
      description: 'Get alerts for all transactions',
      enabled: notificationsEnabled,
      action: 'Manage',
      toggle: true,
      onToggle: setNotificationsEnabled
    },
    {
      icon: Lock,
      title: 'Auto-Lock',
      description: 'Automatically lock app after inactivity',
      enabled: autoLockEnabled,
      action: 'Configure',
      toggle: true,
      onToggle: setAutoLockEnabled
    }
  ];

  const securityScore = () => {
    const enabledFeatures = securityFeatures.filter(feature => feature.enabled).length;
    return Math.round((enabledFeatures / securityFeatures.length) * 100);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const recentActivity = [
    { action: 'Login', location: 'Samsung Galaxy S23', time: '2 minutes ago', status: 'success' },
    { action: 'Transfer to GTBank', location: 'Mobile App', time: '1 hour ago', status: 'success' },
    { action: 'Password Change', location: 'Web Browser', time: '2 days ago', status: 'success' },
    { action: 'Failed Login', location: 'Unknown Device - Lagos', time: '3 days ago', status: 'warning' }
  ];

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl mb-2">Security Center</h1>
        <p className="text-gray-600">Manage your account security settings</p>
      </div>

      {/* Security Score */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3>Security Score</h3>
            <p className="text-sm text-gray-600">Your account security level</p>
          </div>
          <div className="text-right">
            <p className={`text-3xl font-bold ${getScoreColor(securityScore())}`}>
              {securityScore()}%
            </p>
            <p className="text-sm text-gray-500">
              {securityScore() >= 80 ? 'Excellent' : securityScore() >= 60 ? 'Good' : 'Needs Work'}
            </p>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              securityScore() >= 80 ? 'bg-green-500' : 
              securityScore() >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${securityScore()}%` }}
          ></div>
        </div>
      </Card>

      {/* Security Features */}
      <div className="space-y-4">
        <h3>Security Features</h3>
        {securityFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    feature.enabled ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <Icon size={20} className={feature.enabled ? 'text-green-600' : 'text-gray-500'} />
                  </div>
                  <div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {feature.enabled && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Active
                    </Badge>
                  )}
                  {feature.toggle ? (
                    <Switch
                      checked={feature.enabled}
                      onCheckedChange={feature.onToggle}
                      aria-label={`Toggle ${feature.title}`}
                    />
                  ) : (
                    <Button variant="outline" size="sm">
                      {feature.action}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Security Alerts */}
      <div className="space-y-3">
        <h3>Security Alerts</h3>
        
        <Alert>
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription>
            Your account has been secure for the last 30 days. No suspicious activity detected.
          </AlertDescription>
        </Alert>

        {!twoFactorEnabled && (
          <Alert>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription>
              Enable two-factor authentication for enhanced security. 
              <Button variant="link" className="p-0 ml-1 h-auto text-blue-600">
                Set up now
              </Button>
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <h3>Recent Security Activity</h3>
        {recentActivity.map((activity, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
                <div>
                  <h4 className="font-medium">{activity.action}</h4>
                  <p className="text-sm text-gray-600">{activity.location}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">{activity.time}</p>
                {activity.status === 'warning' && (
                  <Badge variant="destructive" className="text-xs">
                    Suspicious
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Emergency Actions */}
      <Card className="p-4 border-red-200 bg-red-50">
        <h3 className="text-red-800 mb-3">Emergency Actions</h3>
        <div className="space-y-2">
          <Button variant="destructive" size="sm" className="w-full">
            Freeze All Cards
          </Button>
          <Button variant="outline" size="sm" className="w-full border-red-300 text-red-700">
            Report Suspicious Activity
          </Button>
        </div>
      </Card>
    </div>
  );
}