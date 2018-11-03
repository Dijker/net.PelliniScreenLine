'use strict';

const Homey = require('homey');
const RFDriver = require('homey-rfdriver');
const util = RFDriver.util;

module.exports = class MyDriver extends RFDriver.Driver {
  /**
	 * Method that will be called when a driver is initialized. It will register Flow Cards
	 * for the respective drivers. Options parameter should at least contain a driverType
	 * property.
	 * @param options {Object}
	 * @returns {Error}
	 */
	onInit(options) {
    new Homey.FlowCardAction('SL2392S159:tilt_set') // SL2392S159 {{driverId}}:tilt_set'
  		// windowcoverings_tilt_set
  			.register()
  			.registerRunListener((args,state) => {
  	      //console.log( 'driver - windowcoverings_tilt_set'  );
  	      //console.log(  JSON.stringify(args) ); // args "direction":"up","steps":4
  	      //console.log(  JSON.stringify(state) );

  				args.device.onWindowcoverings_tilt_set(args)
  	    } )
    }
};
