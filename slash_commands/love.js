const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('love')
        .setDescription('Calcula el porcentaje de amor entre dos personas. 💖')
        .addUserOption(option =>
            option.setName('usuario1')
                .setDescription('Primer usuario')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('usuario2')
                .setDescription('Segundo usuario')
                .setRequired(true)),

    async execute(interaction) {
        const usuario1 = interaction.options.getUser('usuario1');
        const usuario2 = interaction.options.getUser('usuario2');
        if (usuario1.id === usuario2.id) {
            return interaction.reply({ content: '💔 No podes medir el amor con vos mismo. Busca a alguien especial. 😉', ephemeral: true });
        }
        const porcentaje = Math.floor(Math.random() * 101);

        let mensaje;
        if (porcentaje < 30) {
            mensaje = '💔 No hay mucha química... 😢';
        } else if (porcentaje < 60) {
            mensaje = '💛 Podría funcionar, pero hay que trabajar en ello. 🤔';
        } else if (porcentaje < 90) {
            mensaje = '❤️ ¡Buena compatibilidad! Esto podría ser amor. 💘';
        } else {
            mensaje = '💖 ¡Son el uno para el otro! Destinados a estar juntos. 💍✨';

        }


        interaction.reply(`💞 **${usuario1.username}** y **${usuario2.username}** tienen un **${porcentaje}%** de amor. ${mensaje}`);
    }
};
