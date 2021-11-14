const updateData = (table, toBeChanged, data, id, con, res) => {
  const sql = `UPDATE ${table}
                SET ${toBeChanged} =  ?
                WHERE id = ?`;
  con.query(sql, [data, id], (err, result) => {
    if (err) return res.send(`An error occured: ${err}`);
    return res
      .status(200)
      .json({
        message: "Data successfully updated",
        result: result
    });
  });
};

module.exports = updateData;
