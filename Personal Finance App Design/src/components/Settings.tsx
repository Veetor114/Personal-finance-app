import { 
  User, 
  Bell, 
  Moon, 
  Globe, 
  CreditCard, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Smartphone,
  Mail,
  Phone
} from 'lucide-react';
import { useState } from 'react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';

interface SettingsProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Settings({ isDarkMode, onToggleDarkMode }: SettingsProps) {

  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const settingsGroups = [
    {
      title: 'Account',
      items: [
        { icon: User, title: 'Personal Information', description: 'Update your profile details', action: 'navigate' },
        { icon: CreditCard, title: 'Payment Methods', description: 'Manage cards and bank accounts', action: 'navigate' },
        { icon: Bell, title: 'Notifications', description: 'Customize your alerts', action: 'navigate' }
      ]
    },
    {
      title: 'Preferences',
      items: [
        { 
          icon: Moon, 
          title: 'Dark Mode', 
          description: 'Switch to dark theme', 
          action: 'toggle',
          value: isDarkMode,
          onToggle: onToggleDarkMode
        },
        { icon: Globe, title: 'Language', description: 'English (Nigeria)', action: 'navigate' },
        { icon: Smartphone, title: 'App Version', description: 'v2.1.3 (Latest)', action: 'info' }
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, title: 'Help Center', description: 'Get help and support', action: 'navigate' },
        { icon: Mail, title: 'Contact Support', description: 'Reach out to our team', action: 'navigate' },
        { icon: Phone, title: 'Call Support', description: '+234-700-FINTECH', action: 'navigate' }
      ]
    }
  ];

  const notificationSettings = [
    {
      title: 'Push Notifications',
      description: 'Receive alerts on your device',
      enabled: pushNotifications,
      onToggle: setPushNotifications
    },
    {
      title: 'Email Notifications',
      description: 'Get updates via email',
      enabled: emailNotifications,
      onToggle: setEmailNotifications
    }
  ];

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="text-xl">AO</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-lg font-medium">Adebayo Oladele</h3>
            <p className="text-gray-600">adebayo.oladele@gmail.com</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Verified
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Premium
              </Badge>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-4">
        <h3 className="mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {notificationSettings.map((setting, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{setting.title}</h4>
                <p className="text-sm text-gray-600">{setting.description}</p>
              </div>
              <Switch
                checked={setting.enabled}
                onCheckedChange={setting.onToggle}
                aria-label={`Toggle ${setting.title}`}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Settings Groups */}
      {settingsGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="space-y-3">
          <h3 className="text-sm uppercase tracking-wide text-gray-500 font-medium">
            {group.title}
          </h3>
          <Card className="divide-y divide-gray-100">
            {group.items.map((item, itemIndex) => {
              const Icon = item.icon;
              return (
                <div key={itemIndex} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <Icon size={20} className="text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.action === 'toggle' && item.onToggle && (
                        <Switch
                          checked={item.value}
                          onCheckedChange={item.onToggle}
                          aria-label={`Toggle ${item.title}`}
                        />
                      )}
                      {item.action === 'navigate' && (
                        <ChevronRight size={20} className="text-muted-foreground" />
                      )}
                      {item.action === 'info' && (
                        <Badge variant="secondary">Latest</Badge>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </Card>
        </div>
      ))}

      {/* Account Actions */}
      <div className="space-y-3">
        <h3 className="text-sm uppercase tracking-wide text-gray-500 font-medium">
          Account Actions
        </h3>
        <Card className="p-4">
          <Button 
            variant="destructive" 
            className="w-full flex items-center justify-center gap-2"
          >
            <LogOut size={16} />
            Sign Out
          </Button>
        </Card>
      </div>

      {/* App Info */}
      <div className="text-center text-sm text-gray-500 pt-4">
        <p>NairaFlow v2.1.3</p>
        <p>© 2024 NairaFlow Technologies Ltd</p>
        <div className="flex justify-center gap-4 mt-2">
          <button className="text-blue-600">Privacy Policy</button>
          <button className="text-blue-600">Terms of Service</button>
        </div>
      </div>
    </div>
  );
}