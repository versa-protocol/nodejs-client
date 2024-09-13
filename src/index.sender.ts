import * as serviceInfo from "./routes/serviceInfo";
import express from "express";

const PORT: number = 8080;

const app = express();
serviceInfo.configure(app);

app.listen(PORT, () => {
  console.log(`Service listening at http://localhost:${PORT}`);
});
