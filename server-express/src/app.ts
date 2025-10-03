import express, { Request, Response } from "express";

const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript 🚀");
});

app.listen(PORT, () => {
  console.log(`server-express running at http://localhost:${PORT}`);
});
