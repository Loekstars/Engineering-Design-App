import Axios from 'axios';

const luminance = 2000;	// the lamp's usual luminance when a duty cycle of 100% is used
const wattage = 24;	// the lamp's wattage (J/s)
var illuminance_max;	// TODO: set maximum illuminance that can be given
var illuminance_rel = 100; // TODO: retrieve relative percentage from slider
const stateOn = 1;
const stateOff = 0;

//const slider = require("../pages/LampSettings");

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
		var normalEnergy = 0;
		var currentEnergy = 0;
		var savedEnergy = 0;
		var timeOn = 0;
		var timeTotal = 0;
		Axios.get('http://localhost:3001/api/lights').then(r_lights => {
			r_lights = r_lights.data.map(object => object.light_id);
			var timeO = 0;
			var timeT = 0;
			const times = function(t){return t};
			for (let i = 0; i < r_lights.length; i++) {
				Axios.get('http://localhost:3001/api/lightrecords?lightid='+r_lights[i]).then(r_data => {
					r_data = r_data.data;
					for (let j = 0; j < r_data.length; j++) {
						if (r_data[j].state === stateOn) {
							var t1 = Date.parse(r_data[j].timestamp); // milliseconds
							var t2;
							if (j === r_data.length-1) {
								t2 = Date.now(); // milliseconds
							}
							else {
								t2 = Date.parse(r_data[j+1].timestamp); // milliseconds
							}
							var dc = r_data[j].luminance/100000;
							timeOn += dc*(t2-t1)/1000; // seconds 
							timeTotal += (t2-t1)/1000; // seconds
						}
					}
					return [timeOn,timeTotal];
				}).then(times);
				timeO = times[0];
				timeT = times[1];
				console.log(timeO,",",timeT);
			}
		});
		normalEnergy = timeTotal*wattage;
		currentEnergy = timeOn*wattage;
		savedEnergy = normalEnergy-currentEnergy;
		console.log(currentEnergy,",",normalEnergy,",",savedEnergy);
		console.log(timeOn,",",timeTotal);
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
	var energyArray = new Array();

	/**
	 * Function for adding data to row or creating new row if data does not exist  
	 * @param {string} date date for which to add value
	 * @param {float[]} values values for normal energy, current energy and saved energy to be added at date
	*/
	function updateEnergy(date, values) {
		var n = energyArray.map(object => object.date).indexOf(date);
		if (n === -1) {
			var object = {date:date,normal:values[0],current:values[1],saved:values[2]};
			energyArray.push(object);
		}
		else {
			energyArray[n].normal += values[0];
			energyArray[n].current += values[1];
			energyArray[n].saved += values[2];
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
	function parsedDateToMilliSeconds(d) {
		var d_n = d+"T00:00:00.000Z";
		return Date.parse(d_n);
	}

	try {
		Axios.get('http://localhost:3001/api/lights').then(r_lights => {
			console.log(r_lights);
			r_lights = r_lights.data.map(object => object.light_id);
			console.log(r_lights);
			// For every lamp in the list
			for (let i = 0; i < r_lights.length; i++) {
				Axios.get('http://localhost:3001/api/lightrecords?lightid='+r_lights[i]).then((r_data) => {
					r_data = r_data.data;
					// For every record in the table
					for (let j = 0; j < r_data.length; j++) {
						// If at index j the lamp is on and the lamp is not deleted
						console.log(r_data[j].state)
						if (r_data[j].state === stateOn && r_data[j].action !== "delete") {
							var dc = r_data[j].luminance/100000;	// Get the relative luminance value
							var d1 = new Date(r_data[j].timestamp);	// Get first date
							var d2;	// Variable for second date
							var t1,t2;	// Variables for dates in milliseconds
							// if there is no next record, use current datetime
							if (j === r_data.length-1) {
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
							else if (d2.getDate === d1.getDate && d2.getMonth === d1.getMonth && d2.getFullYear === d1.getFullYear) {
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
								while (!(d2.getDate === d3.getDate && d2.getMonth === d3.getMonth && d2.getFullYear === d3.getFullYear)) {
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
				}).catch(err => {
					console.error(err);
				});
			}
		}).catch(err => {
			console.error(err);
		}); 
		energyArray.sort((a,b) => parsedDateToMilliSeconds(a.date)-parsedDateToMilliSeconds(b.date)); // ascending order
		console.log(energyArray);
		return energyArray;
	}
	catch (e) {
		console.error(e);
	}
}

function calculateLuminance() {
	//illuminance_rel = slider.getValue();
	const lights = Axios.get('http://localhost:3001/api/lights');
	var dc_old = Axios.get('http://localhost:3001/api/brightness');
	var lum_old = correctedDutyCycleToLuminance(dc_old);
	var sensor_data = Axios.get('http://localhost:3001/get');
	var min_data = Math.min(sensor_data.map(object => object.data));
	var min_data_index = sensor_data.map(object => object.data).indexOf(min_data);
	var lum_new = lum_old * illuminance_rel/(min_data/illuminance_max);
	var dc_new = luminanceToDutyCycle(lum_new);
	for (let i = 0; i < lights.length; i++) {

	}
	// TODO: upload dc_new to lights table;
}

function rawDutyCycleToLuminance(dc) {
	return 1+Math.log(dc)/Math.log(luminance);
}

function correctedDutyCycleToLuminance(dc) {
	return Math.log(dc*(luminance-1)+1)/Math.log(luminance);
}

function luminanceToDutyCycle(lum_rel) {
	var ans_raw = Math.pow(luminance,lum_rel-1);
	var ans_corrected = (ans_raw-Math.pow(luminance,-1))/(1-Math.pow(luminance,-1));
	return ans_corrected;
}

/*
function calibrate() {
	// TODO: set all lights to max output (i.e. luminance = 100%)
	// TODO: wait for min time elapsed before data is aggregated correctly (since mean filter)
	// TODO: get latest illuminance values from sensor_data
	// TODO: update illum_max values in sensor table
}*/


export {getEnergyDaily,getEnergyTotal};