# Development Phases - Database & API Layer Refactor

## Overview
Migrate from in-memory storage to PostgreSQL database and create a separate service/application layer for business logic.

---

## Stage 1: Database Setup & Models (Azure PostgreSQL)
- [ ] Create Azure PostgreSQL database instance
- [ ] Configure firewall rules and connection security
- [ ] Enable Azure AD authentication on PostgreSQL
- [ ] Create database user for managed identity
- [ ] Install Sequelize ORM and pg driver locally
- [ ] Create `.env` file with Azure database credentials (for local development)
- [ ] Set up database connection config with managed identity support
- [ ] Create User model (id, username, password, fullName, position, age, area, team, createdAt)
- [ ] Create Score model (id, userId, skillId, score, drillScores, submittedAt)
- [ ] Create ScoreHistory model (id, userId, skillId, score, submittedAt)
- [ ] Create database migrations for tables
- [ ] Test database connection from local machine
- [ ] Create `.env.example` with sample Azure connection string format

---

## Stage 2: Create Service/Application Layer
- [ ] Create `server/services/` folder structure
- [ ] Create `UserService` (signup, login, getUser, getUserById)
- [ ] Create `ScoreService` (submitScore, getUserScores, getScoreHistory)
- [ ] Create `SkillService` (getSkills, getDrills)
- [ ] Create `CardService` (generatePlayerCard)
- [ ] Add input validation/sanitization to services
- [ ] Add error handling to services

---

## Stage 3: Migrate to Azure Functions - Authentication
- [ ] Create Azure App Service for frontend
- [ ] Set up system-assigned managed identity for App Service
- [ ] Set up system-assigned managed identities for Azure Functions
- [ ] Grant App Service managed identity permissions to call Azure Functions
- [ ] Configure Azure Functions for managed identity database access
- [ ] Set up Azure PostgreSQL database user role for managed identities
- [ ] Update connection strings to use managed identity authentication
- [ ] Set up API Management (Azure APIM) for unified endpoint
- [ ] Configure CORS for frontend
- [ ] Configure Application Insights logging
- [ ] Set up Key Vault for non-identity secrets (API keys, application settings)
- [ ] Grant managed identities access to Key Vault secrets
- [ ] Configure auto-scaling policies for Functions
- [ ] Configure continuous deployment (CI/CD pipeline)
- [ ] Test end-to-end authentication using managed identities

---

## Stage 4: Migrate to Azure Functions - Scores
- [ ] Create `ScoreSubmitFunction` (HTTP-triggered)
- [ ] Create `ScoreRetrieveFunction` (HTTP-triggered)
- [ ] Create `PlayerCardGeneratorFunction` (HTTP-triggered)
- [ ] Update functions to use ScoreService
- [ ] Test functions locally
- [ ] Deploy score functions to Azure
- [ ] Test endpoints against Azure Database

---

## Stage 5: Migrate to Azure Functions - Skills
- [ ] Create `SkillsFunction` (HTTP-triggered)
- [ ] Create `DrillsFunction` (HTTP-triggered)
- [ ] Test functions locally
- [ ] Deploy skill functions to Azure
- [ ] Update React frontend to call new Azure Function endpoints
- [ ] Test end-to-end workflows

---

## Stage 6: Azure Function Configuration & Optimization
- [ ] Set up API Management (Azure APIM) for unified endpoint
- [ ] Configure CORS for frontend
- [ ] Set up function authentication (if needed)
- [ ] Configure auto-scaling policies
- [ ] Set up Application Insights logging
- [ ] Set up Key Vault for secrets (connection strings, API keys)
- [ ] Configure continuous deployment (CI/CD pipeline)
- [ ] Remove local Express server from production

---

## Files to Create (Azure Functions Architecture)

### Database Configuration
- [ ] `server/config/database.js` - Azure PostgreSQL connection config

### Data Models
- [ ] `server/models/User.js` - User model
- [ ] `server/models/Score.js` - Score model
- [ ] `server/models/ScoreHistory.js` - ScoreHistory model

