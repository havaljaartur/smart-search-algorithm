function escapeString(str) {
  return str.replace(/'/g, "''");
}
module.exports = { escapeString };
