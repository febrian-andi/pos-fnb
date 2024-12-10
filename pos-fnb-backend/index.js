const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

dotenv.config();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

(async () => {
  const { error } = await supabase.from("products").select("*").limit(1);
  if (error) {
    console.error("Failed to connect to the database:", error.message);
  } else {
    console.log("Connected to the database successfully.");
  }
})();

// Get all products
app.get("/api/products", async (req, res) => {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    res.status(500).json({ error: "Error fetching products" });
    return;
  }
  res.json(data);
});

// Get a single product by ID
app.get("/api/products/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", req.params.id)
    .single();

  if (error) {
    res.status(500).json({ error: "Error fetching product" });
    return;
  }
  res.json(data);
});

// Create a new order
app.post("/api/orders", async (req, res) => {
  const { orderer_name, items } = req.body;

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const { data, error } = await supabase
    .from("orders")
    .insert({ orderer_name, items: JSON.stringify(items), total })
    .select();

  if (error) {
    res.status(500).json({ error: "Error creating order" });
    return;
  }
  res.json(data[0]);
});

// Get all orders
app.get("/api/orders", async (req, res) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    res.status(500).json({ error: "Error fetching orders" });
    return;
  }
  res.json(data);
});

// Get a single order by ID
app.get("/api/orders/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", req.params.id)
    .single();

  if (error) {
    res.status(500).json({ error: "Error fetching orders" });
    return;
  }
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