### Services/Application Layer
- [ ] `server/services/UserService.js` - User business logic
- [ ] `server/services/ScoreService.js` - Score business logic
- [ ] `server/services/SkillService.js` - Skill business logic
- [ ] `server/services/CardService.js` - Card generation logic

### Azure Functions
- [ ] `auth-function/index.js` - Authentication function (signup/login/verify)
- [ ] `score-submit-function/index.js` - Score submission function
- [ ] `score-retrieve-function/index.js` - Score retrieval function
- [ ] `card-generator-function/index.js` - Player card generation function
- [ ] `skills-function/index.js` - Get skills list
- [ ] `drills-function/index.js` - Get drills for a skill

### Function Configuration
- [ ] `function.json` files for each function (bindings, triggers)
- [ ] `local.settings.json` - Local development settings
- [ ] `host.json` - Shared function settings
- [ ] Azure Function deployment files

### Documentation & Config
- [ ] `.env.example` - Environment variables template
- [ ] `AZURE_SETUP.md` - Azure PostgreSQL and Functions setup guide

## Files to Modify
- [ ] `package.json` - Add Sequelize, pg, bcrypt, Azure Functions dependencies
- [ ] `server/index.js` - Update to create models and initialize Azure DB (keep for local testing)
- [ ] `client/src/services/` - Update API endpoints to call Azure Functions URLs instead of local routes
- [ ] `client/src/config/` - Add Azure Function endpoint configuration

---

## Architecture Overview

### Before (Express + In-Memory)
```
Client → Express Routes → In-Memory Storage → Lost on restart
```

### After (Azure Services + PostgreSQL + Managed Identities)
```
Client → Azure App Service (Managed Identity)
         ↓
         Calls Azure Functions (Managed Identities) via APIM
         ↓
         Services (Business Logic)
         ↓
         Azure PostgreSQL (AAD Authentication with Managed Identity)
```

**Security:** No connection strings in code or Key Vault - all database communication uses managed identities.
**Benefits:** No credential rotation needed, RBAC-based access control, audit trails for all connections.

---

## Testing & Security (Pen Testing)

### Unit & Integration Tests
- [ ] Write unit tests for UserService
- [ ] Write unit tests for ScoreService
- [ ] Write unit tests for SkillService
- [ ] Write integration tests for Azure Functions
- [ ] Test all API endpoints (signup, login, scores, skills)

### Security Testing
- [ ] Test SQL injection vulnerabilities
- [ ] Test authentication bypass attempts
- [ ] Test authorization (user can only access their own data)
- [ ] Test input validation (invalid data types, missing fields, oversized payloads)
- [ ] Test password security (hashing, strength requirements)
- [ ] Test session/token security (expiry, revocation)
- [ ] Test rate limiting on functions
- [ ] Test CORS configuration
- [ ] Verify sensitive data is not logged
- [ ] Test for XSS vulnerabilities in API responses
- [ ] Test for CSRF vulnerabilities
- [ ] Verify database connection security (SSL/TLS)
- [ ] Test error handling (no sensitive info in error messages)
- [ ] Verify Key Vault secrets are not exposed

### Performance & Load Testing
- [ ] Load testing (multiple concurrent users)
- [ ] Test function cold start times
- [ ] Monitor Azure Function execution time
- [ ] Test database connection pooling

### Final Verification
- [ ] Security audit of all API endpoints
- [ ] Test end-to-end user workflow
- [ ] Verify all functions are logging correctly to Application Insights
- [ ] Document security findings and fixes

---

## Current Status: ⏳ Ready to start Stage 1
- Using **Azure PostgreSQL** for database (with AAD/Managed Identity authentication)
- Using **Azure Functions** for serverless API deployment
- Using **Managed Identities** for secure service-to-service communication (no credentials in code)
- Using **Azure App Service** for frontend deployment
- Services layer will be shared between local testing and Azure Functions
