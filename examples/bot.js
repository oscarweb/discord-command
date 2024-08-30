import { DiscordCommand } from '../src/index.js';

import Commands from './commands/index.js';
import Observers from './observers/index.js';

new DiscordCommand('...TOKEN.DISCORD...', Commands, Observers).init();