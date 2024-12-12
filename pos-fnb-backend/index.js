const express = require("express");
const cors = require("cors");
const sql = require("./connection");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const data = await sql`SELECT * FROM products`;
    res.json(data);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: "Error fetching products" });
  }
});

// Get a single product by ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const data = await sql`SELECT * FROM products WHERE id = ${req.params.id}`;
    if (data.length === 0) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json(data[0]);
  } catch (error) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({ error: "Error fetching product" });
  }
});

// Create a new order
app.post("/api/orders", async (req, res) => {
  const { orderer_name, items } = req.body;

  try {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const [newOrder] = await sql`
      INSERT INTO orders (orderer_name, items, total)
      VALUES (${orderer_name}, ${JSON.stringify(items)}, ${total})
      RETURNING *
    `;

    res.json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({ error: "Error creating order" });
  }
});

// Get all orders
app.get("/api/orders", async (req, res) => {
  try {
    const data = await sql`SELECT * FROM orders ORDER BY created_at DESC`; 
    res.json(data);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ error: "Error fetching orders" });
  }
});

// Get a single order by ID
app.get("/api/orders/:id", async (req, res) => {
  try {
    const data = await sql`SELECT * FROM orders WHERE id = ${req.params.id}`;
    if (data.length === 0) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    res.json(data[0]);
  } catch (error) {
    console.error("Error fetching order:", error.message);
    res.status(500).json({ error: "Error fetching order" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
