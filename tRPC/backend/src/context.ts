// Import the generated Prisma client.
// The Prisma generator writes an `index.js` entry that exports the client. Importing from
// `./generated/prisma/index.js` ensures the module resolver finds the file at runtime.
import { PrismaClient } from "./generated/prisma/index.js";

// Create a single instance of PrismaClient
const prisma = new PrismaClient();

// Context type definition
export interface Context {
  prisma: PrismaClient;
}

// Context creation function for tRPC
// The fetch adapter passes an object containing the request. We only need `prisma` in
// the tRPC context, so accept a minimal shaped param to avoid coupling to adapter types.
export function createContext({
  req,
}: { req: Request } | Record<string, unknown>): Context {
  return {
    prisma,
  };
}
