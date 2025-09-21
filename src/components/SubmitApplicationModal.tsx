import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Building2, 
  DollarSign, 
  Upload, 
  Shield, 
  CheckCircle,
  AlertTriangle,
  Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SubmitApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitApplicationModal = ({ isOpen, onClose }: SubmitApplicationModalProps) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [application, setApplication] = useState({
    companyName: "",
    registrationNumber: "",
    industry: "",
    yearEstablished: "",
    loanAmount: "",
    loanPurpose: "",
    repaymentTerm: "",
    annualRevenue: "",
    monthlyRevenue: "",
    netProfit: "",
    existingDebt: "",
    collateral: "",
    businessDescription: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: ""
  });

  const { toast } = useToast();

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate application submission
    setTimeout(() => {
      const applicationId = `SME-${Date.now()}`;
      toast({
        title: "Application Submitted Successfully",
        description: `Your loan application ${applicationId} has been encrypted and submitted for review.`,
      });
      setIsSubmitting(false);
      onClose();
      setStep(1);
    }, 3000);
  };

  const updateApplication = (field: string, value: string) => {
    setApplication(prev => ({...prev, [field]: value}));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Submit Loan Application
          </DialogTitle>
          <DialogDescription>
            Complete the secure loan application form. All data will be encrypted.
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: Company Information */}
        {step === 1 && (
          <Card className="secure-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Company Information
              </CardTitle>
              <CardDescription>
                Provide basic information about your business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={application.companyName}
                    onChange={(e) => updateApplication('companyName', e.target.value)}
                    placeholder="Enter company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Registration Number *</Label>
                  <Input
                    id="registrationNumber"
                    value={application.registrationNumber}
                    onChange={(e) => updateApplication('registrationNumber', e.target.value)}
                    placeholder="Company registration number"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry *</Label>
                  <Select onValueChange={(value) => updateApplication('industry', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearEstablished">Year Established *</Label>
                  <Input
                    id="yearEstablished"
                    type="number"
                    value={application.yearEstablished}
                    onChange={(e) => updateApplication('yearEstablished', e.target.value)}
                    placeholder="2020"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessDescription">Business Description *</Label>
                <Textarea
                  id="businessDescription"
                  value={application.businessDescription}
                  onChange={(e) => updateApplication('businessDescription', e.target.value)}
                  placeholder="Describe your business activities and operations"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Loan Details */}
        {step === 2 && (
          <Card className="secure-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Loan Requirements
              </CardTitle>
              <CardDescription>
                Specify your financing needs and terms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="loanAmount">Loan Amount (USD) *</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    value={application.loanAmount}
                    onChange={(e) => updateApplication('loanAmount', e.target.value)}
                    placeholder="250000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="repaymentTerm">Repayment Term *</Label>
                  <Select onValueChange={(value) => updateApplication('repaymentTerm', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 months</SelectItem>
                      <SelectItem value="24">24 months</SelectItem>
                      <SelectItem value="36">36 months</SelectItem>
                      <SelectItem value="48">48 months</SelectItem>
                      <SelectItem value="60">60 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="loanPurpose">Loan Purpose *</Label>
                <Select onValueChange={(value) => updateApplication('loanPurpose', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expansion">Business Expansion</SelectItem>
                    <SelectItem value="equipment">Equipment Purchase</SelectItem>
                    <SelectItem value="inventory">Inventory Financing</SelectItem>
                    <SelectItem value="cashflow">Working Capital</SelectItem>
                    <SelectItem value="renovation">Property Renovation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="collateral">Collateral Information</Label>
                <Textarea
                  id="collateral"
                  value={application.collateral}
                  onChange={(e) => updateApplication('collateral', e.target.value)}
                  placeholder="Describe any collateral you can provide (optional)"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Financial Information */}
        {step === 3 && (
          <Card className="secure-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Financial Information
              </CardTitle>
              <CardDescription>
                Provide financial details for risk assessment (encrypted)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">All financial data is encrypted</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="annualRevenue">Annual Revenue (USD) *</Label>
                  <Input
                    id="annualRevenue"
                    type="number"
                    value={application.annualRevenue}
                    onChange={(e) => updateApplication('annualRevenue', e.target.value)}
                    placeholder="2400000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyRevenue">Average Monthly Revenue (USD) *</Label>
                  <Input
                    id="monthlyRevenue"
                    type="number"
                    value={application.monthlyRevenue}
                    onChange={(e) => updateApplication('monthlyRevenue', e.target.value)}
                    placeholder="200000"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="netProfit">Net Profit (USD) *</Label>
                  <Input
                    id="netProfit"
                    type="number"
                    value={application.netProfit}
                    onChange={(e) => updateApplication('netProfit', e.target.value)}
                    placeholder="380000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="existingDebt">Existing Debt (USD)</Label>
                  <Input
                    id="existingDebt"
                    type="number"
                    value={application.existingDebt}
                    onChange={(e) => updateApplication('existingDebt', e.target.value)}
                    placeholder="150000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Contact & Review */}
        {step === 4 && (
          <div className="space-y-4">
            <Card className="secure-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person *</Label>
                    <Input
                      id="contactPerson"
                      value={application.contactPerson}
                      onChange={(e) => updateApplication('contactPerson', e.target.value)}
                      placeholder="Full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email Address *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={application.contactEmail}
                      onChange={(e) => updateApplication('contactEmail', e.target.value)}
                      placeholder="contact@company.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Phone Number *</Label>
                  <Input
                    id="contactPhone"
                    value={application.contactPhone}
                    onChange={(e) => updateApplication('contactPhone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="secure-card border-success/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-success">
                  <CheckCircle className="h-4 w-4" />
                  Application Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Company:</span>
                    <span className="ml-2 font-medium">{application.companyName || "Not provided"}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Loan Amount:</span>
                    <span className="ml-2 font-medium">${application.loanAmount || "0"}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Term:</span>
                    <span className="ml-2 font-medium">{application.repaymentTerm || "0"} months</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Purpose:</span>
                    <span className="ml-2 font-medium">{application.loanPurpose || "Not specified"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button 
            variant="outline" 
            onClick={step === 1 ? onClose : handlePrevious}
          >
            {step === 1 ? "Cancel" : "Previous"}
          </Button>
          
          <div className="flex gap-2">
            {step < totalSteps ? (
              <Button onClick={handleNext} className="gradient-secure">
                Next Step
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="gradient-secure"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Encrypting & Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Application
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};