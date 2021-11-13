const insertData = (table, name, description, imageUrl, res) => {
    var insertQuery = `INSERT INTO ${table} (name, description, image-url) VALUES (?, ?, ?)`;
    con.query(insertQuery, [name, description, imageUrl], (err) => {
      if (err) res.send(`An error occured: ${err.message}\n `);
      res.status(200).send("Data successfully inserted");
    });
  }

  module.exports = insertData;