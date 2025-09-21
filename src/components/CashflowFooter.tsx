import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export const CashflowFooter = () => {
  const cashflowData = [
    { month: "Jan", value: "████", trend: "up", visible: false },
    { month: "Feb", value: "████", trend: "up", visible: false },
    { month: "Mar", value: "$2.1M", trend: "up", visible: true },
    { month: "Apr", value: "████", trend: "down", visible: false },
    { month: "May", value: "████", trend: "up", visible: false },
    { month: "Jun", value: "$3.8M", trend: "up", visible: true },
  ];

  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Market Cashflow Overview
            </h3>
            <p className="text-sm text-muted-foreground">
              Aggregated SME financial performance data - individual details encrypted for privacy
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-6 gap-2">
              {cashflowData.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">
                    {item.month}
                  </div>
                  <div className="cashflow-bar h-12 flex items-end mb-2">
                    <div 
                      className={`w-full rounded-t transition-all duration-500 ${
                        item.visible 
                          ? 'bg-gradient-cashflow h-full' 
                          : 'bg-muted h-6'
                      }`}
                      style={{
                        animationDelay: `${index * 200}ms`
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-xs font-mono">
                      {item.value}
                    </span>
                    {item.visible && (
                      item.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 text-success" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-destructive" />
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Encrypted Values</span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse-secure" />
                Live Data
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 SecureCapital Platform - All financial data encrypted and protected
          </p>
        </div>
      </div>
    </footer>
  );
};