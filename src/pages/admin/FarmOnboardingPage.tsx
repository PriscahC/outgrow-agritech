import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Sprout, MapPin, User, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const FarmOnboardingPage = () => {
  const [activeTab, setActiveTab] = useState('pending');

  const farms = {
    pending: [
      { id: 1, name: 'Kamau Farm', farmer: 'John K.', location: 'Kiambu, Kenya 🇰🇪', agent: 'David Ouma', signupDate: 'Jun 25', progress: 20 },
      { id: 2, name: 'Nakato Farm', farmer: 'Grace N.', location: 'Mbale, Uganda 🇺🇬', agent: 'Amina Hassan', signupDate: 'Jun 26', progress: 40 },
    ],
    visitDone: [
      { id: 3, name: 'Okafor Farm', farmer: 'Emeka O.', location: 'Anambra, Nigeria 🇳🇬', agent: 'Chidi Eze', signupDate: 'Jun 20', progress: 60 },
    ],
    processing: [
      { id: 4, name: 'Mensah Farm', farmer: 'Kwame M.', location: 'Kumasi, Ghana 🇬🇭', agent: 'David Ouma', signupDate: 'Jun 15', progress: 80 },
    ],
    active: [
      { id: 5, name: 'Wanjiku Farm', farmer: 'Priscah W.', location: 'Nakuru, Kenya 🇰🇪', agent: 'David Ouma', signupDate: 'Mar 1', progress: 100 },
      { id: 6, name: 'Okello Farm', farmer: 'David O.', location: 'Gulu, Uganda 🇺🇬', agent: 'Amina Hassan', signupDate: 'Feb 15', progress: 100 },
    ],
  };

  const renderFarmCards = (farmList: typeof farms.pending) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {farmList.map((farm) => (
        <Card key={farm.id} className="shadow-lg border-none hover:shadow-xl transition-shadow">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-lg text-primary">{farm.name}</h3>
                <p className="text-sm text-muted-foreground">{farm.farmer}</p>
              </div>
              <Badge variant="outline">{farm.progress}%</Badge>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{farm.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span>Agent: {farm.agent}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Signed up: {farm.signupDate}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold">{farm.progress}%</span>
              </div>
              <Progress value={farm.progress} className="h-2" />
            </div>

            <Link to={`/admin/onboarding/${farm.id}`}>
              <Button asChild className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <span>View Details →</span>
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <AdminLayout role="admin">
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">Farm Onboarding</h1>
          <p className="text-muted-foreground text-lg">Track farms through the onboarding pipeline</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full md:w-auto grid-cols-4 md:inline-grid">
            <TabsTrigger value="pending">Pending Visit ({farms.pending.length})</TabsTrigger>
            <TabsTrigger value="visitDone">Visit Done ({farms.visitDone.length})</TabsTrigger>
            <TabsTrigger value="processing">Processing ({farms.processing.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({farms.active.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            {renderFarmCards(farms.pending)}
          </TabsContent>

          <TabsContent value="visitDone" className="mt-6">
            {renderFarmCards(farms.visitDone)}
          </TabsContent>

          <TabsContent value="processing" className="mt-6">
            {renderFarmCards(farms.processing)}
          </TabsContent>

          <TabsContent value="active" className="mt-6">
            {renderFarmCards(farms.active)}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default FarmOnboardingPage;
