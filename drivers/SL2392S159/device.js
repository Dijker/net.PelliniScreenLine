'use strict';

const Homey = require('homey');
const util = require('homey-rfdriver').util;

// Helper function to turn a number into a bitString of 4 long
const numberToCmdString = cmd => cmd.toString(2).padStart(4, '0');
// The commands mapped to the corresponding bitString
const commandMap = new Map([
	['up', numberToCmdString(0x7)], // 0111
	// idle Does not Exitst for ScreenLine !!!
  ['idle', numberToCmdString(0x2)],
	['down', numberToCmdString(0xd)], // 1101
]);
// The bitStrings mapped to the corresponding command
const stateMap = new Map(Array.from(commandMap.entries()).map(entry => {
	return entry.reverse();
}));


module.exports = RFDriver => class SL2392S159 extends RFDriver {

  // for the screenline by Geurt Dijker
  static payloadToData(payload) { // Convert received data to usable variables
    const data = {
      address: util.bitArrayToString(payload.slice(15, 33)),
			code: util.bitArrayToString(payload.slice(34,45)),
			eof:  util.bitArrayToString(payload.slice(46,48)),
      channel: parseInt( util.bitArrayToString(payload.slice(0, 11).reverse()),2),
      group: payload.slice(0, 11).indexOf(1) === -1,
      // state: payload[11],
      cmd: stateMap.get(util.bitArrayToString(payload.slice(11, 15))),
			cmdbit33: util.bitArrayToString(payload.slice(11, 15)).indexOf(payload[33]+'1'),
			cmdbit45: util.bitArrayToString(payload.slice(11, 15)).indexOf(payload[45]+'1'),
			payload: util.bitArrayToString(payload) // Temp Debug
    };
		if (data.cmdbit33 == '1') {data.cmdbit33 = 2};
		if (data.cmdbit45 == '1') {data.cmdbit45 = 2};

    // If the command corresponds to a windowcoverings_state capability value set the value to data.windowcoverings_state
    // RFDriver will automatically call this.setCapabilityValue('windowcoverings_state', data.windowcoverings_state);
	  if (data.cmd === 'up' || data.cmd === 'down') {
	  	// This data property is used by the test windowcovering pair view to animate the blinds going up/down
	  	data.direction = data.cmd;
		  data.windowcoverings_state = data.cmd;
	  } else if (data.cmd === 'idle') {
		  data.windowcoverings_state = data.cmd;
	  }

    // Set data.id to a unique value for this device. Since a remote has an address and 5 channels and each
    // channel can contain a different blind
    data.id = `${data.address}:${data.channel}`;
    console.log(data.channel, data.cmd, data.cmdbit33, data.cmdbit45);
    return data;
  }

  // for the screenline by Geurt Dijker
  static dataToPayload(data) { // Convert a data object to a bit array to be send
		// console.log('dataToPayload: '); console.log(JSON.stringify(data)); console.log(data.address.length);
		console.log(data.address.length );
    if ( data && data.address.length === 18 ) {
      const command = commandMap.get(data.command || data.windowcoverings_state);
			// console.log( command );
			if (command) {
        const address = util.bitStringToBitArray(data.address);
				const channel = ("00000000000"+(+data.channel).toString(2)).slice(-11).split('').reverse();
        // const channel = util.bitStringToBitArray(data.channel);
				const code = util.bitStringToBitArray(data.code);
				const eof = util.bitStringToBitArray(data.eof);
        // const state = data.state === 1 ? [1, 1, 0, 1] : [0, 1, 1, 1];
        return channel.concat(command.split('').map(Number),						// 11 + 4
                  address, 		// 19
									command[data.cmdbit33],			// 1
                  code,		// 11
                  command[data.cmdbit45],			// 1
                  eof)		// 2
                  // [0,1]);						  // 2
      }
    }
    return null;
  }
};
