import React from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Package, CreditCard, Phone } from 'lucide-react';

export const QuickActions = () => {
  const actions = [
    {
      icon: <Camera className="h-8 w-8" />,
      label: 'Diagnose a Crop',
      color: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    },
    {
      icon: <Package className="h-8 w-8" />,
      label: 'View Buyer Offers',
      color: 'bg-primary text-primary-foreground hover:bg-primary/90',
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      label: 'Apply for Loan',
      color: 'bg-green-600 text-white hover:bg-green-700',
    },
    {
      icon: <Phone className="h-8 w-8" />,
      label: 'Call Extension Agent',
      color: 'bg-blue-600 text-white hover:bg-blue-700',
    },
  ];

  return (
    <div>
      <h3 className="text-xl font-serif font-bold text-primary mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <Button
            key={index}
            className={`h-auto flex-col gap-3 p-6 rounded-2xl shadow-lg ${action.color}`}
            onClick={() => console.log(`Action: ${action.label}`)}
          >
            {action.icon}
            <span className="text-sm font-semibold text-center leading-tight">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
