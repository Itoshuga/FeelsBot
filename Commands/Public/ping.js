const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require('discord.js');
const https = require('https');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Test la connexion et renvoie le temps de réponse'),
    async execute(interaction) {
      const start = Date.now();
      https.get('https://www.google.com', (res) => {
        const end = Date.now();
        const ping = end - start;
        interaction.reply(`🏓 Pong! Temps de Réponse: **${ping}ms**`);
      });
    },
  };