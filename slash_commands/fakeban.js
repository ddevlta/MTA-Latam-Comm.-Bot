const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fakeban')
        .setDescription('🔨 Simula banear a un usuario (broma).')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('El usuario a banear.')
                .setRequired(true)),

    async execute(interaction) {
        const usuario = interaction.options.getUser('usuario');

        const mensajes = [
            `**${usuario.username}** se fue bananeado del servidor por virgen. 🚫`,
        ];

        const mensaje = mensajes[Math.floor(Math.random() * mensajes.length)];

        await interaction.reply({ content: mensaje, ephemeral: false });
    }
};
