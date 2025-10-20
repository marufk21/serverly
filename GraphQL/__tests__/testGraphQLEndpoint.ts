// Test GraphQL endpoint directly
async function testGraphQLEndpoint() {
  try {
    console.log("Testing GraphQL endpoint...");

    // Test with a simple introspection query
    const response = await fetch("http://localhost:3001/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            __schema {
              types {
                name
              }
            }
          }
        `,
      }),
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", [...response.headers.entries()]);

    const text = await response.text();
    console.log("Response text:", text.substring(0, 200) + "..."); // First 200 chars

    if (response.ok) {
      console.log("GraphQL endpoint is working!");
    } else {
      console.error("GraphQL endpoint error:", response.status);
    }
  } catch (error) {
    console.error("Error testing GraphQL endpoint:", error);
  }
}

testGraphQLEndpoint();
