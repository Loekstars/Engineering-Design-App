/**
 * Function for setting the luminance of a specific lamp.
 * @param {int} index Index of the lamp to send package to.
 * @param {float} brightness Relative brightness the lamp should have from a scale of 0-1. This is based on perception of the light level by human eye and is thus logarithmic compared to the actual energy intensity.
 */

function setLuminance(index, brightness) {
	try {
		if (value < 0 || value > 1) throw new Error("Value out of bounds for [0,1].")
		var duty_cycle = Math.pow(luminance,value-1);
		
		// TODO: code for setting up package to send to lamp with index value 'index'
		// TODO: sent package containing 'duty_cycle' to the lamp with index 'index'
	}
	catch (e) {
		console.error(e);
	}
}