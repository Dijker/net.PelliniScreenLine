'use strict';

module.exports = {
	id: 'SL2392S159',
	name: {
		en: 'ScreenLine Remote',
		nl: 'ScreenLine Afstandsbediening',
	},
	icon: './drivers/SL2392S159/assets/blinds.svg',
	class: 'windowcoverings',
	capabilities: [
		'windowcoverings_state',
		'dim',
		'windowcoverings_tilt_up',
		'windowcoverings_tilt_down',
		'windowcoverings_tilt_set'
	],
	images: {
		large: './drivers/SL2392S159/assets/images/large.png',
		small: './drivers/SL2392S159/assets/images/small.png',
	},
	rf: {
		signal: 'screenline',
	},
	settings: [],
	pair: [
		{
			id: 'imitate',
			rf_template: 'imitate',
		},
		{
			id: 'test_switch',
			rf_template: 'test_switch',
		},
		{
			id: 'done',
			rf_template: 'done',
		},
	],
};
