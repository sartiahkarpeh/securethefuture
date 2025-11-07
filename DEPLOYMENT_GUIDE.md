# Deployment Guide - Secure the Future

## 🚀 Deployment Options

This Next.js application can be deployed to several platforms. Recommended options:

---

## Option 1: Vercel (Recommended) ⭐

### Why Vercel?

- Created by Next.js team
- Zero-config deployment
- Automatic HTTPS
- Global CDN
- Preview deployments
- **FREE tier available**

### Steps

1. **Push to GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/secure-the-future.git
git push -u origin main
```

2. **Deploy to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your repository
   - Configure:
     - Framework Preset: Next.js
     - Build Command: `npm run build`
     - Output Directory: (leave default)
   - Add environment variables (see below)
   - Click "Deploy"

3. **Your site will be live at**: `https://your-project.vercel.app`

### Environment Variables

Add these in Vercel dashboard:

```
JWT_SECRET=your-production-secret-here
ADMIN_EMAIL=admin@securethefuture.org
ADMIN_PASSWORD=secure-password-here
DATABASE_URL=your-database-connection-string
NEXT_PUBLIC_GA_ID=your-google-analytics-id (optional)
```

---

## Option 2: Netlify

### Steps

1. **Build configuration**
   Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

2. **Deploy**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select repository
   - Deploy settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Add environment variables
   - Click "Deploy"

---

## Option 3: Self-Hosted (VPS/Cloud Server)

### Prerequisites

- Ubuntu 22.04 or similar
- Node.js 18+
- Nginx (for reverse proxy)
- PM2 (for process management)
- Domain name pointed to your server

### Steps

1. **Install dependencies**

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Nginx
sudo apt install nginx -y

