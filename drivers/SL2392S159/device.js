'use strict';

const Homey = require('homey');
const util = require('homey-rfdriver').util;

// Helper function to turn a number into a bitString of 4 long
const numberToCmdString = cmd => cmd.toString(2).padStart(4, '0');
// The commands mapped to the corresponding bitString
// Cmd id's are replaced with placeholders
const commandMap = new Map([
	['up', numberToCmdString(0x7)],
	// idle Does not Exitst for ScreenLine !!!
  ['idle', numberToCmdString(0x2)],
	['down', numberToCmdString(0xd)],
]);
// The bitStrings mapped to the corresponding command
const stateMap = new Map(Array.from(commandMap.entries()).map(entry => {
	return entry.reverse();
}));


module.exports = RFDriver => class SL2392S159 extends RFDriver {

  // for the screenline by Geurt Dijker
  static payloadToData(payload) { // Convert received data to usable variables
    const data = {
      address: util.bitArrayToString(payload.slice(15, 33).concat(payload.slice(34,45),payload.slice(46,48))),
      channel: util.bitArrayToString(payload.slice(0, 11)),
      group: payload.slice(0, 11).indexOf(1) === -1,
      // state: payload[11],
      cmd: stateMap.get(util.bitArrayToString(payload.slice(11, 15)))
    };
    // If the command corresponds to a windowcoverings_state capability value set the value to data.windowcoverings_state
    // RFDriver will automatically call this.setCapabilityValue('windowcoverings_state', data.windowcoverings_state);
    if (data.cmd === 'idle' || data.cmd === 'up' || data.cmd === 'down') {
      data.windowcoverings_state = data.cmd;
    }
    // Set data.id to a unique value for this device. Since a remote has an address and 5 channels and each
    // channel can contain a different blind
    data.id = `${data.address}:${data.channel}`;
    console.log(JSON.stringify(data));
    return data;
  }

  // for the screenline by Geurt Dijker
  static dataToPayload(data) { // Convert a data object to a bit array to be send
		console.log('dataToPayload: ');
		console.log(JSON.stringify(data));
		console.log(data.address.length);

    if ( data && data.address.length === 31 ) {
      const command = commandMap.get(data.command || data.windowcoverings_state);
			console.log( command );
			if (command) {
        const address = util.bitStringToBitArray(data.address);
        const channel = util.bitStringToBitArray(data.channel);
        // const state = data.state === 1 ? [1, 1, 0, 1] : [0, 1, 1, 1];
        return channel.concat(command.split('').map(Number),						// 11 + 4
                  address.slice(0,18), 		// 19
                  command.slice(2,3),			// 1
                  address.slice(18,29),		// 11
                  command.slice(0,1),			// 1
                  address.slice(29,31))		// 2
                  // [0,1]);						// 2
      }
    }
    return null;
  }
};