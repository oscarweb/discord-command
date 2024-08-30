import { DiscordCommand } from '../src/index.js';

import Commands from './commands/index.js';
import Observers from './observers/index.js';

const options = {
    token: '...TOKEN.DISCORD...',
    commands: Commands,
    observers: Observers,
    // tasks: [],
    // log: true
};

new DiscordCommand(options).init();