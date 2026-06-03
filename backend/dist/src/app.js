"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const login_router_1 = require("./modules/auth/login/login_router");
const router_1 = require("./modules/feature/predict/router");
const router_2 = require("./modules/feature/history/router");
const router_3 = require("./modules/feature/profile/router");
const router_4 = require("./modules/feature/todo/router");
const router_5 = require("./modules/feature/acne-solution/router");
const swagger_1 = require("./utils/swagger");
// Middleware
const auth_middleware_1 = require("./middleware/auth.middleware");
console.log("🚀 Initializing Express app...");
const app = (0, express_1.default)();
console.log("✅ Express app created");
// Error handling middleware - MUST be first
app.use((req, res, next) => {
    console.log(`📍 Incoming request: ${req.method} ${req.path}`);
    next();
});
// Middleware
try {
    console.log("🔄 Setting up middleware...");
    app.use((0, cors_1.default)({
        origin: true, // Allow all origins in dev, or specify your frontend URL
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"]
    }));
    app.use(express_1.default.json({ limit: "10mb" }));
    app.use(express_1.default.urlencoded({ extended: true }));
    console.log("✅ Middleware configured");
}
catch (error) {
    console.error("❌ Error setting up middleware:", error.message);
}
// Health Check
app.get("/", (req, res) => {
    console.log("✅ Health check endpoint hit");
    res.json({
        status: "ok",
        message: "API is running on Vercel! 🚀",
        timestamp: new Date().toISOString(),
    });
});
app.use("/api/auth", login_router_1.authRouter);
app.use("/api/feature", auth_middleware_1.authMiddleware, router_1.predictRouter);
app.use("/api/feature/profile", auth_middleware_1.authMiddleware, router_3.profileRouter);
app.use("/api/feature/history", auth_middleware_1.authMiddleware, router_2.historyRouter);
app.use("/api/feature/todo", auth_middleware_1.authMiddleware, router_4.todoRouter);
app.use("/api/feature/acne-solution", auth_middleware_1.authMiddleware, router_5.acneSolutionRouter);
// Setup Swagger UI
const SWAGGER_PORT = process.env.APP_PORT || 1915;
(0, swagger_1.setupSwagger)(app, SWAGGER_PORT);
console.log("✅ Express app initialization complete!");
exports.default = app;
