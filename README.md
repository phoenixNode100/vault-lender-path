# Vault Lender Path

A decentralized lending platform built with FHE (Fully Homomorphic Encryption) technology for secure and private financial transactions.

## Features

- **FHE-Encrypted Lending**: All sensitive financial data is encrypted using Fully Homomorphic Encryption
- **Secure Wallet Integration**: Connect with popular wallets like MetaMask, Rainbow, and more
- **Decentralized Vaults**: Create and manage lending vaults with encrypted liquidity tracking
- **Private Credit Scoring**: Credit scores are encrypted and only accessible to authorized parties
- **Smart Contract Integration**: Built on Ethereum Sepolia testnet with FHE capabilities

## Technologies Used

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Wallet Integration**: RainbowKit, Wagmi, Viem
- **Blockchain**: Ethereum Sepolia, FHEVM
- **Styling**: Tailwind CSS with custom secure themes

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Web3 wallet (MetaMask, Rainbow, etc.)
- Sepolia ETH for gas fees

### Installation

1. Clone the repository:
```bash
git clone https://github.com/phoenixNode100/vault-lender-path.git
cd vault-lender-path
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local with your configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
```

4. Start the development server:
```bash
npm run dev
```

## Smart Contract

The platform uses a FHE-enabled smart contract (`VaultLender.sol`) that provides:

- **Encrypted Loan Applications**: Submit loan requests with encrypted financial data
- **Private Credit Scoring**: Credit scores are encrypted and only accessible to authorized verifiers
- **Secure Vault Management**: Create and manage lending vaults with encrypted liquidity tracking
- **Private Repayment Tracking**: All repayment data is encrypted using FHE

### Contract Functions

- `submitLoanApplication()`: Submit encrypted loan applications
- `approveLoan()`: Approve loans with encrypted interest rates
- `createVault()`: Create lending vaults with encrypted liquidity
- `makeRepayment()`: Process encrypted loan repayments
- `updateCreditScore()`: Update encrypted borrower credit scores

## Security Features

- **FHE Encryption**: All sensitive data is encrypted using Fully Homomorphic Encryption
- **Private Transactions**: Financial data remains private even during computation
- **Secure Wallet Integration**: Multiple wallet support with secure connection protocols
- **Encrypted Credit Scoring**: Credit scores are encrypted and only accessible to authorized parties

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your preferred hosting service

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the GitHub repository.
