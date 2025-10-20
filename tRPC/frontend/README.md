# tRPC Notes App

A full-stack notes application built with tRPC, React, and PostgreSQL.

## Project Structure

```
tRPC/
├── backend/             # Node.js backend with tRPC and Prisma
│   ├── prisma/          # Database schema and migrations
│   └── src/             # Backend source code
│       ├── context.ts   # tRPC context with Prisma client
│       ├── router.ts    # tRPC router with CRUD operations
│       └── index.ts     # Server entry point with Hono
│
└── frontend/            # React frontend with tRPC client
    ├── src/
    │   ├── components/  # React components
    │   ├── hooks/       # Custom React hooks
    │   └── utils/       # Utility functions and tRPC client
    └── index.html       # HTML entry point
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- PostgreSQL database
- pnpm or npm

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   pnpm install
   ```

3. Set up your database:
   - Create a PostgreSQL database
   - Update the `.env` file with your database connection string

4. Run database migrations:
   ```
   pnpm prisma migrate dev --name init
   ```

5. Start the backend server:
   ```
   pnpm dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   pnpm install
   ```

3. Start the frontend development server:
   ```
   pnpm dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Features

- ✅ Type-safe API with tRPC
- ✅ CRUD operations for notes
- ✅ PostgreSQL database with Prisma ORM
- ✅ React frontend with React Query
- ✅ Modern UI with Tailwind CSS

## License

MIT