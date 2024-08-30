import Discord from 'discord.js';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const pkg = require('../package.json');

/**
 * Discord Command
 * -
 */
class DiscordCommand{
	/**
	 * DiscordCommand Construct
	 * -
	 * @params { Object } options
	 */
	constructor(options){
		this.token = options?.token || null;
		this.commands = options?.commands || [];
		this.observers = options?.observers || [];
		this.tasks = options?.tasks || [];
		this.log = options?.log || true;
		this.client = new Discord.Client();
	}

	/**
	 * Initialize Discord - discord.js
	 * -
	 */
	init(initClass){
		this.client.once('ready', () => {
			this.ready();
		});

		if(typeof initClass !== 'undefined'){
			new initClass(this.client);
		}

		this.client.on('message', async message => {
			//- recorremos comandos
			for(let command of this.commands){
				//- si existe un comando
				if(this.checkCommand(message.content, command.name)){
					let setBotOn = false;

					//- si bot está definido, guarda el valor
					if('bot' in command){
						setBotOn = command.bot;
					}

					//- si es un bot y bot está en false cortamos
					if(this.isBot(message) && !setBotOn){
						return;
						break;
					}

					//- si existe el método dentro de la Class
					if('method' in command){
						new command.class(message, this.client)[command.method]();
					}
					//- si no existe el método ejecutamos el default
					else{
						new command.class(message, this.client).run();
					}

					return;
					break;
				}
			}

			//- recorremos observadores
			for(let observer of this.observers){
				//- si es un canal dentro del observador
				if(observer.channel.replace('#', '') == message.channel.name){
					let setBotOn = false;

					//- si bot está definido, guarda el valor
					if('bot' in observer){
						setBotOn = observer.bot;
					}

					//- si no es un bot ejecutamos el método por default y si es un bot tiene que estar habilitado
					if(!this.isBot(message) || (this.isBot(message) && setBotOn)){
						new observer.class(message).run();
					}
				}
			}

			//- mostramos mensaje en consola si no es un bot
			if(!this.isBot(message)){
				this.log(message);
			}
		});

		this.client.login(this.token);
	}

	/**
	 * Check is bot
	 * -
	 * @return {Bolean}
	 */
	isBot(message){
		return message.author.bot;
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