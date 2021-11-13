const createTable = (tableName, columns, con, res) => {
  const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns.join(', ')})`;
  con.query(createTable, (err) => {
    if (err) res.send(`An error occured: ${err.message}\n `);

    res.status(200).send("Table successfully created");
})
}

module.exports = createTable