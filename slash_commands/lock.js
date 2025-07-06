const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription('🔒 Bloquea el canal para que los miembros no puedan escribir.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        const canal = interaction.channel;

        try {

            await canal.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                SendMessages: false
            });

            await interaction.reply(`🔒 **Canal bloqueado con éxito.** Solo los administradores pueden escribir.`);
        } catch (error) {
            console.error(error);
            await interaction.reply(`❌ **Error al bloquear el canal.**`);
        }
    }
};
