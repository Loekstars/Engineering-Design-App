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
      console.log(sensor_id, sensor_data, "Data inserted from api/insert");
    });
  }
  catch (e) {
    next(e);
  }
});

app.get('/api/insertBrightness', function(req, res) {
  const sensor_id = req.query.sensorid;
  const brightness = req.query.brightness;
  const state = req.query.state;
  console.log(sensor_id, brightness, state);
  try {
    res.send("Data received");
    const sql1 = 'UPDATE lights SET light_id='+ sensor_id +', state=' + state + ', luminance='+ brightness +';';
    db.query(sql1, (err, result) => {
      console.log(sensor_id, brightness, state, "Data inserted into Brightness");
    });
  }
  catch (e) {
    next(e);
  }
});

app.get("/api/brightness", async (req, res, next) => {
  try {
    const sqlSelect = "SELECT * FROM lights";
    db.query(sqlSelect, (err, result) => {
      const brightness = result[0].luminance;
      const state = result[0].state;
      var data = [brightness, state];
      console.log(data);
      res.send(data);
      console.log("Data fetched from api/brightness");
    });
  }
  catch (e) {
    next(e);
  }
});


// -------------------------
// Dit hoeft niet aangezien de database t niet berekent maar de app zelf, functie zit in lights.js maar weet niet goed hoe ik dit moet toepassen in de app 
// -------------------------
/*app.get("/api/powerSaved", async (req, res, next) => {
  try {
    //TODO: change the query to get the power saved from the database @peter
    const sqlSelect = "SELECT luminance FROM lights ORDER BY `light_id` DESC LIMIT 1";
    db.query(sqlSelect, (err, result) => {
      res.send(result);
    });
  }
  catch (e) {
    next(e);
  }
});*/

//#region List of lights and light records selection
app.get("/api/lights", (req, res, next) => {
  try {
    const sqlSelect = "SELECT DISTINCT light_id FROM lights_records";
    db.query(sqlSelect, (err, result) => {
      res.send(result);
    });
  }
  catch (e) {
    next(e);
  }
});

app.get("/api/lightrecords", (req, res, next) => {
  try {
    const lightid = req.query.lightid;
    var where;
    if (lightid == undefined || lightid == "") {
      where = " ";
    }
    else {
      where = " WHERE light_id="+lightid+" ";
    }
    const sqlSelect = "SELECT * FROM lights_records"+where+"ORDER BY lights_records.timestamp ASC";
    db.query(sqlSelect, (err, result) => {
      res.send(result);
    });
  }
  catch (e) {
    next(e);
  }
});
//#endregion

app.get("/", async (req, res, next) => {
  try {
    res.send("Database is running succesfully!");
  }
  catch(e) {
    res.send("Database is not running");
    next(e);
  }
  
});

app.listen(port, () => {
  console.log("Server started on port 3001");
});