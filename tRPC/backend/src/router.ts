import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import type { Context } from './context.js'
import superjson from 'superjson'

// Initialize tRPC
const t = initTRPC.context<Context>().create({
  transformer: superjson,
})

// Base router and procedure helpers
export const router = t.router
export const publicProcedure = t.procedure

// Define the notes router
export const notesRouter = router({
  // Get all notes
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.note.findMany({
      orderBy: { updatedAt: 'desc' },
    })
  }),

  // Get a single note by ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.note.findUnique({
        where: { id: input.id },
      })
    }),

  // Create a new note
  create: publicProcedure
    .input(z.object({
      title: z.string().min(1).max(100),
      content: z.string(),
      userId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.note.create({
        data: {
          title: input.title,
          content: input.content,
          userId: input.userId,
        },
      })
    }),

  // Update an existing note
  update: publicProcedure
    .input(z.object({
      id: z.string(),
      title: z.string().min(1).max(100),
      content: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.note.update({
        where: { id: input.id },
        data: {
          title: input.title,
          content: input.content,
        },
      })
    }),

  // Delete a note
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.note.delete({
        where: { id: input.id },
      })
    }),
})

// Export the app router
export const appRouter = router({
  notes: notesRouter,
})

// Export type definition of API
export type AppRouter = typeof appRouter