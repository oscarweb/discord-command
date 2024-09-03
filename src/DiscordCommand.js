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
		this.logConsole = options?.log || true;
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

					this.log(message);
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

			this.log(message);
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
		if(!content.startsWith('!')){
			return false;
		}

		let text = content.split(' ')[0];
		
		if(command.indexOf('|') > 0){
			for(let name of command.split('|')){
				if(text === name){
					return true;
					break;
				}
			}
		}
		else{
			if(text === command){
				return true;
			}
		}

		return false;
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
		// si es un bot cortamos
		if(this.isBot(message)){
			return;
		}
		
		if(this.logConsole){
			let date = new Date;
			let prefix = '\x1b[90m[#'+message.channel.name+']';
			let author = '\x1b[32m<'+message.author.username+'>\x1b[0m:';

			if(message.channel.type == 'dm'){
				prefix = '\x1b[90m[DM]';
				author = '\x1b[36m<'+message.author.username+'>\x1b[0m:';
			}

			console.log(prefix+' '+date.toLocaleString('es-ES')+'\x1b[0m '+author+' '+message.content);
			//console.log('\x1b[90m'+('-'.repeat(process.stdout.columns))+'\x1b[0m');
		}
	}
}

export default DiscordCommand;