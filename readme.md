# Discord Command

Simply add your custom commands to your Discord Bot.

**Discord Channel**
![Channel - Discord Command](https://oscarweb.com.ar/github/discord-command/preview_discord.png)

**Console**
![Console - Discord Command](https://oscarweb.com.ar/github/discord-command/preview_console.png)



## Install
```
npm install @oscarweb/discord-command 
```
**This package is ESM-only and thus requires Node.js v14 or higher.**

## Example
```js
// bot.js
import { DiscordCommand } from '@oscarweb/discord-command';

// Custom Commands
import Commands from './custom-commands/index.js';

new DiscordCommand('...TOKEN.DISCORD...', Commands).init();
```
Add your custom commands.
```js
// custom-commands/index.js
import MyCommand from './MyCommand.js';

// You can add a method name for to custom callback.
const Commands = [
	{
		name: '!test',
		class: MyCommand
	},
	{
		name: '!hi',
		class: MyCommand,
		method: 'hi',
		bot: true // Enable reading for bots. Default: false
	}
];

export default Commands;
```
Get methods defined if you extend your class
```js
// custom-commands/MyCommand.js
import { Command } from '@oscarweb/discord-command';

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
```

## Your package.json
```json
{
	"type": "module"
}
```

## Ready
```
node bot.js
```