const deleteData = (tableName, id, con, res) => {
  con.query(`DELETE FROM ${tableName} WHERE id = ${id}`, (err, result) => {
    if (err) return res.status(500).send(err);

    console.log(result);
    res.status(200).json({
        message: "Data successfully deleted",
        result: result
    });
  });
};

module.exports = deleteData;