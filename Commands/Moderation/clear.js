const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBit, EmbedBuilder } = require('discord.js');
module.exports = {
    data:  new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Supprime un nombre de message définit.')
        .setDefaultMemberPermissions(PermissionFlagsBit.ManageMessage)
        .addIntegerOption(option => 
            option.setName('amount')
            .setDescription('Amount')
            .setRequired(true)
            )
        .addUserOption(option =>
            option.setName('target')
            .setDescription('Choisit la personne a ciblé')
            .setRequired(true)
            ),
    async execute(interaction) {
        const { channel, options } = interaction;

        const amount = options.getInteger('amount');
        const target = options.getUser('target');

        const messages = await channel.messages.fetch({
            limit: amount + 1,
        })

        const clearEmbed = new EmbedBuilder()
            .setColor(0x5fb041)

        if (target) {
            let i = 0;
            const filtered = [];

            (await messages).filter((msg) => {
                if (msg.author.id === target.id && amount > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            await channel.bulkDelete(filtered).then(messages => {
                clearEmbed.setDescription(`Successfully deleted ${messages.size} messages from ${target}.`);
                message.reply({ embeds: [clearEmbed]});
            });
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                clearEmbed.setDescription(`Successfully deleted ${messages.size} messages from the channel.`);
                message.reply({ embeds: [clearEmbed]});
            })
        }
    }
}