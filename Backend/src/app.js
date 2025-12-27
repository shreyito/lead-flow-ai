import express from "express";
import cors from "cors";
import leadRoutes from "./routes/lead.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

app.use(cors());
app.use(express.json());


app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use("/api/leads", leadRoutes);
app.use("/api/admin", adminRoutes);


export default app;
