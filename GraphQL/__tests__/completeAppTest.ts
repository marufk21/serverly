// Test complete application functionality
async function testCompleteApp() {
  try {
    console.log("Testing complete application...");

    // Test GraphQL endpoint with a real query
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

    console.log("GraphQL Response status:", response.status);

    if (response.ok) {
      const result = await response.json();
      console.log("GraphQL Query successful!");
      console.log("Notes count:", result.data.notes.length);
      console.log("First note:", result.data.notes[0]);
    } else {
      console.error("GraphQL Query failed:", response.status);
      const text = await response.text();
      console.error("Error details:", text);
    }

    // Test frontend
    const frontendResponse = await fetch("http://localhost:3001");
    console.log("Frontend Response status:", frontendResponse.status);

    if (frontendResponse.ok) {
      console.log("Frontend is accessible!");
    } else {
      console.error("Frontend access failed:", frontendResponse.status);
    }
  } catch (error) {
    console.error("Error testing complete application:", error);
  }
}

testCompleteApp();
