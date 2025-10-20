// Debug GraphQL route
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "../graphql/schema.ts";
import { resolvers } from "../graphql/resolvers.ts";

console.log("Creating Apollo Server...");
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

console.log("Creating handler...");
const handler = startServerAndCreateNextHandler(server);

console.log("Handler type:", typeof handler);
console.log("Handler keys:", Object.keys(handler || {}));

export default handler;
