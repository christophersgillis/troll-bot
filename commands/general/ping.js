const graf = require('discord-graf');

module.exports = class PingCommand extends graf.Command {
    constructor(bot) {
        super(bot, {
            name: 'ping',
            aliases: ['ding', 'ling'],
            module: 'general',
            memberName: 'ping',
            description: 'Tests the bot',
            usage: 'ping',
            details: 'Additional details of this function',
            examples: ['ping'],
            argsType: 'single' // Either 'single' or 'multiple'
        });
    }

    run(message, args) {
        console.log(message);
        return Promise.resolve(`Greetings, Human! Welcome to the 3 Trolls server. 
        Message: ${message}, 
        Message Guild: ${message.guild.id}`);
    }
}