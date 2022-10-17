const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "adminpassword", // can be taken out depending on whether the host uses password
  database: "engineering design db",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/get/', (req, res, next) => {
  try {
    const sqlSelect = "SELECT * FROM sensor_data";
    db.query(sqlSelect, (err, result) => {
      res.send(result);
    });
  }
  catch (e) {
    next(e);
  }
});

app.get("/", async (req, res, next) => {
  try {
    //res.set("Access-Control-Allow-Origin", "*");
    const sql1 = "INSERT INTO sensor_data (sensor_id, sensor_measurement, light_intensity_lamp) VALUES (1, 20, 80)"; // for csv db
    const sql2 = "INSERT INTO Raw_Data (sensor_id,data) VALUES ("+Math.floor(Math.random()*20)+","+Math.floor(Math.random()*101)+")"; // for xml db
    db.query(sql2, (err, result) => {;
      console.log(err);
      res.send("Hello World!");
      console.log("refreshed");
    });
  }
  catch(e) {
    next(e);
  }
  
});

app.listen(port, () => {
  console.log("Server started on port 3001");
});
