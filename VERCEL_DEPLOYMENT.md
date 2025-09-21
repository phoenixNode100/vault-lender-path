# Vercel Deployment Guide for Vault Lender Path

This guide provides step-by-step instructions for deploying the Vault Lender Path application to Vercel.

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier available)
- Node.js 18+ installed locally (for testing)

## Step 1: Prepare the Repository

1. Ensure all changes are committed and pushed to the main branch:
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

## Step 2: Connect to Vercel

1. **Visit Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project" or "Import Project"
   - Select "Import Git Repository"
   - Choose `phoenixNode100/vault-lender-path` from the list
   - Click "Import"

## Step 3: Configure Build Settings

1. **Framework Preset**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

2. **Root Directory**
   - Leave as default (root of repository)

## Step 4: Set Environment Variables

In the Vercel dashboard, go to Project Settings > Environment Variables and add:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
```

**Important**: Make sure to set these for all environments (Production, Preview, Development).

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
