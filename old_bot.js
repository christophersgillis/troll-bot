var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize : true
});
logger.level = 'debug';

console.log('blah');

// Initialize the bot
var bot = new Discord.Client();
console.log('blah 2');

bot.on('ready', () => {
    logger.info('Connected');
    logger.info(`Logged in as ${bot.user.tag}!`);
});
bot.on('message', message => {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with '!'
    if (message.content.substring(0, 1) == '!') {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        switch (cmd) {
            // !ping
            case 'ping':
                message.channel.send('Greetings, Human! Welcome to the 3 Trolls server.');
                break;
            // Add additional commands here
        }
    }
});
bot.login(auth.token);