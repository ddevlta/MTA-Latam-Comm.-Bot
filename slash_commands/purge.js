const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Elimina un número específico de mensajes del canal')
        .addIntegerOption(option => 
            option.setName('cantidad')
                .setDescription('Número de mensajes a eliminar')
                .setRequired(true)
                .setMinValue(1) 
                .setMaxValue(150) 
        ),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return await interaction.reply({
                content: "No tenes permisos suficientes para usar este comando.",
                ephemeral: true
            });
        }

        const cantidad = interaction.options.getInteger('cantidad');
        if (cantidad > 100) {
            return await interaction.reply({
                content: "Solo podes borrar un máximo de 100 mensajes a la vez.",
                ephemeral: true
            });
        }
        try {
            const messages = await interaction.channel.messages.fetch({ limit: cantidad });
            await interaction.channel.bulkDelete(messages, true); 
            await interaction.reply({
                content: `${cantidad} mensajes han sido eliminados correctamente.`,
                ephemeral: true
            });
        } catch (error) {
            console.error('Error al intentar borrar los mensajes:', error);
            await interaction.reply({
                content: 'Hubo un error al intentar eliminar los mensajes. Por favor, intenta nuevamente.',
                ephemeral: true
            });
        }
    }
};
