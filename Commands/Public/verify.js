const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Définit le salon de vérification.')
        .addChannelOption(option => 
            option.setName('channel')
            .setDescription('Envoit un embed de verification')
            .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
        async execute(interaction) {
            const channel = interaction.options.getChannel('channel');
            const verifyEmbed = new EmbedBuilder()
                .setTitle("Vérification")
                .setDescription("Cliquez sur le bouton ci-dessous pour accéder aux diffèrents salons.")
                .setColor(0xFFFFFF)
                let sendChannel = channel.send({
                    embeds: [verifyEmbed],
                    components: [
                        new ActionRowBuilder().setComponents(
                            new ButtonBuilder()
                                .setCustomId('verify')
                                .setLabel('Vérification')
                                .setStyle(ButtonStyle.Success)
                        )
                    ]
                });
                if (!sendChannel) {
                    return interaction.reply({content: "Il semble qu'il y a une erreur, Essaie plus tard.", ephemeral: true});
                } else {
                    return interaction.reply({content: "Le salon de vérification a bien été définit.", ephemeral: true});
                }
        }
}