const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Send an embed verification which give a role')
        .addChannelOption(option => 
            option.setName('channel')
            .setDescription('Defines the verification channel.')
            .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
        async execute(interaction) {
            const channel = interaction.options.getChannel('channel');
            const verifyEmbed = new EmbedBuilder()
                .setTitle("Vérification")
                .setDescription("Click on the button below to access the different channels.")
                .setColor(0xFFFFFF)
                let sendChannel = channel.send({
                    embeds: [verifyEmbed],
                    components: [
                        new ActionRowBuilder().setComponents(
                            new ButtonBuilder()
                                .setCustomId('verify')
                                .setLabel('Verification')
                                .setStyle(ButtonStyle.Success)
                        )
                    ]
                });
                if (!sendChannel) {
                    return interaction.reply({content: "There seems to be an error, try again later.", ephemeral: true});
                } else {
                    return interaction.reply({content: "The verification channel has been defined.", ephemeral: true});
                }
        }
}