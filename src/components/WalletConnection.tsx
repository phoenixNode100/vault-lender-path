import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Shield, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface WalletConnectionProps {
  onApplicationClick?: () => void;
}

export const WalletConnection = ({ onApplicationClick }: WalletConnectionProps = {}) => {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { toast } = useToast();

  useEffect(() => {
    const handleApplicationModal = () => {
      if (onApplicationClick) {
        onApplicationClick();
      }
    };

    window.addEventListener('openApplicationModal', handleApplicationModal);
    return () => window.removeEventListener('openApplicationModal', handleApplicationModal);
  }, [onApplicationClick]);

  const handleConnect = async () => {
    try {
      if (connectors[0]) {
        await connect({ connector: connectors[0] });
        toast({
          title: "Wallet Connected",
          description: "Your wallet has been securely connected for loan submissions.",
        });
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been safely disconnected.",
    });
  };

  return (
    <Card className="secure-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-primary" />
          Secure Wallet Connection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConnected ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                Connect your wallet to submit loan applications securely
              </span>
            </div>
            
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus ||
                    authenticationStatus === 'authenticated');

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      'style': {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <Button 
                            onClick={openConnectModal}
                            disabled={isPending}
                            className="w-full gradient-secure"
                          >
                            {isPending ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                Connecting...
                              </>
                            ) : (
                              <>
                                <Wallet className="h-4 w-4 mr-2" />
                                Connect Wallet
                              </>
                            )}
                          </Button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <Button 
                            onClick={openChainModal}
                            className="w-full gradient-secure"
                          >
                            Wrong network
                          </Button>
                        );
                      }

                      return (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 p-3 rounded-lg bg-success/10 border border-success/20">
                            <CheckCircle className="h-4 w-4 text-success" />
                            <span className="text-sm text-success-foreground">
                              Wallet successfully connected
                            </span>
                          </div>
                          
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Connected Address:</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="font-mono text-xs">
                                {`${account.address.slice(0, 6)}...${account.address.slice(-4)}`}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={openAccountModal}
                              className="flex-1"
                            >
                              Account
                            </Button>
                            <Button 
                              size="sm" 
                              className="flex-1 gradient-secure"
                              onClick={() => window.dispatchEvent(new CustomEvent('openApplicationModal'))}
                            >
                              Submit Application
                            </Button>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-success/10 border border-success/20">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm text-success-foreground">
                Wallet successfully connected
              </span>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Connected Address:</p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-xs">
                  {`${address?.slice(0, 6)}...${address?.slice(-4)}`}
                </Badge>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDisconnect}
                className="flex-1"
              >
                Disconnect
              </Button>
              <Button 
                size="sm" 
                className="flex-1 gradient-secure"
                onClick={() => window.dispatchEvent(new CustomEvent('openApplicationModal'))}
              >
                Submit Application
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};