// Test our GraphQL schema and resolvers with a standalone server
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "../graphql/schema.ts";
import { resolvers } from "../graphql/resolvers.ts";

async function testStandaloneServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  try {
    await server.start();
    console.log("Apollo Server started successfully!");

    // Test a simple query
    const result = await server.executeOperation({
      query: `
        query GetNotes {
          notes {
            id
            title
            content
            createdAt
            updatedAt
          }
        }
      `,
    });

    console.log("Query result:", result.body);
  } catch (error) {
    console.error("Error starting Apollo Server:", error);
  }
}

testStandaloneServer();
