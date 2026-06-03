"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const supabase_1 = require("./database/supabase");
const PORT = process.env.APP_PORT || 1915;
app_1.default.listen(PORT, () => {
    console.log(`-> Server running on port http://localhost:${PORT}`);
    // Untuk ngetes koneksi
    (0, supabase_1.testSupabaseConnection)();
});
