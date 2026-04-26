# Deployment Guide

## Production Checklist

### Pre-Deployment

- [ ] Update environment variables
- [ ] Run production build locally
- [ ] Test all critical features
- [ ] Check database migrations
- [ ] Review security settings
- [ ] Update documentation
- [ ] Backup database

### Frontend Deployment

#### 1. Environment Configuration

```bash
# frontend/.env.production
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
NEXT_PUBLIC_API_TIMEOUT=30000
NEXT_PUBLIC_APP_NAME=Winform Web App
NEXT_PUBLIC_ENABLE_DEBUG=false
```

#### 2. Build for Production

```bash
cd frontend
npm run build
npm start
```

#### 3. Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Environment Variables in Vercel:**
- Add all `NEXT_PUBLIC_*` variables in Vercel dashboard
- Settings → Environment Variables

#### 4. Deploy to Custom Server

```bash
# Build
npm run build

# Copy files to server
scp -r .next package.json package-lock.json user@server:/var/www/app/

# On server
cd /var/www/app
npm install --production
npm start
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

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

### Backend Deployment

#### 1. Environment Configuration

```bash
# backend/.env.production
PORT=3001
NODE_ENV=production

# Database
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=your_database
DB_USER=your_user
DB_PASSWORD=your_secure_password
DB_MAX_CONNECTIONS=20

# JWT
JWT_SECRET=your-very-secure-secret-key-change-this
JWT_EXPIRES_IN=24h

# CORS
CORS_ORIGIN=https://yourdomain.com

# Logging
LOG_LEVEL=warn
LOG_CONSOLE=true
LOG_FILE=true
```

#### 2. Database Setup

```bash
# Create production database
createdb production_db

# Run migrations (if available)
npm run migrate:prod

# Seed initial data (if needed)
npm run seed:prod
```

#### 3. Deploy to Server

```bash
# Copy files
scp -r src package.json package-lock.json .env.production user@server:/var/www/api/

# On server
cd /var/www/api
npm install --production
```

#### 4. Process Manager (PM2)

```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start src/server.js --name "winform-api"

# Save PM2 configuration
pm2 save

# Setup auto-restart on reboot
pm2 startup
```

**PM2 Configuration (ecosystem.config.js):**
```javascript
module.exports = {
  apps: [{
    name: 'winform-api',
    script: './src/server.js',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true
  }]
}
```

```bash
# Start with config
pm2 start ecosystem.config.js
```

#### 5. Nginx Configuration

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### SSL/HTTPS Setup

#### Using Let's Encrypt (Certbot)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com -d api.yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

### Database Backup

#### Automated Backup Script

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/postgres"
DB_NAME="production_db"

mkdir -p $BACKUP_DIR

pg_dump $DB_NAME | gzip > $BACKUP_DIR/backup_$DATE.sql.gz

# Keep only last 7 days
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +7 -delete

echo "Backup completed: backup_$DATE.sql.gz"
```

```bash
# Make executable
chmod +x backup.sh

# Add to crontab (daily at 2 AM)
0 2 * * * /path/to/backup.sh
```

### Monitoring

#### Health Check Endpoint

```bash
# Check backend health
curl https://api.yourdomain.com/health
```

#### PM2 Monitoring

```bash
# View logs
pm2 logs winform-api

# Monitor resources
pm2 monit

# View status
pm2 status
```

#### Setup Monitoring Service (Optional)

**Using Uptime Robot:**
1. Create account at uptimerobot.com
2. Add monitor for https://api.yourdomain.com/health
3. Configure alerts

### Security Checklist

- [ ] Use HTTPS everywhere
- [ ] Strong JWT secret
- [ ] Secure database credentials
- [ ] Enable CORS only for your domain
- [ ] Rate limiting enabled
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] Regular security updates
- [ ] Firewall configured
- [ ] Database backups automated

### Performance Optimization

#### Frontend
- Enable compression in Nginx
- Use CDN for static assets
- Implement caching headers
- Optimize images
- Enable HTTP/2

#### Backend
- Enable compression middleware
- Database connection pooling
- Query optimization
- Response caching
- Load balancing (if needed)

### Rollback Plan

#### Frontend Rollback

```bash
# Vercel
vercel rollback

# Custom server
cd /var/www/app
git checkout previous-version
npm run build
pm2 restart app
```

#### Backend Rollback

```bash
cd /var/www/api
git checkout previous-version
npm install
pm2 restart winform-api
```

#### Database Rollback

```bash
# Restore from backup
gunzip < /var/backups/postgres/backup_YYYYMMDD_HHMMSS.sql.gz | psql production_db
```

### Troubleshooting

#### Frontend Issues

**Build fails:**
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

**API calls failing:**
- Check CORS settings
- Verify API URL in environment
- Check SSL certificate

#### Backend Issues

**Server not starting:**
```bash
# Check logs
pm2 logs winform-api

# Check port
lsof -i :3001

# Restart
pm2 restart winform-api
```

**Database connection failed:**
- Verify credentials
- Check firewall rules
- Test connection: `psql -h host -U user -d database`

### Maintenance

#### Regular Tasks

**Daily:**
- Monitor error logs
- Check server resources
- Verify backups

**Weekly:**
- Review security logs
- Update dependencies
- Performance review

**Monthly:**
- Security audit
- Database optimization
- Backup restoration test

#### Update Dependencies

```bash
# Check for updates
npm outdated

# Update packages
npm update

# Test thoroughly before deploying
```

---

**Last Updated:** 2026-04-26  
**Version:** 1.0.0
