const fetchData = (tableName, con, res) => {
  let sql = `SELECT * FROM ${tableName}`;
  con.query(sql, (error, results, fields) => {
    if (error)  return res.send(`An error occured: ${err}\n `);
    return res.status(200).send(results);
  });
};

module.exports = fetchData;