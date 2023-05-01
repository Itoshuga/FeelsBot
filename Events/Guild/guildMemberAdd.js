const { EmbedBuilder } = require('@discordjs/builders');
const { GuildMember } = require('discord.js');

module.exports = {
    name: "guildMemberAdd",
    execute(member) {
        const { user, guild } = member;
        const welcomeChannel = member.guild.channels.cache.get('1102210716594884658');
        const welcomeMessage = `Bienvenue sur le serveur <@${member.id}>.`;
        const memberRole = '1102404515002585192';

        const welcomeEmbed = new EmbedBuilder()
            .setDescription(welcomeMessage)
            .setColor(0xFFFFFF)
            .setTimestamp()

        welcomeChannel.send({embeds: [welcomeEmbed]});
        member.roles.add(memberRole);
    }
}