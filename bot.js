// This is being made with the Graf bot framework which the RP Bot runs on.
// Details for this framework can be found at https://gawdl3y.github.io/discord-graf/
const graf = require('discord-graf');
const packageInfo = require('./package.json');
const auth = require('./auth.json');

// Load in all the commands (Maybe we can automate this.)
const PingCommand = require('./commands/general/ping');

const bot = new graf.Bot({
    name: 'TrollBot',
    version: packageInfo.version,
    about: `**TrollBot** v${packageInfo.version} created by Christopher Gillis`,
    token: auth.token,
    clientOptions: {
        disable_everyone: true
    }
});

const client = bot
    .registerDefaults()
    .registerModules([
        ['general', 'General']
    ])
    .registerCommands([
        PingCommand
    ])
    .createClient();