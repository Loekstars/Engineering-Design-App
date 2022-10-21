const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // can be taken out depending on whether the host uses password
  database: "app database", 
});

//set up middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/get/', (req, res, next) => {
  try {
    const sqlSelect = "SELECT * FROM refined_data ORDER BY timestamp ASC";
    db.query(sqlSelect, (err, result) => {
      res.send(result);
    });
  }
  catch (e) {
    next(e);
  }
});

// data can be sent to the database using the following url
app.get('/api/insert', function(req, res) {
  const sensor_id = req.query.sensorid;
  const sensor_data = req.query.data;
  try {
    res.send("Data received");
    const sql1 = 'INSERT INTO raw_data (sensor_id, data) VALUES ('+ sensor_id +','+ sensor_data+')';
    db.query(sql1, (err, result) => {
      console.log(sensor_id, sensor_data, "Data inserted");
    });
  }
  catch (e) {
    next(e);
  }
});

app.get("/", async (req, res, next) => {
  try {
    // //res.set("Access-Control-Allow-Origin", "*");
    // const sql1 = "INSERT INTO sensor_data (sensor_id, sensor_measurement, light_intensity_lamp) VALUES (1, 33, 12)"; // for csv db
    // const sql2 = "INSERT INTO Raw_Data (sensor_id,data) VALUES ("+Math.floor(Math.random()*20)+","+Math.floor(Math.random()*101)+")"; // for xml db
    // db.query(sql2, (err, result) => {;
    //   console.log(err);
      
    //   console.log("refreshed");
    // });
    res.send("Database is running succesfully!");
    const sql1 = 'INSERT INTO raw_data (sensor_id, data) VALUES (1, 34)';
    db.query(sql1, (err, result) => {
      console.log("Data inserted");
    });
  }
  catch(e) {
    next(e);
  }
  
});

app.listen(port, () => {
  console.log("Server started on port 3001");
});