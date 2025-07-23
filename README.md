# SecureSight - CCTV Monitoring Dashboard

A comprehensive CCTV monitoring software dashboard built with Next.js 15, featuring AI-powered threat detection and real-time incident management.

## Features

### Mandatory Features

- **Navbar**: Complete navigation with user profile dropdown
- **Incident Player**: Video player with camera controls and thumbnails
- **Incident List**: Real-time incident management with resolve functionality

### Optional Features

- **Incident Timeline**: 24-hour timeline with incident markers
- **Responsive Design**: Fully responsive across all devices
- **Real-time Updates**: Optimistic UI updates for better UX

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM
- **API**: Next.js API routes
- **Icons**: Lucide React

## Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (local or cloud)

### Option 1: Local Development with Docker (Recommended)

#### 1. Clone the repository

```bash
git clone https://github.com/vishnuu5/SecureSight-task-instinctive.studio.git
cd securesight-dashboard
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Start PostgreSQL with Docker

```bash
docker-compose up -d
```

This will start:

- PostgreSQL on port 5432
- Adminer (database admin) on port 8080

#### 4. Set up environment variables

```bash
cp .env.example .env
```

For Docker setup, use:

```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/securesight_db?schema=public"
```

#### 5. Set up the database

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npm run db:migrate

# Seed the database
npm run db:seed
```

#### 6. Run the development server

```bash
npm run dev
```

### Option 2: Cloud Database Setup

#### Recommended for deploy side

**Neon**

1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Update your `.env` file:

```bash
DATABASE_URL="postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/securesight_db?sslmode=require"
```

#### After setting up cloud database:

```bash

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations
npm run db:migrate

# Seed the database
npm run db:seed

# Run the development server

npm run dev
```

### Option 3: Local PostgreSQL Installation

If you have PostgreSQL installed locally:

1. Create a database:

```bash
CREATE DATABASE securesight_db;
```

2. Update your `.env` file:

```bash
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/securesight_db?schema=public"
```

3. Follow steps 5-6 from Option 1

## Database Management

### Useful Commands

```bash

# View database in browser
npm run db:studio

# Reset database (careful!)
npm run db:reset

# Create new migration
npx prisma migrate dev --name migration_name

# Deploy migrations to production
npx prisma migrate deploy
```

### Database Schema

#### Camera Model

- `id`: Unique identifier (CUID)
- `name`: Camera name (e.g., "Camera - 01")
- `location`: Physical location (e.g., "Shop Floor A")
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

#### Incident Model

- `id`: Unique identifier (CUID)
- `cameraId`: Reference to Camera
- `type`: Incident type (Unauthorised Access, Gun Threat, etc.)
- `tsStart`: Incident start timestamp
- `tsEnd`: Incident end timestamp
- `thumbnailUrl`: Incident thumbnail image URL
- `resolved`: Boolean status
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## API Endpoints

### GET /api/incidents

- Query parameter: `resolved` (boolean)
- Returns incidents sorted by newest first

### PATCH /api/incidents/[id]/resolve

- Toggles incident resolved status
- Returns updated incident

## Deployment

### Vercel Deployment with Neon

1. Push code to GitHub
2. Connect repository to Vercel
3. Set up Neon database (free tier)
4. Add environment variables in Vercel dashboard:

```bash
DATABASE_URL="your-neon-connection-string"
```

5. Deploy

### Environment Variables for Production

```bash
DATABASE_URL="your-production-postgresql-url"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://your-domain.vercel.app"
```

## Tech Decisions

### Why PostgreSQL?

- **Reliability**: Production-ready with ACID compliance
- **Scalability**: Handles large datasets efficiently
- **Features**: Advanced querying, indexing, and JSON support
- **Cloud Support**: Excellent support across all major platforms
- **Prisma Integration**: First-class support with migrations

### Why Next.js 15?

- **App Router**: Modern routing with server components
- **API Routes**: Built-in API functionality
- **TypeScript**: Full type safety
- **Performance**: Excellent optimization out of the box

### Why Prisma?

- **Type Safety**: Excellent TypeScript integration
- **Migrations**: Database schema versioning
- **Query Builder**: Intuitive and safe database queries
- **Multi-database**: Easy to switch between databases

### Why shadcn/ui?

- **Consistency**: Pre-built, accessible components
- **Customization**: Easy to modify and extend
- **Modern**: Built on Radix UI primitives

## Troubleshooting

### Common Issues

**Connection refused to PostgreSQL**

- Ensure PostgreSQL is running
- Check connection string format
- Verify credentials and database name

**Migration errors**

- Reset database: `npm run db:reset`
- Check for conflicting migrations
- Ensure database is accessible

**Seed script fails**

- Check database connection
- Verify Prisma client is generated
- Run migrations first

## License

This project is licensed under the MIT License.
