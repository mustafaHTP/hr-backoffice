# HR Backoffice

A Next.js application for HR management, using Prisma and PostgreSQL.

## Requirements

- Node.js 20+ installed
- PostgreSQL database available
- A package manager: `npm`, `pnpm`, or `yarn`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables from `.env.example` to `.env`:

```bash
cp .env.example .env
# or on Windows PowerShell:
# copy .env.example .env
```

3. Open `.env` and set values for:

- `DATABASE_URL` — PostgreSQL connection string
- `SESSION_SECRET` — a random secret for session/encryption

Example `DATABASE_URL` format:

```bash
postgresql://user:password@localhost:5432/database_name
```

4. Run database migrations and seed data:

```bash
npm run db:setup
```

## Run locally

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Build for production

```bash
npm run build
npm run start
```

## Prisma helpers

- `npm run db:migrate` — apply migrations and generate Prisma client
- `npm run db:seed` — seed the database
- `npm run db:delete` — reset the database

## Notes

- `.env.example` is provided as a template and is not loaded automatically.
- Make sure your `.env` file contains valid values before running the app.
