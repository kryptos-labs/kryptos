// src/app.ts
import express from "express";
import whalesRoutes from "./requests/routes/whaleRoutes";

const app = express();
const port = process.env.PORT || 3000;

app.use("/whale", whalesRoutes);

app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
