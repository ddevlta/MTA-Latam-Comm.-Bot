const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emojis')
        .setDescription('📜 Muestra la lista de emojis del servidor.'),

    async execute(interaction) {
        const emojis = interaction.guild.emojis.cache.map(e => e.toString()).join(' ');

        if (!emojis) {
            return interaction.reply('❌ Este servidor no tiene emojis personalizados.');
        }

        await interaction.reply(`📜 **Lista de emojis:**\n${emojis}`);
    }
};
