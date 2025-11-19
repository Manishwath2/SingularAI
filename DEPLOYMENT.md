# Deployment Guide

## Prerequisites

Before deploying SingularAI, ensure you have:

- Node.js 18+ installed
- PostgreSQL database (local or cloud-hosted)
- Git installed
- Account on deployment platform (Vercel, AWS, DigitalOcean, etc.)

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Manishwath2/SingularAI.git
cd SingularAI
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
DATABASE_URL="postgresql://username:password@host:5432/database_name?schema=public"
NEXTAUTH_SECRET="generate-a-secure-random-string-here"
NEXTAUTH_URL="http://localhost:3000"
NODE_ENV="development"
```

To generate a secure secret:
```bash
openssl rand -base64 32
```

### 4. Setup Database

Initialize Prisma and create database tables:

```bash
npx prisma generate
npx prisma db push
```

### 5. Create Admin User

After setting up the database, create your first admin user:

1. Register a user through the app at `http://localhost:3000/auth/register`
2. Connect to your PostgreSQL database
3. Run the following SQL command:

```sql
UPDATE users SET "isAdmin" = true WHERE email = 'your-admin-email@example.com';
```

### 6. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

## Production Deployment

### Option 1: Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

1. **Push your code to GitHub** (already done)

2. **Import project to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the SingularAI repository

3. **Configure environment variables in Vercel:**
   - Go to Project Settings → Environment Variables
   - Add all variables from your `.env` file:
     - `DATABASE_URL`
     - `NEXTAUTH_SECRET`
     - `NEXTAUTH_URL` (use your production URL)
     - `NODE_ENV=production`

4. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy your app

5. **Setup database:**
   After deployment, you need to push the schema to your production database:
   ```bash
   npx prisma db push
   ```

### Option 2: AWS (EC2 + RDS)

1. **Setup RDS PostgreSQL:**
   - Create PostgreSQL instance in AWS RDS
   - Note the endpoint, username, and password
   - Configure security groups to allow connections

2. **Setup EC2 Instance:**
   - Launch Ubuntu 22.04 LTS instance
   - Configure security group (allow ports 80, 443, 22)

3. **Connect to EC2 and setup:**

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Clone repository
git clone https://github.com/Manishwath2/SingularAI.git
cd SingularAI

# Install dependencies
npm install

# Setup environment
nano .env
# Add your production environment variables

# Generate Prisma client
npx prisma generate

# Build application
npm run build

# Push database schema
npx prisma db push

# Start with PM2
pm2 start npm --name "singularai" -- start
pm2 save
pm2 startup
```

4. **Setup Nginx as reverse proxy:**

```bash
sudo apt install nginx

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/singularai
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

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

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/singularai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

5. **Setup SSL with Let's Encrypt:**

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### Option 3: DigitalOcean App Platform

1. **Create PostgreSQL Database:**
   - In DigitalOcean, go to Databases
   - Create a PostgreSQL cluster
   - Note the connection details

2. **Deploy Application:**
   - Go to Apps → Create App
   - Connect your GitHub repository
   - Select the SingularAI repository
   - Choose branch: main or your production branch

3. **Configure:**
   - Set build command: `npm run build`
   - Set run command: `npm start`
   - Add environment variables

4. **Deploy:**
   - Click "Deploy"
   - After deployment, run database migrations

### Option 4: Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: singularai
      POSTGRES_PASSWORD: your_password
      POSTGRES_DB: singularai
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://singularai:your_password@postgres:5432/singularai?schema=public
      NEXTAUTH_SECRET: your_secret_here
      NEXTAUTH_URL: http://localhost:3000
      NODE_ENV: production
    depends_on:
      - postgres

volumes:
  postgres_data:
```

Deploy:

```bash
docker-compose up -d
```

## Database Management

### Migrations

To create a migration after schema changes:

```bash
npx prisma migrate dev --name description_of_changes
```

To apply migrations in production:

```bash
npx prisma migrate deploy
```

### Backup Database

For PostgreSQL:

```bash
pg_dump -U username -h host database_name > backup.sql
```

To restore:

```bash
psql -U username -h host database_name < backup.sql
```

## Monitoring and Maintenance

### Logs

- **Vercel:** Check deployment logs in Vercel dashboard
- **EC2 with PM2:** `pm2 logs singularai`
- **Docker:** `docker-compose logs -f app`

### Health Checks

Monitor these endpoints:
- `/` - Main page
- `/api/users` - API health (requires auth)

### Performance Monitoring

Consider adding:
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for usage tracking

## Security Checklist

Before going to production:

- [ ] Change `NEXTAUTH_SECRET` to a strong random value
- [ ] Use strong database passwords
- [ ] Enable SSL/HTTPS
- [ ] Set up firewall rules
- [ ] Enable database backups
- [ ] Set up monitoring and alerts
- [ ] Review and update dependencies regularly
- [ ] Implement rate limiting (consider adding rate-limit middleware)
- [ ] Set up CORS properly if needed
- [ ] Review and test all authentication flows
- [ ] Ensure all API routes have proper authentication

## Scaling Considerations

As your app grows:

1. **Database:**
   - Enable connection pooling
   - Add read replicas for scaling reads
   - Consider upgrading to larger database instance

2. **Application:**
   - Use Vercel's automatic scaling
   - Or scale EC2 instances horizontally with load balancer
   - Implement caching (Redis)

3. **File Storage:**
   - Use AWS S3 or similar for user uploads
   - Implement CDN for static assets

## Troubleshooting

### Common Issues

**Database connection errors:**
- Check DATABASE_URL format
- Verify database is accessible from your deployment
- Check security groups/firewall rules

**Build failures:**
- Ensure all environment variables are set
- Check Node.js version compatibility
- Verify all dependencies are installed

**Authentication issues:**
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Ensure cookies are enabled

**Prisma errors:**
- Run `npx prisma generate` after schema changes
- Ensure database schema is up to date with `npx prisma db push`

## Support

For issues or questions:
- Check the GitHub repository issues
- Review the README.md
- Consult Next.js documentation: https://nextjs.org/docs
- Consult Prisma documentation: https://www.prisma.io/docs
