const luminance; // the lamp's usual luminance when a duty cycle of 100% is used
const wattage; // the lamp's wattage

/**
 * Function for setting the luminance of a specific lamp.
 * @param {int} index Index of the lamp to send package to.
 * @param {float} brightness Relative brightness the lamp should have from a scale of 0-100 (in percentages). This is based on perception of the light level by human eye and is thus logarithmic compared to the actual energy intensity.
 */
 function setDutyCycle(index, brightness) {
	try {
		if (brightness < 0 || brightness > 100) throw new Error("Value out of bounds for [0,100].")
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

function getEnergyTotals() {
	const q_lights = "SELECT DISTINCT light_id FROM lights_records";
	// TODO: retrieve lights into r_lights
	const r_lights;
	var normalEnergy;
	var currentEnergy;
	var savedEnergy;
	var timeOn = 0;
	var timeTotal;
	for (let i = 0; i < r_lights.length; i++) {
		var q_data = "SELECT * FROM lights_records WHERE light_id="+r_lights[i]+" ORDER BY lights_records.timestamp ASC";
		// TODO: retrieve data into r_data
		var r_data;
		for (let j = 0; j < r_data.length; j++) {
			if (r_data[j]["state"] == "on") {
				var t1 = Date.parse(r_data[j]["timestamp"]);
				var t2;
				if (j == r_data.length-1) {
					t2 = Date.now();
				}
				else {
					t2 = Date.parse(r_data[j+1]["timestamp"]);
				}
				var lum = r_data[j]["luminance"];
				var dc = Math.pow(luminance,lum/100-1);
				timeOn += dc*(t2-t1);
				timeTotal += t2-t1;
			}
		}
	}
	normalEnergy = timeTotal*wattage;
	currentEnergy = timeOn*wattage;
	savedEnergy = normalEnergy-currentEnergy;
	return {normal:normalEnergy,current:currentEnergy,saved:savedEnergy};
}

function getEnergyDaily() {
	const q_lights = "SELECT DISTINCT light_id FROM lights_records";
	// TODO: retrieve lights into r_lights
	const r_lights;
	var normalEnergy;
	var currentEnergy;
	var savedEnergy;
	var timeOn = 0;
	var timeTotal;
	for (let i = 0; i < r_lights.length; i++) {
		var data_array = new Array();
		var q_data = "SELECT * FROM lights_records WHERE light_id="+r_lights[i]+" ORDER BY lights_records.timestamp ASC";
		// TODO: retrieve data into r_data
		var r_data;
		for (let j = 0; j < r_data.length; j++) {
			if (r_data[j]["state"] == "on") {
				var t1 = Date.parse(r_data[j]["timestamp"]);
				var t2;
				if (j == r_data.length-1) {
					t2 = Date.now();
				}
				else {
					t2 = Date.parse(r_data[j+1]["timestamp"]);
				}
				var lum = r_data[j]["luminance"];
				var dc = Math.pow(luminance,lum/100-1);
				timeOn += dc*(t2-t1);
				timeTotal += t2-t1;
			}
		}
	}
	normalEnergy = timeTotal*wattage;
	currentEnergy = timeOn*wattage;
	savedEnergy = normalEnergy-currentEnergy;
	return {normal:normalEnergy,current:currentEnergy,saved:savedEnergy};
}