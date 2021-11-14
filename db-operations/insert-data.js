const insertData = (table, data, columns, res, con, multiple=false) => {
  const marks = [];
  data.map(e => marks.push('?'))
  const insertQuery = `INSERT INTO ${table} (${columns.join(', ')}) VALUES ${multiple ? '?' : `(${marks.join(', ')})`}`;
  con.query(insertQuery, data, (err, results) => {
    if (err) return res.send(`An error occured: ${err}`);
    return res.status(200).json({
      message: "Row successfully added",
      result: results
  });
  });
};

module.exports = insertData;
