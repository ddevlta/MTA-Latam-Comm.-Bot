const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlock')
        .setDescription('Desbloquea el canal para que todos puedan escribir.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        const canal = interaction.channel;

        try {
            await canal.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                SendMessages: true
            });

            await interaction.reply(`🔓 **Canal desbloqueado.** Ahora todos pueden escribir.`);
        } catch (error) {
            console.error(error);
            await interaction.reply(`❌ **Error al desbloquear el canal.**`);
        }
    }
};
