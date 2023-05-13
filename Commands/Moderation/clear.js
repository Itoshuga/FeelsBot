const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Removes a defined number of messages.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Amount of messages to delete.')
                .setRequired(true)
        )
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Target whose messages will be deleted.')
                .setRequired(false)
        ),
    async execute(interaction) {
        const { channel, options } = interaction;

        const amount = options.getInteger('amount');
        const target = options.getUser('target');

        const clearEmbed = new EmbedBuilder()

        if (amount > 100) {
            clearEmbed.setColor(0xff0000)
            clearEmbed.setDescription(`Sorry, it's impossible to delete more than 100 messages.`);
            interaction.reply({ embeds: [clearEmbed]});
            return;
        }

        const messages = await channel.messages.fetch({
            limit: amount + 1,
        })

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
                clearEmbed.setColor(0x5fb041)
                clearEmbed.setDescription(`Successfully deleted ${messages.size} messages from ${target}.`);
                interaction.reply({ embeds: [clearEmbed]});
            });
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                clearEmbed.setColor(0x5fb041)
                clearEmbed.setDescription(`Successfully deleted ${messages.size} messages from the channel.`);
                interaction.reply({ embeds: [clearEmbed]});
            })
        }
    }
}