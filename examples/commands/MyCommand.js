import { Command } from '../../src/index.js';

class MyCommand extends Command{
	/**
	 * Custom constructor
	 * -
	 * @param {Object} message
	 */
	// constructor(message){
	// 	super(message); // parent constructor

	// 	this.custom_var = message.content.split(' ');
	// }

	/**
	 * Default callback
	 * -
	 */
	run(){
		this.reply('Test command on #'+this.getChannelName());
	}

	/**
	 * Custom callback
	 * -
	 */
	hi(){
		this.send('hi '+this.getAuthorCompose()+' !!!');
	}
}

export default MyCommand;