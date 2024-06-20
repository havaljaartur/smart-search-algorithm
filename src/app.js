const express = require("express");
const { extractEntities } = require("../src/extractEntities");
const PORT = process.env.SERVER_PORT;
const app = express();

// /query method for filtering entities with smart search
app.get("/query", async (req, res) => {
  const { query } = req.query;
  console.log("query", query);
  if (!query) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    const entities = await extractEntities(query);
    res.json(entities);
  } catch (error) {
    console.error("Error fetching entities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
