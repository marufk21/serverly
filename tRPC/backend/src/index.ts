import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from './router.js'
import { createContext } from './context.js'
import 'dotenv/config'

const app = new Hono()

// Enable CORS for frontend
app.use('/*', cors({
  origin: 'http://localhost:5173',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

// Health check endpoint
app.get('/health', (c) => {
  return c.json({ status: 'ok' })
})

// tRPC endpoint
app.all('/trpc/*', async (c) => {
  const res = await fetchRequestHandler({
    endpoint: '/trpc',
    req: c.req.raw,
    router: appRouter,
    createContext,
  })
  return res
})

const port = 3000

serve({
  fetch: app.fetch,
  port
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
