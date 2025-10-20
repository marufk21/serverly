// Test our frontend by making a request to the home page
async function testFrontend() {
  try {
    console.log("Testing frontend...");

    const response = await fetch("http://localhost:3001");

    console.log("Response status:", response.status);
    console.log("Response headers:", [...response.headers.entries()]);

    const text = await response.text();
    console.log("Response text length:", text.length);

    if (response.ok) {
      console.log("Frontend is working!");
    } else {
      console.error("Frontend error:", response.status);
    }
  } catch (error) {
    console.error("Error testing frontend:", error);
  }
}

// Run the test
testFrontend();
