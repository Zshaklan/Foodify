// create server
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

import userRoutes from "./routes/userAuth.routes.js";
import mealRoutes from "./routes/meals.routes.js";
import orderRoutes from "./routes/order.routes.js";
import adminRoutes from "./routes/admin.routes.js";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Home Route</h1>");
});

app.use("/api/auth", userRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/admin", adminRoutes);

export default app;
