import * as serviceInfo from "./routes/service_info";
import * as senderRoutes from "./routes/sender_routes";
import express from "express";

const PORT: number = 8080;

const app = express();
serviceInfo.configure(app, "sender");
senderRoutes.configure(app);

app.listen(PORT, () => {
  console.log(`Service listening at http://localhost:${PORT}`);
});
