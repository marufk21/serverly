export async function GET() {
  return new Response("Test API route is working!", {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

export async function POST() {
  return new Response("Test POST API route is working!", {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
