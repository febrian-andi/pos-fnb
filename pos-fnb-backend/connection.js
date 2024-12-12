const dotenv = require("dotenv");
dotenv.config();

const postgres = require("postgres");

const sql = postgres(process.env.SUPABASE_DB_URL);

(async () => {
  try {
    const result = await sql`SELECT NOW()`;
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
  }
})();

module.exports = sql;
