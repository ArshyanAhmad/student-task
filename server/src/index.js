import express from "express";
import cors from "cors";
import "dotenv/config";

import userRoutes from "./routes/user.route.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);

export { app };
