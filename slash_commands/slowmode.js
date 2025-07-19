const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
data: new SlashCommandBuilder()
.setName('slowmode')
.setDescription('Configura el slowmode en un canal.')
.addIntegerOption(option =>
option.setName('segundos')
.setDescription('Cantidad de segundos entre cada mensaje (0 para desactivar)')
.setRequired(true))
.setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels), 
async execute(interaction) {
const segundos = interaction.options.getInteger('segundos');
const canal = interaction.channel;
if (segundos < 0 || segundos > 21600) { 
return interaction.reply({ content: 'El slowmode debe estar entre 0 y 21600 segundos.', ephemeral: true });
}
try {
await canal.setRateLimitPerUser(segundos);
interaction.reply(`✅ Slowmode establecido a **${segundos} segundos** en ${canal}.`);
} catch (error) {
console.error(error);
interaction.reply({ content: '❌ Hubo un error al configurar el slowmode.', ephemeral: true });
}
}
};
