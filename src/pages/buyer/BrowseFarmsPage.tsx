import React, { useState } from 'react';
import BuyerLayout from '@/components/buyer/BuyerLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sprout, MapPin, Calendar, Scale, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const BrowseFarmsPage = () => {
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedQuality, setSelectedQuality] = useState('all');

  const farms = [
    {
      id: 1,
      name: 'Wanjiku Farm',
      farmer: 'Priscah W.',
      location: 'Nakuru, Kenya',
      country: 'kenya',
      crop: 'Maize',
      variety: 'Duma 43',
      cropType: 'maize',
      harvestDate: 'Jul 18',
      quantity: '18 bags',
      quality: 'B+',
      qualityGrade: 'b',
      qualityColor: 'bg-green-500',
      verified: true,
    },
    {
      id: 2,
      name: 'Okello Farm',
      farmer: 'David O.',
      location: 'Gulu, Uganda',
      country: 'uganda',
      crop: 'Sorghum',
      variety: 'Standard',
      cropType: 'sorghum',
      harvestDate: 'Jul 25',
      quantity: '32 bags',
      quality: 'A',
      qualityGrade: 'a',
      qualityColor: 'bg-green-600',
      verified: true,
    },
    {
      id: 3,
      name: 'Adaeze Farm',
      farmer: 'Adaeze N.',
      location: 'Enugu, Nigeria',
      country: 'nigeria',
      crop: 'Soybeans',
      variety: 'TGx',
      cropType: 'soybeans',
      harvestDate: 'Aug 2',
      quantity: '45 bags',
      quality: 'A-',
      qualityGrade: 'a',
      qualityColor: 'bg-green-500',
      verified: true,
    },
    {
      id: 4,
      name: 'Mensah Farm',
      farmer: 'Kwame M.',
      location: 'Kumasi, Ghana',
      country: 'ghana',
      crop: 'Maize',
      variety: 'Obatanpa',
      cropType: 'maize',
      harvestDate: 'Aug 10',
      quantity: '22 bags',
      quality: 'B',
      qualityGrade: 'b',
      qualityColor: 'bg-yellow-500',
      verified: true,
    },
    {
      id: 5,
      name: 'Phiri Farm',
      farmer: 'Thandiwe P.',
      location: 'Lilongwe, Malawi',
      country: 'malawi',
      crop: 'Groundnuts',
      variety: 'CG7',
      cropType: 'groundnuts',
      harvestDate: 'Aug 15',
      quantity: '28 bags',
      quality: 'A',
      qualityGrade: 'a',
      qualityColor: 'bg-green-600',
      verified: true,
    },
    {
      id: 6,
      name: 'Achieng Farm',
      farmer: 'Grace A.',
      location: 'Kisumu, Kenya',
      country: 'kenya',
      crop: 'Sorghum',
      variety: 'Gadam',
      cropType: 'sorghum',
      harvestDate: 'Aug 20',
      quantity: '15 bags',
      quality: 'B+',
      qualityGrade: 'b',
      qualityColor: 'bg-green-500',
      verified: true,
    },
  ];

  const filteredFarms = farms.filter((farm) => {
    if (selectedCrop !== 'all' && farm.cropType !== selectedCrop) return false;
    if (selectedCountry !== 'all' && farm.country !== selectedCountry) return false;
    if (selectedQuality !== 'all' && farm.qualityGrade !== selectedQuality) return false;
    return true;
  });

  const clearFilters = () => {
    setSelectedCrop('all');
    setSelectedCountry('all');
    setSelectedQuality('all');
  };

  return (
    <BuyerLayout>
      <div className="p-4 md:p-6 space-y-6 pb-20 lg:pb-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">Browse Farms</h1>
          <p className="text-muted-foreground text-lg">Find verified farms growing what you need.</p>
        </div>

        {/* Filter Bar */}
        <Card className="shadow-lg border-none">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger>
                    <SelectValue placeholder="Crop type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Crops</SelectItem>
                    <SelectItem value="maize">Maize</SelectItem>
                    <SelectItem value="sorghum">Sorghum</SelectItem>
                    <SelectItem value="soybeans">Soybeans</SelectItem>
                    <SelectItem value="groundnuts">Groundnuts</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    <SelectItem value="kenya">Kenya</SelectItem>
                    <SelectItem value="uganda">Uganda</SelectItem>
                    <SelectItem value="nigeria">Nigeria</SelectItem>
                    <SelectItem value="ghana">Ghana</SelectItem>
                    <SelectItem value="malawi">Malawi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <Select value={selectedQuality} onValueChange={setSelectedQuality}>
                  <SelectTrigger>
                    <SelectValue placeholder="Quality grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grades</SelectItem>
                    <SelectItem value="a">Grade A</SelectItem>
                    <SelectItem value="b">Grade B</SelectItem>
                    <SelectItem value="c">Grade C</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredFarms.length} {filteredFarms.length === 1 ? 'farm' : 'farms'}
          </p>
        </div>

        {/* Farm Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFarms.map((farm) => (
            <Card key={farm.id} className="shadow-lg border-none hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                {/* Farm Photo Placeholder */}
                <div className="w-full h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                  <Sprout className="h-16 w-16 text-primary/40" />
                </div>

                {/* Farm Info */}
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-primary">{farm.name}</h3>
                      <p className="text-sm text-muted-foreground">{farm.farmer}</p>
                    </div>
                    <Badge className={`${farm.qualityColor} text-white`}>
                      {farm.quality}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{farm.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sprout className="h-4 w-4 text-primary" />
                      <span className="font-semibold">
                        {farm.crop} — {farm.variety}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Harvest: {farm.harvestDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Scale className="h-4 w-4" />
                      <span>{farm.quantity} available</span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {farm.verified && (
                      <Badge variant="outline" className="border-secondary text-secondary">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified by Outgrow
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <Link to={`/buyer/farm/${farm.id}`}>
                  <Button asChild className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    <span>View Profile →</span>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredFarms.length === 0 && (
          <div className="text-center py-12">
            <Sprout className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold text-primary mb-2">No farms found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your filters</p>
            <Button onClick={clearFilters}>Clear All Filters</Button>
          </div>
        )}
      </div>
    </BuyerLayout>
  );
};

export default BrowseFarmsPage;
