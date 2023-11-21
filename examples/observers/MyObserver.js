import { Command } from '../../src/index.js';

class MyObserver extends Command{
	/**
	 * Custom constructor
	 * -
	 * @param {Object} message
	 */
	// constructor(message){
	// 	super(message); // parent constructor

	// 	this.custom_var = message.content.split(' '); // or use the method with position: this.getParam(0);
	// }

	/**
	 * Default callback
	 * -
	 */
	run(){
		if(this.message.content.includes('world')){
			this.send('Hey '+this.getAuthorCompose()+', maybe this can help you: https://en.wikipedia.org/wiki/World');
		}
	}
}

export default MyObserver;