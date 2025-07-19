const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Muestra el avatar de un usuario o el tuyo si no mencionas a nadie.')
        .addUserOption(option => 
  option.setName('usuario')
.setDescription('El usuario cuyo avatar quieres ver')
.setRequired(false)),

    async execute(interaction) {
        try {
  const user = interaction.options.getUser('usuario') || interaction.user;
  const embed = new EmbedBuilder()
.setColor("#963e00")
.setTitle(`${user.tag}'s Avatar`)
.setImage(user.displayAvatarURL({ dynamic: true, size: 1024 })) 
.setFooter({ text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
.setTimestamp();
  await interaction.reply({ embeds: [embed] });
        } catch (error) {
  console.error('Error al ejecutar el comando /avatar:', error);
  await interaction.reply({ content: 'Hubo un problema al ejecutar el comando. Inténtalo de nuevo más tarde.', ephemeral: true });
        }
    },
};
