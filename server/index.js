const express = require("express");
const app = express();
const port = 3001;
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "adminpassword",
  database: "engineering design db",
});

app.get("/", async (req, res, next) => {
  try {
    //res.set("Access-Control-Allow-Origin", "*");
    const sql = "INSERT INTO sensor_data (sensor_id, sensor_measurement, light_intensity_lamp) VALUES (1, 20, 80)";
    db.query(sql, (err, result) => {;
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
