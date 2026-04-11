# Vercel Deployment

This repo is now set up for Vercel in two supported ways:

1. Deploy the whole repo as one Vercel project from the repository root.
2. Deploy `Frontend` and `Backend` as two separate Vercel projects.

## Recommended setup

Use two Vercel projects:

- Frontend project root: `Frontend`
- Backend project root: `Backend`

This is easier to manage and makes environment variables clearer.

## Frontend project

- Framework preset: `Vite`
- Root directory: `Frontend`
- Build command: `npm run build`
- Output directory: `dist`

Required env vars usually include:

- `VITE_API_BASE_URL=https://<your-backend-domain>/api`
- `VITE_SOCKET_URL=<non-vercel realtime server if you use socket.io>`
- Any `VITE_FIREBASE_*` keys you already use
- `VITE_GOOGLE_MAPS_API_KEY` if maps are enabled

## Backend project

- Framework preset: `Other`
- Root directory: `Backend`
- No custom build command is required

Required backend env vars:

- `NODE_ENV=production`
- `MONGO_URI` or `MONGODB_URI`
- `JWT_ACCESS_SECRET` or `JWT_SECRET`
- `JWT_REFRESH_SECRET`

Optional backend env vars:

- `REDIS_ENABLED=true|false`
- `REDIS_URL`
- `BULLMQ_ENABLED=true|false`
- Cloudinary, Firebase, Razorpay, SMTP variables used by your app

## Important realtime note

Your backend currently uses `socket.io`, intervals, and queue workers in the traditional server process.
Vercel serverless functions are fine for HTTP APIs, but they are not a good home for long-lived Socket.IO servers or background workers.

That means:

- REST API routes can run on Vercel.
- Queue workers should run elsewhere.
- Socket.IO should run on a persistent host elsewhere if you need realtime features in production.

If you keep the frontend on Vercel, point:

- `VITE_API_BASE_URL` to the Vercel backend API URL
- `VITE_SOCKET_URL` to your separate realtime server URL

## Files added

- Root `vercel.json` for monorepo deployment
- `Frontend/vercel.json` for SPA routing
- `Backend/vercel.json` for API rewrites
- `Backend/api/index.js`
- `Backend/api/[...path].js`
- `Backend/api/health.js`
- `Backend/api/ready.js`
- `Backend/src/vercel/bootstrap.js`
