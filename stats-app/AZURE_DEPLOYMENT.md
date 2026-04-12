# Azure Deployment Guide

## Prerequisites

- Azure Subscription
- Azure CLI (optional, for manual deployment)
- GitHub account with repository access

## Automated Deployment (GitHub Actions)

This repository uses GitHub Actions to automatically build and deploy to Azure App Service.

### Setup Instructions

1. **Create Azure Web App**
   ```bash
   az webapp create --resource-group your-rg --plan your-plan --name app-fut-stats-wcus --runtime "node|24-lts"
   ```

2. **Get Publish Profile**
   - Go to Azure Portal → App Service → Download publish profile
   - Copy the XML content

3. **Add GitHub Secret**
   - Go to GitHub Repo → Settings → Secrets and variables → Actions
   - Create new secret: `AZURE_PUBLISH_PROFILE`
   - Paste the publish profile content

4. **Push to main branch**
   - Any push to `main` branch will trigger automatic deployment
   - Monitor deployment in GitHub Actions tab

## Application Architecture

- **Runtime**: Node.js 24.x
- **Framework**: Express.js
- **Port**: 8080 (Azure assigned)
- **Memory**: Recommended 512MB+ for App Service
- **Storage**: In-memory (for production, integrate Azure SQL/Cosmos DB)

## Environment Variables in Azure

Set these in Azure Portal → App Service → Configuration → Application settings:

```
NODE_ENV=production
PORT=8080
```

## Monitoring

1. **View Logs**
   ```bash
   az webapp log stream --resource-group your-rg --name app-fut-stats-wcus
   ```

2. **Application Insights** (Optional)
   - Enable in Azure Portal for detailed monitoring

## Troubleshooting

### App Service won't start
- Check logs: `az webapp log stream`
- Verify Node version in package.json
- Check for missing environment variables

### Port issues
- Azure automatically assigns PORT via environment variable
- Server uses `process.env.PORT || 8080`

### Deployment failures
- Check GitHub Actions logs for build errors
- Verify publish profile is valid
- Ensure package.json has correct start script

## Manual Deployment (Azure CLI)

```bash
# Zip application
zip -r app.zip . -x "node_modules/*" ".git/*"

# Deploy
az webapp deployment source config-zip --resource-group your-rg --name app-fut-stats-wcus --src app.zip
```

## Performance Optimization

- Enable gzip compression (configured in web.config)
- Use Application Insights for monitoring
- Consider scaling to multiple instances under load
- Cache API responses where appropriate

## Security Considerations

- Use Application Gateway with WAF
- Enable HTTPS only
- Set appropriate CORS origins
- Store sensitive data in Azure Key Vault
- Implement rate limiting for API
