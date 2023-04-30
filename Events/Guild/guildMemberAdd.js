const { EmbedBuilder } = require('@discordjs/builders');
const { GuildMember } = require('discord.js');

module.exports = {
    name: "guildMemberAdd",
    execute(member) {
        const { user, guild } = member;
        const welcomeChannel = member.guild.channels.cache.get('1102210716594884658');
        const welcomeMessage = `Bienvenue sur le serveur <@${member.id}>.`

        const welcomeEmbed = new EmbedBuilder()
            .setDescription(welcomeMessage)
            .setColor(0xFFFFFF)
            .setTimestamp()

        welcomeChannel.send({embeds: [welcomeEmbed]})
    }
}