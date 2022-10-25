import Axios from 'axios';

const luminance = 2000;	// the lamp's usual luminance when a duty cycle of 100% is used
const wattage = 24;	// the lamp's wattage (J/s)
var illuminance_max;	// TODO: set maximum illuminance that can be given
var illumance_rel = getSomeIlluminance(); // TODO: retrieve relative percentage from slider
const stateOn = 1;
const stateOff = 0;

/**
 * Function for setting the luminance of a specific lamp.
 * @param {int} index Index of the lamp to send package to.
 * @param {float} brightness Relative brightness the lamp should have from a scale of 0-100 (in percentages). This is based on perception of the light level by human eye and is thus logarithmic compared to the actual energy intensity.
 */
/*
 function setDutyCycle(index, brightness) {
	try {
		if (brightness < 0 || brightness > 100) throw new Error("Value out of bounds for [0,100].");
		var duty_cycle = Math.pow(luminance,brightness-1);
		
		// TODO: code for setting up package to send to lamp with index value 'index'
		// TODO: sent package containing 'duty_cycle' to the lamp with index 'index'

		// if succesfull:
		if (succes) {
			// TODO: set value for luminance of lamp 'index' to 'brightness'
			return true;
		}
		else throw Error("Could not update duty cycle of lamp "+index+".");
	}
	catch (e) {
		console.error(e);
		return false;
	}
}
*/

/**
 * Function for getting total amount of saved energy over all time and lamps
 * @returns Object containing energy used normally (without pwm), currently (with pwm) and the amount saved (difference in previous two)
 */
function getEnergyTotal() {
	try {
		const r_lights = Axios.get('http://localhost:3001/api/lights');
		var normalEnergy;
		var currentEnergy;
		var savedEnergy;
		var timeOn = 0;
		var timeTotal = 0;
		for (let i = 0; i < r_lights.length; i++) {
			var r_data = Axios.get('http://localhost:3001/api/lightrecord?lightid='+r_lights[i]);
			for (let j = 0; j < r_data.length; j++) {
				if (r_data[j].state == stateOn) {
					var t1 = Date.parse(r_data[j].timestamp); // milliseconds
					var t2;
					if (j == r_data.length-1) {
						t2 = Date.now(); // milliseconds
					}
					else {
						t2 = Date.parse(r_data[j+1].timestamp); // milliseconds
					}
					var lum = r_data[j].luminance;
					var dc = Math.pow(luminance,lum/100-1); // scale 0-1
					timeOn += dc*(t2-t1)/1000; // seconds 
					timeTotal += (t2-t1)/1000; // seconds
				}
			}
		}
		normalEnergy = timeTotal*wattage;
		currentEnergy = timeOn*wattage;
		savedEnergy = normalEnergy-currentEnergy;
		return {normal:normalEnergy,current:currentEnergy,saved:savedEnergy};
	} 
	catch (e) {
		console.error(e);
	}
}

/**
 * Function for getting amount of energy saved per day over all lamps
 * @returns Object array where every element contains a date (YYYY-MM-DD) with the amount of energy used without pwm, energy used with pwm, and amount of energy saved.
 */
