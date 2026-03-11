import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare } from 'lucide-react';
import type { SmsLog } from '@/types/index';

interface SmsNotificationLogProps {
  smsLogs: SmsLog[];
}

export const SmsNotificationLog = ({ smsLogs }: SmsNotificationLogProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Market':
        return 'bg-secondary text-secondary-foreground';
      case 'Weather':
        return 'bg-blue-500 text-white';
      case 'Finance':
        return 'bg-green-500 text-white';
      case 'Extension':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="shadow-lg border-none">
      <CardHeader>
        <CardTitle className="text-xl font-serif text-primary flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-secondary" />
          SMS Notification Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        {smsLogs.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No SMS notifications yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {smsLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={`${getCategoryColor(log.category)} text-xs`}>
                      {log.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(log.sent_at).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{log.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
