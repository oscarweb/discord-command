import MyCommand from './MyCommand.js';

const Commands = [
	{
		name: '!test',
		class: MyCommand,
	},
	{
		name: '!hi|!hello',
		class: MyCommand,
		method : 'hi'
	}
];

export default Commands;