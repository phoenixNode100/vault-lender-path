# 🚀 Vercel Deployment Guide for VaultLender

This comprehensive guide walks you through deploying the VaultLender FHE-encrypted lending platform to Vercel.

## 📋 Prerequisites

- **GitHub Account** with repository access
- **Vercel Account** (free tier available)
- **Node.js 18+** installed locally (for testing)
- **Web3 Wallet** for testing functionality

## 🔧 Step 1: Repository Preparation

Ensure all changes are committed and pushed to the main branch:

```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "Prepare for Vercel deployment"

# Push to main branch
git push origin main
```

## 🔗 Step 2: Connect to Vercel

### 2.1 Access Vercel Dashboard
1. Navigate to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Authorize Vercel to access your repositories

### 2.2 Import Project
1. Click **"New Project"** or **"Import Project"**
2. Select **"Import Git Repository"**
3. Choose `phoenixNode100/vault-lender-path` from the list
4. Click **"Import"**

## ⚙️ Step 3: Configure Build Settings

### 3.1 Framework Configuration
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3.2 Advanced Settings
- **Root Directory**: Leave as default (root of repository)
- **Node.js Version**: 18.x (recommended)

## 🔐 Step 4: Environment Variables Setup

Navigate to **Project Settings > Environment Variables** and configure:

### Required Variables
```env
# Network Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID

# Optional: Alternative RPC
VITE_ALT_RPC_URL=https://1rpc.io/sepolia
```

### Environment Scope
**Important**: Set these variables for all environments:
- ✅ **Production**
- ✅ **Preview** 
- ✅ **Development**

## Step 5: Configure Custom Domain (Optional)

1. **Add Domain**
   - Go to Project Settings > Domains
   - Click "Add Domain"
   - Enter your custom domain (e.g., `vaultlenderpath.com`)
   - Follow DNS configuration instructions

2. **DNS Configuration**
   - Add a CNAME record pointing to your Vercel deployment
   - Example: `vaultlenderpath.com` → `vault-lender-path.vercel.app`

## Step 6: Deploy

1. **Automatic Deployment**
   - Vercel will automatically deploy when you push to the main branch
   - You can also trigger manual deployments from the dashboard

2. **Manual Deployment**
   - Click "Deploy" in the Vercel dashboard
   - Wait for the build to complete
   - Your app will be available at the provided URL

## Step 7: Verify Deployment

1. **Check Build Logs**
   - Go to the "Functions" tab in Vercel dashboard
   - Check for any build errors or warnings

2. **Test the Application**
   - Visit your deployed URL
   - Test wallet connection functionality
   - Verify all features work correctly

## Step 8: Configure Production Settings

1. **Performance Optimization**
   - Enable "Automatic HTTPS" (enabled by default)
   - Configure caching headers if needed

2. **Analytics (Optional)**
   - Enable Vercel Analytics in Project Settings
   - Monitor performance and user behavior

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (should be 18+)
   - Verify all dependencies are in package.json
   - Check build logs for specific errors

2. **Environment Variables**
   - Ensure all required environment variables are set
   - Check variable names match exactly (case-sensitive)

3. **Wallet Connection Issues**
   - Verify WalletConnect Project ID is correct
   - Check RPC URL is accessible
   - Ensure chain ID matches your configuration

### Build Optimization

1. **Bundle Analysis**
   - Use `npm run build` locally to check bundle size
   - Optimize imports to reduce bundle size

2. **Performance**
   - Enable Vercel's Edge Functions if needed
   - Configure CDN settings for static assets

## Monitoring and Maintenance

1. **Deployment Monitoring**
   - Set up deployment notifications
   - Monitor build times and success rates

2. **Performance Monitoring**
   - Use Vercel Analytics to track performance
   - Monitor Core Web Vitals

3. **Updates**
   - Push changes to main branch for automatic deployment
   - Use preview deployments for testing changes

## Security Considerations

1. **Environment Variables**
   - Never commit sensitive keys to the repository
   - Use Vercel's environment variable encryption

2. **HTTPS**
   - Vercel provides automatic HTTPS
   - Ensure all external API calls use HTTPS

3. **CORS**
   - Configure CORS settings if needed
   - Restrict access to specific domains

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Repository**: [github.com/phoenixNode100/vault-lender-path](https://github.com/phoenixNode100/vault-lender-path)
- **Project Issues**: Create an issue in the GitHub repository

## Deployment Checklist

- [ ] Repository is connected to Vercel
- [ ] Build settings are configured correctly
- [ ] Environment variables are set
- [ ] Custom domain is configured (if applicable)
- [ ] Build completes successfully
- [ ] Application is accessible and functional
- [ ] Wallet connection works
- [ ] All features are tested

Your Vault Lender Path application should now be successfully deployed on Vercel!