function getEnergyDaily() {
	var energyArray;

	/**
	 * Function for adding data to row or creating new row if data does not exist  
	 * @param {string} date date for which to add value
	 * @param {float[]} values values for normal energy, current energy and saved energy to be added at date
	*/
	function updateEnergy(date, values) {
		var n = energyArray.map(object => object.date).indexOf(date);
		if (n == -1) {
			energyArray.push({date:date,normal:values[0],current:values[1],saved:values[2]});
		}
		else {
			energyArray[n].normalEnergy += values[0];
			energyArray[n].currentEnergy += values[1];
			energyArray[n].savedEnergy += values[2];
		}
	}
	/**
	 * Function for turning a date object (YYYY-MM-DDTHH:MM:SS.SSST) into string (YYYY-MM-DD)
	 * @param {Date} d date to parse into string format
	 * @returns date parsed into string
	 */
	function parseDate(d) {
		return [d.getFullYear(),(d.getMonth()+1).toString().padStart(2,'0'),d.getDate().toString().padStart(2,'0')].join('-');
	}
	try {
		const r_lights = Axios.get('http://localhost:3001/api/lights');
		// For every lamp in the list
		for (let i = 0; i < r_lights.length; i++) {
			var r_data = Axios.get('http://localhost:3001/api/lightrecord?lightid='+r_lights[i]);
			// For every record in the table
			for (let j = 0; j < r_data.length; j++) {
				// If at index j the lamp is on and the lamp is not deleted
				if (r_data[j].state == stateOn && r_data[j].action != "delete") {
					var lum = r_data[j].luminance;	// Get the relative luminance value
					var dc = Math.pow(luminance,lum/100-1);	// Convert into direct current
					var d1 = new Date(r_data[j].timestamp);	// Get first date
					var d2;	// Variable for second date
					var t1,t2;	// Variables for dates in milliseconds
					// if there is no next record, use current datetime
					if (j == r_data.length-1) {
						d2 = new Date(Date);
					}
					// if there is next record, use its timestamp
					else {
						d2 = new Date(r_data[j+1].timestamp);
					}
					// If the date of d2 takes place before that of d1 
					if (+d2 < +d1) {
						throw new Error("Not correctly sorted");
					}
					// if the date of d1 and d2 is the same
					else if (d2.getDate == d1.getDate && d2.getMonth == d1.getMonth && d2.getFullYear == d1.getFullYear) {
						t1 = Date.parse(d1.toISOString);
						t2 = Date.parse(d2.toISOString);
						let timeTotal = (t2-t1)/1000; // seconds
						let timeOn = timeTotal*dc;
						let d = parseDate(d1);
						updateEnergy(d,[timeTotal*wattage,timeOn*wattage,wattage*(timeTotal-timeOn)]);
					}
					// If the date of d2 takes place after that of d1
					else {
						// TODO: when d2 takes place on day(s) after d1
						var d,d_date,d3;
						var timeTotal,timeOn;
						const day = 86400000; // milliseconds in a day
						d_date = day - (+d1 % day);
						timeTotal = +d_date/1000;
						timeOn = timeTotal*dc;
						d = parseDate(d1);
						updateEnergy(d,[timeTotal*wattage,timeOn*wattage,wattage*(timeTotal-timeOn)]);
						d3 = new Date(+d1+d_date);
						while (!(d2.getDate == d3.getDate && d2.getMonth == d3.getMonth && d2.getFullYear == d3.getFullYear)) {
							timeTotal = day/1000;
							timeOn = timeTotal*dc;
							d = parseDate(d3);
							updateEnergy(d,[timeTotal*wattage,timeOn*wattage,wattage*(timeTotal-timeOn)]);
							d3 = new Date(+d3+day);
						}
						timeTotal = (d2 % day)/1000;
						timeOn = timeTotal*dc;
						d = parseDate(d2);
						updateEnergy(d,[timeTotal*wattage,timeOn*wattage,wattage*(timeTotal-timeOn)]);
					}
				}
			}
		}
		return energyArray;
	}
	catch (e) {
		console.error(e);
	}
}

function calculateLuminance() {
	var lum; // TODO: get luminance value of lamps from lights table
	var sensor_data; // TODO: get latest sensor data from refined data
	var min_data = Math.min(sensor_data.map(object => object.data));
	var min_data_index = sensor_data.map(object => object.data).indexOf(min_data);
	var lum_new = lum * illumance_rel/(min_data/illuminance_max);
	// TODO: upload new luminance to lights table;
}

function calibrate() {
	// TODO: set all lights to max output (i.e. luminance = 100%)
	// TODO: wait for min time elapsed before data is aggregated correctly (since mean filter)
	// TODO: get latest illuminance values from sensor_data
	// TODO: update illum_max values in sensor table
}