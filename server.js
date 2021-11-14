//Require basic modules
require('dotenv').config()
const express = require("express");
const PORT = process.env.PORT || 3000;
const mysql = require("mysql");
const Joi = require('joi')


//Require the exports module
const {insertData, createTable, fetchData, updateData, deleteData} = require("./utils/exports");

//Initialize App 
const app = express();
app.use(express.json());



//Home route
app.get("/", (req, res) => {
  res.send(
    "Hello world, This is an API to help you carry out operations on theStudent listing database"
  );
});


//Connecting to database

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});


//Connect To database 
app.get("/connect-to-db", (req, res) => {
  con.connect((err) => {
    if (err) res.send(`An error occured: ${err.message}\n Please Retry`);
    console.log('A user has Connected to the database')
    res.status(200).send("Successfully connected to Database");
  });
});


//Create Table Request

app.post("/create-table", (req, res) => {
  const schema = Joi.object({
    tableName: Joi.string().required(),
    columns: Joi.array().required()
  })

const results = schema.validate(req.body)
if(results.error) return res.status(400).send(results.error.details[0].message)
const { tableName, columns} = results.value;
  createTable(tableName, con, res, columns);

});

//Add Data to Database

app.post("/add-data", (req, res) => {
  
    const schema = Joi.object({
      tableName: Joi.string().required(),
      columns: Joi.array().required(),
      data: Joi.array().required()
    })

  const results = schema.validate(req.body)
  if(results.error) return res.status(400).send(results.error.details[0].message)
  const { tableName, columns, data} = results.value;
  insertData( tableName, data, columns, res, con);
});


//Get data from Table
app.get("/get-data/:table", (req, res) => {

  const schema = Joi.object({
    table: Joi.string().required(),
  })

  const results = schema.validate(req.params)
  if(results.error) return res.status(400).send(results.error.details[0].message)
  const { table } = results.value;
  fetchData(table, con, res);
});

//Update Data in Table
app.put("/update-data", (req, res) => {
  const schema = Joi.object({
    tableName: Joi.string().required(),
    toBeChanged: Joi.string().required(),
    data: Joi.string().required(),
    id: Joi.number().integer().required()
  })

  const results = schema.validate(req.body)

  if(results.error) return res.status(400).send(results.error.details[0].message)
  const { tableName, toBeChanged, data, id } = results.value;
  updateData(tableName, toBeChanged, data, id, con, res);
})

//Delete Data from Table

app.delete("/delete-data", (req, res) => {
  const schema = Joi.object({
    tableName: Joi.string().required(),
    id: Joi.number().integer().required()
  })

  const results = schema.validate(req.body)

  if(results.error) return res.status(400).send(results.error.details[0].message)
  const { tableName, id } = results.value;
  deleteData(tableName, id, con, res);
})


//start server
app.listen(PORT, (e) =>
  console.log(`App running on port ${PORT} \nhttp://localhost:${PORT}/`)
);
