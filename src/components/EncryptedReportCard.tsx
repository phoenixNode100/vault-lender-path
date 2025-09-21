import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Unlock, Eye, EyeOff } from "lucide-react";

interface FinancialData {
  revenue: string;
  profit: string;
  cashflow: string;
  riskScore: number;
  creditRating: string;
}

interface EncryptedReportCardProps {
  companyName: string;
  applicationId: string;
  financialData: FinancialData;
  isLenderApproved: boolean;
}

export const EncryptedReportCard = ({ 
  companyName, 
  applicationId, 
  financialData, 
  isLenderApproved 
}: EncryptedReportCardProps) => {
  const [isDecrypted, setIsDecrypted] = useState(false);

  const handleDecrypt = () => {
    if (isLenderApproved) {
      setIsDecrypted(!isDecrypted);
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getRiskBadgeVariant = (score: number) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  return (
    <Card className="secure-card hover:shadow-encrypted transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{companyName}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              ID: {applicationId}
            </Badge>
            {isLenderApproved ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDecrypt}
                className="security-lock h-8 w-8 p-0"
              >
                {isDecrypted ? (
                  <Unlock className="h-4 w-4 text-success" />
                ) : (
                  <Lock className="h-4 w-4 text-primary" />
                )}
              </Button>
            ) : (
              <Lock className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Annual Revenue</p>
            <p className={`font-mono text-lg font-semibold ${!isDecrypted ? 'encrypted-text' : ''}`}>
              {isDecrypted || !isLenderApproved ? financialData.revenue : '████████'}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Net Profit</p>
            <p className={`font-mono text-lg font-semibold ${!isDecrypted ? 'encrypted-text' : ''}`}>
              {isDecrypted || !isLenderApproved ? financialData.profit : '████████'}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Cash Flow</p>
            <p className={`font-mono text-lg font-semibold ${!isDecrypted ? 'encrypted-text' : ''}`}>
              {isDecrypted || !isLenderApproved ? financialData.cashflow : '████████'}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Credit Rating</p>
            <p className={`font-mono text-lg font-semibold ${!isDecrypted ? 'encrypted-text' : ''}`}>
              {isDecrypted || !isLenderApproved ? financialData.creditRating : '████'}
            </p>
          </div>
        </div>
        
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Risk Assessment</span>
            <div className="flex items-center gap-2">
              <Badge variant={getRiskBadgeVariant(financialData.riskScore)}>
                {isDecrypted || !isLenderApproved 
                  ? `${financialData.riskScore}/100` 
                  : '██/100'
                }
              </Badge>
              <span className={`text-sm font-semibold ${getRiskColor(financialData.riskScore)}`}>
                {isDecrypted || !isLenderApproved 
                  ? financialData.riskScore >= 80 ? 'Low Risk' : 
                    financialData.riskScore >= 60 ? 'Medium Risk' : 'High Risk'
                  : '████ Risk'
                }
              </span>
            </div>
          </div>
        </div>

        {!isLenderApproved && (
          <div className="pt-2 text-center">
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <EyeOff className="h-3 w-3" />
              Confidential - Lender approval required
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};