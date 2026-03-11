import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Wallet, TrendingUp, CheckCircle, Clock, Building2 } from 'lucide-react';

const FinancePage = () => {
  const financeScore = {
    total: 72,
    farmPerformance: 80,
    repaymentHistory: 70,
    seasonConsistency: 65,
  };

  const loanOffers = [
    {
      bank: 'Equity Bank',
      product: 'Kilimo Loan',
      amount: 45000,
      interest: 10,
      terms: 'Repay after harvest',
    },
    {
      bank: 'KCB',
      product: 'Mashinani Loan',
      amount: 30000,
      interest: 8,
      terms: 'Flexible repayment',
    },
  ];

  const activeLoan = {
    amount: 20000,
    bank: 'Equity Bank',
    disbursed: 'Mar 5, 2025',
    due: 'Aug 1, 2025',
    repaid: 0,
    status: 'Repayment due after harvest',
  };

  const pastLoans = [
    {
      date: 'Oct 2024',
      amount: 15000,
      status: 'Fully Repaid',
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 70) return 'Good standing';
    if (score >= 50) return 'Fair standing';
    return 'Needs improvement';
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">Finance</h1>
          <p className="text-muted-foreground text-lg">Get the support you need to grow more next season.</p>
        </div>

        {/* Finance Score Card */}
        <Card className="shadow-lg border-none bg-gradient-to-br from-secondary/10 to-secondary/5">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-primary">Your Finance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="relative w-48 h-48">
                  <svg className="transform -rotate-90 w-48 h-48">
                    <circle
                      cx="96"
                      cy="96"
                      r="90"
                      stroke="hsl(var(--muted))"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="90"
                      stroke="hsl(var(--secondary))"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={2 * Math.PI * 90}
                      strokeDashoffset={2 * Math.PI * 90 * (1 - financeScore.total / 100)}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-5xl font-bold font-serif ${getScoreColor(financeScore.total)}`}>
                      {financeScore.total}
                    </span>
                    <span className="text-sm text-muted-foreground font-medium">out of 100</span>
                  </div>
                </div>
                <Badge className="bg-green-500 text-white text-lg px-4 py-2">{getScoreLabel(financeScore.total)}</Badge>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-foreground">Farm Performance</span>
                    <span className="text-sm font-bold text-secondary">{financeScore.farmPerformance}%</span>
                  </div>
                  <Progress value={financeScore.farmPerformance} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-foreground">Repayment History</span>
                    <span className="text-sm font-bold text-secondary">{financeScore.repaymentHistory}%</span>
                  </div>
                  <Progress value={financeScore.repaymentHistory} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-foreground">Season Consistency</span>
                    <span className="text-sm font-bold text-secondary">{financeScore.seasonConsistency}%</span>
                  </div>
                  <Progress value={financeScore.seasonConsistency} className="h-3" />
                </div>
                <p className="text-sm text-muted-foreground italic pt-4 border-t">
                  This score helps partner banks offer you loans faster.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Loan Offers */}
        <div>
          <h3 className="text-xl font-serif font-bold text-primary mb-4">Available Loan Offers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loanOffers.map((loan, index) => (
              <Card key={index} className="shadow-lg border-none hover:shadow-xl transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-primary/10 rounded-2xl">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-primary">{loan.bank}</h4>
                      <p className="text-sm text-muted-foreground">{loan.product}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-muted-foreground">Up to</span>
                      <span className="text-3xl font-bold font-serif text-secondary">
                        KSh {loan.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Interest</span>
                      <span className="font-semibold">{loan.interest}% per season</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Terms</span>
                      <span className="font-semibold text-sm">{loan.terms}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 mt-4" onClick={() => console.log('Apply for loan')}>
                    Apply Now →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Active Loan */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-primary flex items-center gap-2">
              <Wallet className="h-5 w-5 text-secondary" />
              Active Loan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Loan Amount</p>
                  <p className="text-2xl font-bold font-serif text-primary">
                    KSh {activeLoan.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">From</p>
                  <p className="text-lg font-semibold text-foreground">{activeLoan.bank}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Disbursed</p>
                  <p className="text-lg font-semibold text-foreground">{activeLoan.disbursed}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Due Date</p>
                  <p className="text-lg font-semibold text-foreground">{activeLoan.due}</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground">Repayment Progress</span>
                  <span className="text-sm font-bold text-muted-foreground">
                    KSh {activeLoan.repaid.toLocaleString()} / KSh {activeLoan.amount.toLocaleString()}
                  </span>
                </div>
                <Progress value={(activeLoan.repaid / activeLoan.amount) * 100} className="h-3" />
              </div>

              <div className="flex items-center gap-2 p-4 bg-yellow-500/10 rounded-xl">
                <Clock className="h-5 w-5 text-yellow-600" />
                <Badge className="bg-yellow-500 text-white">🟡 {activeLoan.status}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Past Loans */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-primary">Past Loans</CardTitle>
          </CardHeader>
          <CardContent>
            {pastLoans.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No past loans. Your loan history will appear here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pastLoans.map((loan, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-muted/50"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <span className="text-sm font-semibold text-muted-foreground min-w-[80px]">{loan.date}</span>
                      <div className="flex-1">
                        <p className="font-bold text-foreground">KSh {loan.amount.toLocaleString()}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500 text-white flex items-center gap-1 w-fit">
                      <CheckCircle className="h-4 w-4" />
                      {loan.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FinancePage;
