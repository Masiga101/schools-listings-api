const createTable = (tableName, columns) => {
  const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns.join(', ')})`;
  return sql;
}