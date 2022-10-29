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

// data can be sent to the database using the following url
app.get('/api/insertBrightness', function(req, res) {
  const brightness = req.query.brightness;
  const state = req.query.state;
  console.log(brightness, state);
  try {
    res.send("Data received");
    const sql1 = 'UPDATE lights SET state=' + state + ', luminance='+ brightness +' WHERE light_id=2;';
    db.query(sql1, (err, result) => {
      console.log(brightness, state, "Data inserted into Brightness");
    });
  }
  catch (e) {
    next(e);
  }
});

// data can be sent to the database using the following url
app.get('/api/insertBrightnessPico', function(req, res) {
  const sensor_id = req.query.sensorid;
  // calculate brightness from sensor data
  const brightness = 10000 -  (Math.round((50*Math.log(req.query.brightness)/150)*100))*40;
  console.log("brightness: ", brightness)
  const state = req.query.state;
  console.log(sensor_id, brightness, state);
  // insert data into database
  if (!(brightness > 65533)) {
    try {
      res.send("Data received");
      const sql1 = 'UPDATE lights SET state=' + state + ', luminance='+ brightness +' WHERE light_id=1;';
      db.query(sql1, (err, result) => {
        console.log(sensor_id, brightness, state, "Data inserted into Brightness PICO");
      });
    }
    catch (e) {
      next(e);
    }
  }
});

//create a global variable
app.get("/api/brightness", async (req, res, next) => {
  try {
    // get data from database
    const sqlSelect = "SELECT * FROM lights";
    db.query(sqlSelect, (err, result) => {
      const brightnessPico = result[0].luminance;
      const brightnessApp = result[1].luminance;
      //get the old state
      const state = result[0].state;
      var data1 = [brightnessPico, state];
      var data2 = [brightnessApp, state];
      const buttonState = parseInt(req.query.buttonState);
      console.log(state, buttonState);
      // if button state is equal to 1 or 0, then update the state
      
      if (buttonState == 1 || buttonState == 0) {
        console.log("1")
        data1[1] = buttonState;
        data2[1] = buttonState;
        const sqlUpdate = "UPDATE lights SET state=" + buttonState + " WHERE light_id=1 OR light_id=2;";
        db.query(sqlUpdate, (err, result) => {
          console.log("Updated state");
        });
      } else {
        console.log("2")
        data1[1] = state;
        data2[1] = state;
      }

      if (brightnessPico > brightnessApp) {
        res.send(data1);
      } else {
        res.send(data2);
      }
      console.log(data1, data2, "Data fetched from api/brightness");
    });
  }
  catch (e) {
    next(e);
  }
});

// here the data for the graph is fetched from the database and returned to the app
app.get("/api/getChartData", async (req, res, next) => {
  try {
    const sqlSelect = 'SELECT * FROM lights_records WHERE state=1 AND luminance > 200 LIMIT 200';
    db.query(sqlSelect, (err, result) => {
      //make and array with the luminance values
      // var data = [];
      // for (var i = 0; i < result.length; i++) {
      //   data.push(result[i].luminance);
      // }
      res.send(result);
      // console.log(result, "Data fetched from api/getChartData");
    });
  }
  catch (e) {
    next(e);
  }
});


// region List of lights and light records selection
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
    const sqlSelect = "SELECT * FROM lights_records WHERE light_id=1 ORDER BY lights_records.timestamp ASC";
    db.query(sqlSelect, (err, result) => {
      res.send(result);
    });
  }
  catch (e) {
    next(e);
  }
});

// here the request about the getLatestState is handled, this returns the latest state from the database lights
app.get("/api/getLatestState", (req, res, next) => {
  try {
    const sqlSelect = "SELECT state FROM lights_records ORDER BY timestamp DESC LIMIT 1";
    db.query(sqlSelect, (err, result) => {
      res.send(result);
      });
    } catch (e) {
      next(e);
    }
  });

// main page for the API
app.get("/", async (req, res, next) => {
  try {
    res.send("Database is running succesfully!");
  }
  catch(e) {
    res.send("Database is not running");
    next(e);
  }
  
});

// setup the server
app.listen(port, () => {
  console.log("Server started on port 3001");
});