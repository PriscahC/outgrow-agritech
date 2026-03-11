import React from 'react';
import BuyerLayout from '@/components/buyer/BuyerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FileText, Download } from 'lucide-react';
import { toast } from 'sonner';

const QualityReportsPage = () => {
  const reports = [
    {
      id: 1,
      farm: 'Wanjiku Farm',
      crop: 'Maize',
      date: 'Jun 20, 2025',
      overallScore: 84,
      soilHealth: 88,
      moistureConsistency: 82,
      pestHistory: 90,
      yieldReliability: 76,
    },
    {
      id: 2,
      farm: 'Okello Farm',
      crop: 'Sorghum',
      date: 'Jun 15, 2025',
      overallScore: 91,
      soilHealth: 94,
      moistureConsistency: 89,
      pestHistory: 92,
      yieldReliability: 88,
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <BuyerLayout>
      <div className="p-4 md:p-6 space-y-6 pb-20 lg:pb-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">Quality Reports</h1>
          <p className="text-muted-foreground text-lg">Data-backed assurance on every farm.</p>
        </div>

        {/* Reports List */}
        <div className="space-y-6">
          {reports.map((report) => (
            <Card key={report.id} className="shadow-lg border-none">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl font-serif text-primary flex items-center gap-2">
                      <FileText className="h-5 w-5 text-secondary" />
                      {report.farm} — {report.crop}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Report Date: {report.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className={`text-4xl font-bold font-serif ${getScoreColor(report.overallScore)}`}>
                        {report.overallScore}
                      </p>
                      <p className="text-sm text-muted-foreground">out of 100</p>
                    </div>
                    <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2" onClick={() => toast.success('PDF download started')}>
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold text-foreground">Soil Health</span>
                      <span className={`text-sm font-bold ${getScoreColor(report.soilHealth)}`}>
                        {report.soilHealth}/100
                      </span>
                    </div>
                    <Progress value={report.soilHealth} className="h-3" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold text-foreground">Moisture Consistency</span>
                      <span className={`text-sm font-bold ${getScoreColor(report.moistureConsistency)}`}>
                        {report.moistureConsistency}/100
                      </span>
                    </div>
                    <Progress value={report.moistureConsistency} className="h-3" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold text-foreground">Pest History</span>
                      <span className={`text-sm font-bold ${getScoreColor(report.pestHistory)}`}>
                        {report.pestHistory}/100
                      </span>
                    </div>
                    <Progress value={report.pestHistory} className="h-3" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold text-foreground">Yield Reliability</span>
                      <span className={`text-sm font-bold ${getScoreColor(report.yieldReliability)}`}>
                        {report.yieldReliability}/100
                      </span>
                    </div>
                    <Progress value={report.yieldReliability} className="h-3" />
                  </div>

                  <div className="pt-4 border-t">
                    <Badge className={`${getScoreBgColor(report.overallScore)} text-white text-sm px-3 py-1`}>
                      {report.overallScore >= 85 ? 'Excellent Quality' : report.overallScore >= 70 ? 'Good Quality' : 'Fair Quality'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Card */}
        <Card className="shadow-lg border-none bg-secondary/10">
          <CardContent className="p-6">
            <h3 className="font-bold text-primary mb-2">About Quality Reports</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our quality reports are generated using data from IoT sensors, drone scans, and field visits by our
              agronomists. Each farm is scored across multiple dimensions to give you confidence in your sourcing
              decisions. Reports are updated after every drone scan.
            </p>
          </CardContent>
        </Card>
      </div>
    </BuyerLayout>
  );
};

export default QualityReportsPage;
