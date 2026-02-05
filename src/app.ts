import "dotenv/config";
import express, { type Application } from "express";
import configMiddleware from "./config";
import indexRoutes from "./routes/index.routes";
import authRoutes from "./routes/auth.routes";
import customersRoutes from "./routes/customers.routes";
import plansRoutes from "./routes/plans.routes";
import subscriptionsRoutes from "./routes/subscriptions.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import isAuthenticated from "./middleware/jwt.middleware";
import errorHandling from "./error-handling";

const app: Application = express();

configMiddleware(app);

app.use("/api", indexRoutes);
app.use("/auth", authRoutes);

app.use("/customers", isAuthenticated, customersRoutes);
app.use("/plans", isAuthenticated, plansRoutes);
app.use("/subscriptions", isAuthenticated, subscriptionsRoutes);
app.use("/dashboard", isAuthenticated, dashboardRoutes);

console.log("✅ Routes registered:");
console.log("   - GET /dashboard");
console.log("   - POST /subscriptions");
console.log("   - GET /subscriptions");
console.log("   - PATCH /subscriptions/:id");
console.log("   - DELETE /subscriptions/:id");

errorHandling(app);

export default app;

