import React, { useState } from 'react';
import BuyerLayout from '@/components/buyer/BuyerLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Clock, X } from 'lucide-react';
import { toast } from 'sonner';

const ProcurementPage = () => {
  const [activeOffers, setActiveOffers] = useState([
    {
      id: 1,
      farm: 'Wanjiku Farm',
      crop: 'Maize',
      quantity: '10 bags',
      price: 'KSh 3,200/bag',
      sentDate: 'Jun 28',
      status: 'Awaiting Farmer Response',
      statusColor: 'bg-yellow-500',
      statusIcon: Clock,
    },
    {
      id: 2,
      farm: 'Okello Farm',
      crop: 'Sorghum',
      quantity: '20 bags',
      price: 'UGX 82,000/bag',
      sentDate: 'Jun 25',
      status: 'Accepted — Awaiting Harvest',
      statusColor: 'bg-green-500',
      statusIcon: CheckCircle,
    },
  ]);

  const completedOffers = [
    {
      id: 3,
      farm: 'Mensah Farm',
      crop: 'Maize',
      quantity: '15 bags',
      price: 'GHS 450/bag',
      deliveryDate: 'Apr 2025',
      status: 'Paid',
    },
    {
      id: 4,
      farm: 'Achieng Farm',
      crop: 'Sorghum',
      quantity: '10 bags',
      price: 'KSh 2,950/bag',
      deliveryDate: 'Jan 2025',
      status: 'Paid',
    },
  ];

  const cancelledOffers = [
    {
      id: 5,
      farm: 'Test Farm',
      crop: 'Maize',
      quantity: '5 bags',
      price: 'KSh 3,000/bag',
      cancelDate: 'Jun 20',
      reason: 'Farmer declined offer',
    },
  ];

  const handleCancelOffer = (id: number) => {
    setActiveOffers(activeOffers.filter((offer) => offer.id !== id));
    toast.success('Offer cancelled successfully');
  };

  return (
    <BuyerLayout>
      <div className="p-4 md:p-6 space-y-6 pb-20 lg:pb-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">Procurement</h1>
          <p className="text-muted-foreground text-lg">Track your offers and purchases in one place.</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-grid">
            <TabsTrigger value="active">Active Offers</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          {/* Active Offers */}
          <TabsContent value="active" className="space-y-4 mt-6">
            {activeOffers.length > 0 ? (
              activeOffers.map((offer) => {
                const StatusIcon = offer.statusIcon;
                return (
                  <Card key={offer.id} className="shadow-lg border-none">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-bold text-lg text-primary">{offer.farm}</h3>
                              <p className="text-sm text-muted-foreground">
                                {offer.crop} • {offer.quantity} @ {offer.price}
                              </p>
                            </div>
                            <Badge className={`${offer.statusColor} text-white flex items-center gap-1`}>
                              <StatusIcon className="h-3 w-3" />
                              {offer.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Sent: {offer.sentDate}</p>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => console.log('View details')}>
                            View Details
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-500 text-red-500 hover:bg-red-50"
                            onClick={() => handleCancelOffer(offer.id)}
                          >
                            Cancel Offer
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="text-center py-12">
                <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold text-primary mb-2">No active offers</h3>
                <p className="text-muted-foreground">Your active procurement offers will appear here</p>
              </div>
            )}
          </TabsContent>

          {/* Completed */}
          <TabsContent value="completed" className="space-y-4 mt-6">
            {completedOffers.map((offer) => (
              <Card key={offer.id} className="shadow-lg border-none">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-lg text-primary">{offer.farm}</h3>
                          <p className="text-sm text-muted-foreground">
                            {offer.crop} • {offer.quantity} @ {offer.price}
                          </p>
                        </div>
                        <Badge className="bg-green-500 text-white flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          {offer.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Delivered: {offer.deliveryDate}</p>
                    </div>

                    <Button variant="outline" size="sm" onClick={() => console.log('View receipt')}>
                      View Receipt
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Cancelled */}
          <TabsContent value="cancelled" className="space-y-4 mt-6">
            {cancelledOffers.length > 0 ? (
              cancelledOffers.map((offer) => (
                <Card key={offer.id} className="shadow-lg border-none">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-lg text-primary">{offer.farm}</h3>
                            <p className="text-sm text-muted-foreground">
                              {offer.crop} • {offer.quantity} @ {offer.price}
                            </p>
                          </div>
                          <Badge className="bg-red-500 text-white flex items-center gap-1">
                            <X className="h-3 w-3" />
                            Cancelled
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Cancelled: {offer.cancelDate}</p>
                        <p className="text-sm text-muted-foreground italic">Reason: {offer.reason}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <X className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold text-primary mb-2">No cancelled offers</h3>
                <p className="text-muted-foreground">Cancelled offers will appear here</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </BuyerLayout>
  );
};

export default ProcurementPage;
