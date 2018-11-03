'use strict';

const Homey = require('homey');
const RFDriver = require('homey-rfdriver');
const util = RFDriver.util;

// Trigger on tilt / windowcoverings_tilt

let windowcoverings_tilt_set = new Homey.FlowCardAction('SL2392S159:tilt_set'); // SL2392S159 {{driverId}}:tilt_set'
	windowcoverings_tilt_set
		.register()
		.registerRunListener((args,state) => {
      console.log( 'windowcoverings_tilt_set'  );
      console.log(  JSON.stringify(args) ); // args "direction":"up","steps":4
      console.log(  JSON.stringify(state) );
      Promise.resolve(true)
    } )

module.exports = class MyDriver extends RFDriver.Driver {

};
