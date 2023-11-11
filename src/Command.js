/**
 * Helper for extends Commands
 * -
 */
class Command{
	message = null;

	/**
	 * Command Construct
	 * -
	 * @param {Object} message
	 */
	constructor(message){
		this.message = message
	}

	/**
	 * Send message with mention
	 * -
	 * @param {String} text
	 */
	reply(text){
		this.message.reply(text);
	}

	/**
	 * Send message to channel
	 * -
	 * @param {String} text
	 */
	send(text){
		this.message.channel.send(text);
	}

	/**
	 * Get username
	 * -
	 * @returns {String}
	 */
	getAuthorName(){
		return this.message.author.username;
	}

	/**
	 * Get code user name
	 * -
	 * @returns {String}
	 */
	getAuthorCompose(){
		return '<@'+this.message.author.id+'>';
	}

	/**
	 * Get type message: text or dm
	 * -
	 * @returns {String}
	 */
	getMessageType(){
		return this.message.channel.type;
	}

	/**
	 * Get channel name
	 * -
	 * @returns {String}
	 */
	getChannelName(){
		return this.message.channel.name;
	}

	/**
	 * Get channel object
	 * -
	 * @returns {Object}
	 */
	channel(){
		return this.message.channel;
	}

	/**
	 * Check bot
	 * -
	 * @returns {Boolean}
	 */
	isBot(){
		return this.message.author.bot;
	}
}

export default Command;