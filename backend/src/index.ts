import app from "./app";
import { testSupabaseConnection } from "./database/supabase";
import { setupSwagger } from "./utils/swagger";
const PORT = process.env.APP_PORT || 1915;

setupSwagger(app, PORT);

app.listen(PORT, () => {
  console.log(`-> Server running on port http://localhost:${PORT}`);
  // Untuk ngetes koneksi
  testSupabaseConnection();
});
