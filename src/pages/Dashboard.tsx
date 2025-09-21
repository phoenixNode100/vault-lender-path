import { useState } from "react";
import { SecureLogo } from "@/components/SecureLogo";
import { EncryptedReportCard } from "@/components/EncryptedReportCard";
import { WalletConnection } from "@/components/WalletConnection";
import { CashflowFooter } from "@/components/CashflowFooter";
import { SettingsModal } from "@/components/SettingsModal";
import { SubmitApplicationModal } from "@/components/SubmitApplicationModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileText, Users, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  // Mock data for SME applications
  const smeApplications = [
    {
      companyName: "TechFlow Solutions Ltd.",
      applicationId: "SME-2024-001",
      financialData: {
        revenue: "$2.4M",
        profit: "$380K",
        cashflow: "+$125K",
        riskScore: 85,
        creditRating: "A-"
      },
      isLenderApproved: true
    },
    {
      companyName: "Green Energy Innovations",
      applicationId: "SME-2024-002", 
      financialData: {
        revenue: "$1.8M",
        profit: "$220K",
        cashflow: "+$95K",
        riskScore: 72,
        creditRating: "B+"
      },
      isLenderApproved: false
    },
    {
      companyName: "Metro Logistics Group",
      applicationId: "SME-2024-003",
      financialData: {
        revenue: "$4.2M",
        profit: "$630K",
        cashflow: "+$280K",
        riskScore: 91,
        creditRating: "A"
      },
      isLenderApproved: true
    }
  ];

  const stats = [
    {
      title: "Active Applications",
      value: "24",
      icon: FileText,
      trend: "+12%"
    },
    {
      title: "Approved Lenders",
      value: "8",
      icon: Shield,
      trend: "+2"
    },
    {
      title: "Total SMEs",
      value: "156",
      icon: Users,
      trend: "+18%"
    },
    {
      title: "Avg. Risk Score",
      value: "78.5",
      icon: TrendingUp,
      trend: "+3.2"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <SecureLogo />
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-xs">
                Lender Portal
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsSettingsOpen(true)}
              >
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-secure bg-clip-text text-transparent">
              Confidential SME Financing
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Secure loan underwriting platform with encrypted financial data, 
              accessible only to verified lenders for accurate risk assessment.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="secure-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-success flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {stat.trend} from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Wallet Connection */}
          <div className="max-w-md">
            <WalletConnection onApplicationClick={() => setIsApplicationOpen(true)} />
          </div>

          {/* SME Applications Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">SME Loan Applications</h2>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  Real-time Updates
                </Badge>
                <div className="w-2 h-2 bg-success rounded-full animate-pulse-secure" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {smeApplications.map((application, index) => (
                <EncryptedReportCard
                  key={index}
                  companyName={application.companyName}
                  applicationId={application.applicationId}
                  financialData={application.financialData}
                  isLenderApproved={application.isLenderApproved}
                />
              ))}
            </div>
          </div>

          {/* Security Notice */}
          <Card className="secure-card border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-primary mt-1" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-primary">End-to-End Encryption</h3>
                  <p className="text-sm text-muted-foreground">
                    All SME financial data is encrypted using advanced cryptographic protocols. 
                    Only verified and approved lenders can decrypt sensitive information for 
                    risk assessment purposes. Your data remains confidential throughout the 
                    entire underwriting process.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <CashflowFooter />

      {/* Modals */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
      <SubmitApplicationModal 
        isOpen={isApplicationOpen} 
        onClose={() => setIsApplicationOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;