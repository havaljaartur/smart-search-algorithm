const db = require("./db");
const helper = require("./helpers/helper");

async function extractEntities(searchTerm) {
  const query = `SELECT * FROM smart_search('${helper.escapeString(
    searchTerm
  )}'); `; // entire logic is kept in DB level
  const result = await db.query(query);
  console.info("result", JSON.stringify(result.rows[0]["smart_search"]));
  return result.rows[0]["smart_search"] || [];
}

module.exports = { extractEntities };
