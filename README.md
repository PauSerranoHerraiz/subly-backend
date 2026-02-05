# Subly Backend

RESTful API for subscription management built with Express, TypeScript, and Prisma.

## 🚀 Features

- **JWT Authentication**: Secure user signup/login
- **Role-Based Access**: User and company isolation
- **Customer Management**: CRUD operations for customers
- **Subscription Tracking**: Manage subscriptions with status tracking
- **Plan Management**: Create and manage subscription plans
- **Dashboard Analytics**: Aggregate statistics and metrics
- **PostgreSQL Database**: Relational data with Prisma ORM

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **Prisma** - ORM for PostgreSQL
- **PostgreSQL** - Database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
src/
├── config/           # Middleware configuration (CORS, etc.)
├── error-handling/   # Global error handlers
├── lib/              # Prisma client setup
├── middleware/       # JWT authentication middleware
├── routes/           # API route handlers
└── types/            # TypeScript type definitions

prisma/
├── schema.prisma     # Database schema
└── migrations/       # Database migrations
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd subly-backend
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables

Create a `.env` file in the root:

```env
PORT=5005
DATABASE_URL=postgresql://user:password@localhost:5432/subly
TOKEN_SECRET=your-super-secret-jwt-key
ORIGIN=http://localhost:5173
```

4. Set up database

Run Prisma migrations:
```bash
npx prisma migrate dev
```

Generate Prisma client:
```bash
npx prisma generate
```

5. Start development server
```bash
npm run dev
```

The API will be available at `http://localhost:5005`

## 📊 Database Schema

### Models

- **User**: Authentication and company association
- **Company**: Multi-tenant isolation
- **Customer**: Customer records per company
- **Plan**: Subscription plans
- **Subscription**: Active subscriptions linking customers and plans

### Enums

- `SubscriptionStatus`: ACTIVE, CANCELLED, EXPIRED
- `SubscriptionEventType`: CREATED, RENEWED, CANCELLED, EXPIRED
- `Role`: USER, ADMIN

## 🔌 API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login and get JWT token
- `GET /auth/verify` - Verify JWT token

### Customers
- `GET /api/customers` - List all customers
- `POST /api/customers` - Create customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Plans
- `GET /api/plans` - List all plans
- `POST /api/plans` - Create plan
- `PUT /api/plans/:id` - Update plan
- `DELETE /api/plans/:id` - Delete plan

### Subscriptions
- `GET /api/subscriptions` - List subscriptions (with filters)
- `POST /api/subscriptions` - Create subscription
- `PUT /api/subscriptions/:id` - Update subscription
- `DELETE /api/subscriptions/:id` - Delete subscription

### Dashboard
- `GET /api/dashboard/stats` - Get aggregate statistics

## 🔒 Authentication

Protected routes require a JWT token in the `Authorization` header:

```
Authorization: Bearer <token>
```

The JWT middleware automatically:
- Validates tokens
- Extracts user and company info
- Attaches to `req.payload`

## 🏗️ Build & Deploy

### Build for production
```bash
npm run build
```

### Start production server
```bash
npm start
```

### Deploy to Railway

1. Connect your repository to Railway
2. Set environment variables:
   - `DATABASE_URL` - PostgreSQL connection string
   - `TOKEN_SECRET` - JWT secret key
   - `ORIGIN` - Frontend URL (without trailing slash)
3. Railway auto-detects `railway.json` configuration
4. Deploy

## 📝 Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production build
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma migrate dev` - Create and apply migrations

## 🗄️ Prisma Commands

- `npx prisma migrate dev` - Create migration in development
- `npx prisma migrate deploy` - Apply migrations in production
- `npx prisma generate` - Generate Prisma client
- `npx prisma studio` - Launch database GUI

## 🔧 Configuration

### CORS

CORS is configured in `src/config/index.ts`. The `ORIGIN` environment variable must match your frontend domain (without trailing slash).

### Database

PostgreSQL connection is managed via Prisma. Update `DATABASE_URL` in `.env` or use Railway's auto-injected variable.

## Frontend

https://github.com/PauSerranoHerraiz/subly-frontend

## 🤝 Contributing

Contributions are welcome! Please open an issue or PR.
