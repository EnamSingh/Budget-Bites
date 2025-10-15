import "dotenv/config";
import app from "./app";
import { connectDB } from "./db";

function mask(uri?: string) {
  if (!uri) return uri;
  return uri.replace(/(mongodb\+srv:\/\/[^:]+:)[^@]+/, "$1***");
}
const PORT = process.env.PORT || 4000;
const uri = process.env.MONGO_URI;
console.log("MONGO_URI at runtime =", mask(uri));

function looksReal(s?: string) {
  return !!s && /^mongodb(\+srv)?:\/\//.test(s) && !/[<>]/.test(s);
}

(async () => {
  if (looksReal(uri)) {
    try {
      await connectDB(uri!);
      console.log("✅ Mongo connected");
    } catch (e) {
      console.error("❌ Mongo connect failed:", (e as Error).message);
    }
  } else {
    console.log("⚠️ Skipping DB connect: MONGO_URI missing or has placeholders.");
  }
  app.listen(PORT, () => console.log(`🚀 API listening on http://localhost:${PORT}`));
})();
