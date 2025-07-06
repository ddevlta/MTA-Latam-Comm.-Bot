const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Repite un mensaje en el canal actual')
        .addStringOption(option =>
            option.setName('mensaje')
                .setDescription('El mensaje a enviar')
                .setRequired(true)
        ),

    async execute(interaction) {
        const mensaje = interaction.options.getString('mensaje');
        const rolPermitido = '1333203261573824542'; // 
        if (!interaction.member.roles.cache.has(rolPermitido)) {
            return interaction.reply({ content: '❌ No tenés permiso para usar este comando.', ephemeral: true });
        }
        await interaction.deferReply({ ephemeral: true });
        await interaction.channel.send(mensaje);
        await interaction.deleteReply();
    }
};
