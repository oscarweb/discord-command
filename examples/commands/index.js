import MyCommand from './MyCommand.js';

const Commands = [
	{
		name: '!test',
		class: MyCommand,
	},
	{
		name: '!hi|!hello',
		class: MyCommand,
		method : 'hi',
		bot: true //- habilita lectura de mensajes enviados por un bot. Por defecto es false.
	}
];

export default Commands;