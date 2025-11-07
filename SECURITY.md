# Security Policy

## Security Measures Implemented

### 1. Authentication & Authorization
- ✅ **JWT-based authentication** with secure token management
- ✅ **HTTPOnly cookies** for token storage (prevents XSS attacks)
- ✅ **Secure cookie flag** enabled in production
- ✅ **Role-based access control** (ADMIN, EDITOR roles)
- ✅ **Strong JWT secret validation** (minimum 32 characters required)
- ✅ **Password hashing** using bcrypt with salt rounds

### 2. Input Validation & Sanitization
- ✅ **Server-side validation** for all API endpoints
- ✅ **Email format validation** in Firestore rules
- ✅ **String length limits** enforced
- ✅ **Required field validation** in Firestore rules
- ✅ **File type validation** (images and videos only)
- ✅ **File size limits** (50MB maximum)

### 3. Security Headers
- ✅ **X-Frame-Options**: SAMEORIGIN (prevents clickjacking)
- ✅ **X-Content-Type-Options**: nosniff (prevents MIME sniffing)
- ✅ **X-XSS-Protection**: 1; mode=block (XSS protection)
- ✅ **Strict-Transport-Security**: HSTS enabled
- ✅ **Referrer-Policy**: strict-origin-when-cross-origin
- ✅ **Permissions-Policy**: camera, microphone, geolocation disabled
- ✅ **Content-Security-Policy**: Configured via Next.js

### 4. Rate Limiting
- ✅ **Login endpoint**: 10 requests per minute per IP
- ✅ **Contact form**: 10 requests per minute per IP
- ✅ **Newsletter subscription**: 10 requests per minute per IP

### 5. CORS Configuration
- ✅ **Whitelist-based CORS** (only allowed origins)
- ✅ **Credentials support** for authenticated requests
- ✅ **Preflight handling** for OPTIONS requests

### 6. Firebase Security
- ✅ **Firestore security rules** with role-based access
- ✅ **Input validation in Firestore rules**
- ✅ **Email validation regex** in rules
- ✅ **Admin-only access** to sensitive collections
- ✅ **Published content filtering** for public access
- ✅ **Firebase Storage authentication** required for uploads

### 7. File Upload Security
- ✅ **Authentication required** for uploads
- ✅ **Role-based upload permissions** (ADMIN, EDITOR only)
- ✅ **File type whitelist** (images and videos only)
- ✅ **File size limit** (50MB maximum)
- ✅ **Filename sanitization**
- ✅ **Unique filename generation**

### 8. Image Domain Restrictions
- ✅ **Whitelist for image domains**:
  - storage.googleapis.com
  - firebasestorage.googleapis.com

### 9. Dependency Security
- ✅ **Next.js updated** to latest version (fixes critical vulnerabilities)
- ✅ **CKEditor updated** to latest version (fixes XSS vulnerability)
- ✅ **Regular dependency audits** recommended

### 10. Error Handling
- ✅ **Generic error messages** (no sensitive data exposed)
- ✅ **Removed debug logging** from production auth routes
- ✅ **Error logging** without exposing stack traces to clients

## Environment Variables

### Required for Production

```bash
# JWT Secret - MUST be at least 32 characters
JWT_SECRET="<generate-a-strong-random-secret-at-least-32-characters>"

# Admin Credentials
ADMIN_EMAIL="admin@securethefuture.org"
ADMIN_PASSWORD="<strong-password>"

# Database
DATABASE_URL="<your-database-url>"

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="<your-api-key>"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="<your-auth-domain>"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="<your-project-id>"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="<your-storage-bucket>"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="<your-sender-id>"
NEXT_PUBLIC_FIREBASE_APP_ID="<your-app-id>"

# Firebase Admin (Server-side)
FIREBASE_PROJECT_ID="<your-project-id>"
FIREBASE_CLIENT_EMAIL="<your-service-account-email>"
FIREBASE_PRIVATE_KEY="<your-private-key>"

# App URL
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

### Generating Secure Secrets

```bash
# Generate a secure JWT secret (Node.js)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Or using OpenSSL
openssl rand -base64 64
```

## Security Best Practices

### For Developers

1. **Never commit `.env` files** to version control
2. **Use environment variables** for all sensitive data
3. **Validate all user input** on the server-side
4. **Use prepared statements** (already implemented via Prisma)
5. **Keep dependencies up to date**:
   ```bash
   npm audit
   npm update
   ```
6. **Review security logs** regularly
7. **Use HTTPS** in production (enforced by HSTS)

### For Deployment

1. **Set strong JWT secret** (minimum 64 characters recommended)
2. **Use strong admin password** (minimum 12 characters, mixed case, numbers, symbols)
3. **Enable Firebase Security Rules** deployment
4. **Configure firewall rules** for database access
5. **Use environment variables** management (Vercel, Railway, etc.)
6. **Enable application monitoring** and error tracking
7. **Regular security audits** and penetration testing
8. **Backup strategy** for data protection

### For Production Environment

1. **SSL/TLS Certificate**: Ensure valid certificate
2. **Database encryption**: Enable at-rest encryption
3. **Regular backups**: Automated daily backups
4. **Monitoring**: Set up security monitoring and alerts
5. **DDoS protection**: Use Cloudflare or similar
6. **WAF (Web Application Firewall)**: Recommended for high-traffic sites

## Reporting Security Issues

If you discover a security vulnerability, please email:
**security@securethefuture.org**

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

**Do not** create public GitHub issues for security vulnerabilities.

## Security Update Policy

- **Critical vulnerabilities**: Patched within 24 hours
- **High severity**: Patched within 7 days
- **Medium severity**: Patched within 30 days
- **Low severity**: Addressed in next release cycle

## Compliance

This application implements security measures aligned with:
- OWASP Top 10 security risks
- CWE/SANS Top 25 Most Dangerous Software Errors
- GDPR requirements for data protection
- PCI DSS for payment processing (if applicable)

## Security Checklist for Production

Before deploying to production, ensure:

- [ ] Strong JWT_SECRET set (64+ characters)
- [ ] Strong admin password set
- [ ] All environment variables configured
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Firestore security rules deployed
- [ ] Firebase Storage rules configured
- [ ] CORS properly configured
- [ ] Error logging configured
- [ ] Monitoring and alerts set up
- [ ] Database backups enabled
- [ ] All dependencies updated
- [ ] npm audit shows no vulnerabilities
- [ ] Security testing completed

## License

Security policy and implementation for Secure the Future project.
Last updated: November 7, 2025
