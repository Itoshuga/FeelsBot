const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require('discord.js');
const https = require('https');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Send a request to google and calculate the response time.'),
    async execute(interaction) {
        const start = Date.now();
        https.get('https://www.google.com', (res) => {
          const end = Date.now();
          const ping = end - start;
          interaction.reply(`🏓 Pong! Response Time: **${ping}ms**`);
        });
    },
};