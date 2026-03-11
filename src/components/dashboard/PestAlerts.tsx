import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import type { Alert } from '@/types/index';

interface PestAlertsProps {
  alerts: Alert[];
}

export const PestAlerts = ({ alerts }: PestAlertsProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'bg-red-500 text-white';
      case 'Medium':
        return 'bg-yellow-500 text-white';
      case 'Low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="shadow-lg border-none">
      <CardHeader>
        <CardTitle className="text-xl font-serif text-primary flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-secondary" />
          Pest & Disease Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No active alerts. Your farm is looking healthy! 🌱</p>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-primary">{alert.alert_type}</span>
                    <Badge className={`${getSeverityColor(alert.severity)} text-xs`}>
                      {alert.severity}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(alert.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="shrink-0 text-secondary hover:text-secondary/80"
                  onClick={() => console.log('Ask AI clicked')}
                >
                  Ask AI <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
