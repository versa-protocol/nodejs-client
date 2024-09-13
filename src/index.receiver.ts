import * as receiverRoutes from "./routes/receiver.routes";
import * as serviceInfo from "./routes/service_info";
import express from "express";

const PORT: number = 8080;

const app = express();
serviceInfo.configure(app, "receiver");
receiverRoutes.configure(app);

app.listen(PORT, () => {
  console.log(`Service listening at http://localhost:${PORT}`);
});
