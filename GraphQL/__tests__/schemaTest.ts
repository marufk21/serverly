// Test our GraphQL schema and resolvers
import { typeDefs } from "../graphql/schema.ts";
import { resolvers } from "../graphql/resolvers.ts";

console.log("Schema:", typeDefs);
console.log("Resolvers:", Object.keys(resolvers));
