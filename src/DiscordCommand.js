import Discord from 'discord.js';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const pkg = require('../package.json');

/**
 * Discord Command
 * -
 */
class DiscordCommand{
	token = null;
	commands = [];
	observers = [];
	client = null;
	readBots = false;

	/**
	 * DiscordCommand Construct
	 * -
	 * @param {token} string
	 */
	constructor(token, commands, observers){
		this.token = (typeof token === 'undefined')? null : token;
		this.commands = (typeof commands === 'undefined')? [] : commands;
		this.observers = (typeof observers === 'undefined')? [] : observers;
		
		this.client = new Discord.Client();
	}

	/**
	 * Initialize Discord - discord.js
	 * -
	 */
	init(){
		this.client.once('ready', () => {
			this.ready();
		});

		this.client.on('message', async message => {
			if(message.author.bot && !this.readBots){
				return;
			}

			this.log(message);

			for(let command of this.commands){				
				if(this.checkCommand(message.content, command.name)){
					('method' in command)? new command.class(message, this.client)[command.method]() : new command.class(message, this.client).run();
					return;
					break;
				}
			}

			for(let observer of this.observers){
				if(observer.channel.replace('#', '') == message.channel.name){
					new observer.class(message).run();
				}
			}
		});

		this.client.login(this.token);
	}

	/**
	 * Set read bots
	 * -
	 */
	readBots(){
		this.readBots = true;
	}

	/**
	 * Check exist command
	 * -
	 * @params {String} content
	 * @params {String} command
	 * @returns {Bolean}
	 */
	checkCommand(content, command){
		if(command.indexOf('|') > 0){
			for(let name of command.split('|')){
				if(this.checkStartsWith(content, name)){
					return true;
					break;
				}
			}
		}
		else{
			if(this.checkStartsWith(content, command)){
				return true;
			}
		}

		return false;
	}

	/**
	 * Check if starts with command
	 * -
	 * @params {String} content
	 * @params {String} command
	 * @returns {Bolean}
	 */
	checkStartsWith(content, command){
		return content.startsWith(command);
	}

	/**
	 * Print ready
	 * -
	 */
	ready(){
		console.clear();
		console.log(`\x1b[32m
 ____  _                   _    _____                           _ 
|    \\|_|___ ___ ___ ___ _| |  |     |___ _____ _____ ___ ___ _| |
|  |  | |_ -|  _| . |  _| . |  |   --| . |     |     | .'|   | . |
|____/|_|___|___|___|_| |___|  |_____|___|_|_|_|_|_|_|__,|_|_|___|\x1b[0m`);

		console.log('\n\x1b[44m Discord Command ~ '+pkg.name+' v'+pkg.version+' \x1b[0m\n');
	}

	/**
	 * Log messages
	 * -
	 */
	log(message){
		let date = new Date;
		console.log(((message.channel.type == 'dm')? '\x1b[90m[ • ]': '\x1b[90m[ # ]')+' '+date.toLocaleString('es-ES')+'\x1b[0m \x1b[32m<'+message.author.username+'>\x1b[0m: '+message.content);
	}
}

export default DiscordCommand;