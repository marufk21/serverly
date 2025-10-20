// Test simple API route
async function testAPIRoute() {
  try {
    console.log("Testing simple API route...");

    // Test GET request
    const getResponse = await fetch("http://localhost:3000/api/test", {
      method: "GET",
    });

    console.log("GET Response status:", getResponse.status);
    const getText = await getResponse.text();
    console.log("GET Response text:", getText);

    // Test POST request
    const postResponse = await fetch("http://localhost:3000/api/test", {
      method: "POST",
    });

    console.log("POST Response status:", postResponse.status);
    const postText = await postResponse.text();
    console.log("POST Response text:", postText);
  } catch (error) {
    console.error("Error testing API route:", error);
  }
}

testAPIRoute();
