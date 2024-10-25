import * as customerRoutes from "./routes/customer_routes";
import * as receiverRoutes from "./routes/receiver_routes";
import * as serviceInfo from "./routes/service_info";
import express from "express";

const PORT: number = 8080;

const app = express();
serviceInfo.configure(app, "receiver");
receiverRoutes.configure(app);
customerRoutes.configure(app);

app.listen(PORT, () => {
  console.log(`Service listening at http://localhost:${PORT}`);
});
