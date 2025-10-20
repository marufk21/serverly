// Test our GraphQL endpoint
async function testGraphQLEndpoint() {
  try {
    console.log("Testing GraphQL endpoint...");

    const response = await fetch("http://localhost:3004/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            __typename
          }
        `,
      }),
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", [...response.headers.entries()]);

    const text = await response.text();
    console.log("Response text:", text);

    if (response.ok) {
      console.log("GraphQL endpoint is accessible!");
    } else {
      console.error("GraphQL endpoint error:", response.status);
    }
  } catch (error) {
    console.error("Error testing GraphQL endpoint:", error);
  }
}

// Run the test
testGraphQLEndpoint();
