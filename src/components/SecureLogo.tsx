import { Briefcase, Lock } from "lucide-react";

export const SecureLogo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="relative bg-gradient-secure p-3 rounded-lg shadow-secure">
          <Briefcase className="h-6 w-6 text-primary-foreground" />
          
          {/* Circuit lock overlay */}
          <div className="absolute -top-1 -right-1">
            <div className="bg-accent rounded-full p-1">
              <Lock className="h-3 w-3 text-accent-foreground" />
            </div>
          </div>
          
          {/* Circuit pattern */}
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
              <path 
                d="M3 12h3m3-6v12m6-12v12m3 0h3" 
                stroke="currentColor" 
                strokeWidth="0.5"
                className="text-primary-foreground"
              />
              <circle cx="6" cy="12" r="1" fill="currentColor" className="text-primary-foreground" />
              <circle cx="12" cy="6" r="1" fill="currentColor" className="text-primary-foreground" />
              <circle cx="12" cy="18" r="1" fill="currentColor" className="text-primary-foreground" />
              <circle cx="18" cy="12" r="1" fill="currentColor" className="text-primary-foreground" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col">
        <h1 className="text-xl font-bold bg-gradient-secure bg-clip-text text-transparent">
          SecureCapital
        </h1>
        <p className="text-xs text-muted-foreground">
          Confidential SME Financing
        </p>
      </div>
    </div>
  );
};