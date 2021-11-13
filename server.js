const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const mysql = require("mysql");
app.use(express.json());

//Require the exports module
const {insertData} = require("./utils/exports");




app.get("/", (req, res) => {
  res.send(
    "Hello world, This is an API to help you carry out operations on theStudent listing database"
  );
});

//Connecting to database

const con = mysql.createConnection({
  host: "mysql-57685-0.cloudclusters.net",
  user: "admin",
  port: 19875,
  password: "vLoo4qjP",
  database: "School_Listing",
});

app.get("/connect-to-db", (req, res) => {
  con.connect((err) => {
    if (err) res.send(`An error occured: ${err.message}\n Please Retry`);
    res.status(200).send("Successfully connected to Database");
  });
});



app.get("/create-table", (req, res) => {
  var createTable =
    "CREATE TABLE school_data (id INT PRIMARY KEY auto_increment, name VARCHAR(20) not null, description VARCHAR(20) not null, image-url VARCHAR(50) not null)";

  con.query(createTable, (err) => {
    if (err) res.send(`An error occured: ${err.message}\n `);

    res.status(200).send("Table successfully created");
  });
});


app.get("/add-school", (req, res) => {
  // const {id, name, age, email, course} = req.body

  insertData(con, req.query.id, req.query.name, req.query.description, req.query.imageUrl);
});

app.get("/get-data/:table", (req, res) => {
  let sql = `SELECT * FROM ${req.params.table.toLowerCase()}`;
  con.query(sql, (error, results, fields) => {
    if (error) {
      res.send(results);
    }
    res.status(200).send(results);
  });
});

app.listen(PORT, (e) =>
  console.log(`App running on port ${PORT} \nhttp://localhost:${PORT}/`)
);
