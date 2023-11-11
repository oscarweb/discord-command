import { DiscordCommand } from '../src/index.js';

import Commands from './commands/index.js';

new DiscordCommand('...TOKEN.DISCORD...', Commands).init();