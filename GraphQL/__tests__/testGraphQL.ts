// Simple test to verify GraphQL API
// This is not a unit test but a simple verification script

import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:3000/api/graphql",
    fetch: (uri, options) => {
      return fetch(uri, {
        ...options,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
      });
    },
  }),
  cache: new InMemoryCache(),
});

// Test query
const GET_NOTES = gql`
  query GetNotes {
    notes {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;

// Test the GraphQL API
async function testGraphQL() {
  try {
    console.log("Testing GraphQL API...");

    const result: any = await client.query({
      query: GET_NOTES,
    });

    console.log("GraphQL API is working!");
    console.log("Notes:", result.data.notes);
  } catch (error) {
    console.error("Error testing GraphQL API:", error);
  }
}

// Run the test
testGraphQL();