# Install PM2
sudo npm install -g pm2
```

2. **Clone and build**

```bash
cd /var/www
git clone https://github.com/yourusername/secure-the-future.git
cd secure-the-future
npm install
npm run build
```

3. **Set up environment**

```bash
cp .env.local.example .env.local
nano .env.local  # Edit with production values
```

4. **Start with PM2**

```bash
pm2 start npm --name "secure-the-future" -- start
pm2 save
pm2 startup  # Follow instructions to enable auto-start
```

5. **Configure Nginx**

```bash
sudo nano /etc/nginx/sites-available/securethefuture
```

Add configuration:

```nginx
server {
    listen 80;
    server_name securethefuture.org www.securethefuture.org;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/securethefuture /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

6. **Set up SSL (Let's Encrypt)**

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d securethefuture.org -d www.securethefuture.org
```

---

## Option 4: Docker Deployment

### Create Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: "3.8"

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - JWT_SECRET=${JWT_SECRET}
      - DATABASE_URL=${DATABASE_URL}
    restart: unless-stopped
```

### Build and run

```bash
docker build -t secure-the-future .
docker run -p 3000:3000 secure-the-future

# Or with docker-compose
docker-compose up -d
```

---

## Pre-Deployment Checklist

### Code Quality

- [ ] All TypeScript errors fixed (`npx tsc --noEmit`)
- [ ] No ESLint warnings (`npm run lint`)
- [ ] Build succeeds locally (`npm run build`)
- [ ] Production build tested (`npm start`)

### Content

- [ ] Replace placeholder images with real images
- [ ] Update contact information
- [ ] Verify all links work
- [ ] Check crisis helpline numbers
- [ ] Update copyright year

### Security

- [ ] Change default admin credentials
- [ ] Set strong JWT_SECRET
- [ ] Enable HTTPS
- [ ] Add rate limiting (future)
- [ ] Configure CORS (future)
- [ ] Set up database backups (future)

### SEO

- [ ] Add sitemap.xml (future)
- [ ] Add robots.txt (future)
- [ ] Verify Open Graph images
- [ ] Check meta descriptions
- [ ] Set up Google Analytics (optional)
- [ ] Submit to Google Search Console

### Performance

- [ ] Optimize images (convert to WebP, compress)
- [ ] Enable caching headers
- [ ] Test with Lighthouse
- [ ] Test on slow 3G
- [ ] Verify Core Web Vitals

### Accessibility

- [ ] Test with screen reader
- [ ] Check keyboard navigation
- [ ] Verify color contrast ratios
- [ ] Test with WAVE tool
- [ ] Add skip links (already done)

---

## Post-Deployment

### Monitoring

- Set up uptime monitoring (UptimeRobot, Pingdom)
- Configure error tracking (Sentry)
- Monitor performance (Vercel Analytics, Google Analytics)
- Set up log aggregation

### Backups

- Database backups (daily)
- Media file backups
- Code repository backups (GitHub)

### Maintenance

- Update dependencies monthly
- Security patches immediately
- Review analytics weekly
- Content updates regularly

---

## Environment Variables Reference

### Required

```bash
# Authentication
JWT_SECRET=your-super-secret-jwt-key-min-32-chars

# Admin Account
ADMIN_EMAIL=admin@securethefuture.org
ADMIN_PASSWORD=SecurePassword123!

# Database (when implemented)
DATABASE_URL=postgresql://user:pass@host:5432/dbname
```

### Optional

```bash
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# External Services
SENDGRID_API_KEY=your-sendgrid-key
CLOUDINARY_URL=your-cloudinary-url
STRIPE_PUBLIC_KEY=your-stripe-key
STRIPE_SECRET_KEY=your-stripe-secret
```

---

## Troubleshooting

### Build fails

```bash
# Clear cache and rebuild
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Port 3000 already in use

```bash
# Use different port
PORT=3001 npm start
```

### Environment variables not working

- Check variable names match exactly
- Restart server after adding variables
- On Vercel: Redeploy after adding variables
- Public variables need `NEXT_PUBLIC_` prefix

### Images not loading

- Check image paths are correct
- Ensure images are in `public/` folder
- Verify Next.js Image domains in `next.config.mjs`

---

## Custom Domain Setup

### On Vercel

1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed:
   - A Record: `76.76.21.21`
   - Or CNAME: `cname.vercel-dns.com`
4. Wait for DNS propagation (up to 48 hours)

### On Netlify

1. Go to Site Settings → Domain management
2. Add custom domain
3. Update DNS:
   - A Record: Netlify's IP
   - Or CNAME: `your-site.netlify.app`

---

## Performance Optimization

### Image Optimization

```bash
# Install image optimization tools
npm install sharp

# Images will auto-optimize with Next.js Image component
```

### Caching Strategy

```js
// next.config.mjs
const nextConfig = {
  images: {
    formats: ["image/webp"],
  },
  headers: async () => [
    {
      source: "/:all*(svg|jpg|png)",
      locale: false,
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],
};
```

---

## Cost Estimates

### Vercel (Recommended for MVP)

- **Hobby Plan**: $0/month

  - Unlimited personal projects
  - 100 GB bandwidth
  - Automatic HTTPS
  - Perfect for getting started

- **Pro Plan**: $20/month
  - Unlimited commercial projects
  - 1 TB bandwidth
  - Team features
  - Priority support

### Self-Hosted VPS

- **DigitalOcean/Linode**: $5-10/month
  - 1 GB RAM
  - 25 GB SSD
  - 1 TB transfer
  - Full control

### Domain Name

- **Namecheap/GoDaddy**: $10-15/year
  - .org domain
  - SSL included

---

## Support & Resources

### Official Documentation

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)

### Community

- [Next.js Discord](https://nextjs.org/discord)
- [Vercel Community](https://github.com/vercel/next.js/discussions)

---

## 🎉 Congratulations!

Your Secure the Future website is ready for the world!

Remember: This platform will help save lives, support recovery, and bring hope to millions affected by addiction. Deploy with confidence! 💪

---

**Questions?** Check PROJECT_SUMMARY.md or DEVELOPMENT_GUIDE.md
