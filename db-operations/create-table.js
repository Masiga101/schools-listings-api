const createTable = (tableName, con, res, columns) => {
  const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns.join(', ')})`;
  con.query(sql, (err) => {
    if (err) return  res.send(`An error occured: ${err.message}\n `);

   return res.status(200).send("Table successfully created");
})
}

module.exports = createTable