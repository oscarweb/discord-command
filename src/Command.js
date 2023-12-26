/**
 * Helper for extends Commands
 * -
 */
class Command{
	message = null;
	params = [];

	/**
	 * Command Construct
	 * -
	 * @param {Object} message
	 */
	constructor(message){
		this.message = message
		this.getParams();
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
	send(text, params){
		if(typeof params === 'undefined'){
			params = { split : true };
		}

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

	/**
	 * Get param
	 * -
	 * @param {Integer} key
	 * @returns {String}
	 */
	getParam(key){
		if(this.params.length > 0){
			return this.params[key];
		}
		return '';
	}

	/**
	 * Create Params
	 * -
	 * @returns {Array}
	 */
    getParams(){
        if(this.message.content.indexOf(' ') > 0){
            let s = this.message.content.split(' ');
            for(let i=0;i<s.length;i++){
                if(i > 0){
                    this.params.push(s[i]);
                }
            }
        }

        return [];
    }	
}

export default Command;