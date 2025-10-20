// Test our complete GraphQL setup
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "../graphql/schema.ts";
import { resolvers } from "../graphql/resolvers.ts";

async function testCompleteSetup() {
  try {
    console.log("Testing complete GraphQL setup...");

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

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

    console.log("Query result:", JSON.stringify(result, null, 2));

    // Test a mutation
    const mutationResult = await server.executeOperation({
      query: `
        mutation CreateNote($title: String!, $content: String!) {
          createNote(title: $title, content: $content) {
            id
            title
            content
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        title: "Test Note",
        content: "This is a test note",
      },
    });

    console.log("Mutation result:", JSON.stringify(mutationResult, null, 2));
  } catch (error) {
    console.error("Error testing complete GraphQL setup:", error);
  }
}

testCompleteSetup();
