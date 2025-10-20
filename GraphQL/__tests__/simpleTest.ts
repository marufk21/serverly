// Simple test to verify GraphQL API using fetch
async function testGraphQL() {
  try {
    console.log("Testing GraphQL API...");

    const response = await fetch("http://localhost:3001/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
      }),
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", [...response.headers.entries()]);

    const text = await response.text();
    console.log("Response text:", text);

    if (text) {
      const result = JSON.parse(text);
      if (response.ok) {
        console.log("GraphQL API is working!");
        console.log("Notes:", result.data.notes);
      } else {
        console.error("GraphQL API error:", result);
      }
    } else {
      console.log("Empty response");
    }
  } catch (error) {
    console.error("Error testing GraphQL API:", error);
  }
}

// Run the test
testGraphQL();
