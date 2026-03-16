// api/index.ts
import "tsconfig-paths/register";
import app from "../src/app";
import serverless from "serverless-http";

console.log("🚀 Initializing Vercel serverless function...");

export default serverless(app);

console.log("✅ Serverless function ready!");
