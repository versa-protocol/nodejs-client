import express from "express";

const PORT: number = 8080;

const app = express();

app.listen(PORT, () => {
  console.log(`Service listening at http://localhost:${PORT}`);
});
