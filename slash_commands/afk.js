const { SlashCommandBuilder } = require('discord.js');
const ms = require('ms');

const afkUsuarios = {};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('afk')
    .setDescription('Establece tu estado en Ausente (AFK)')
    .addStringOption(option =>
      option.setName('motivo')
        .setDescription('Motivo por el que estás ausente')
        .setRequired(false)
    ),  

  async execute(interaction) {
    const motivo = interaction.options.getString('motivo') || 'Motivo no especificado.'; 
    const usuario = interaction.user;

    const afkEmbedUser = {
      title: '**Estado AFK activado!**',
      description: `Tu estado AFK ha sido activado.\n **Motivo**: ${motivo}`,
      color: 0xFFFFFF,
      timestamp: new Date(),
      footer: {
        text: 'Avisaré a quien te etiquete.',
      },
    };

    afkUsuarios[usuario.id] = {
      motivo,
      timestamp: new Date(),
      regresado: false,
    };

    await interaction.reply({
      embeds: [afkEmbedUser],
      flags: 64,
    });

    interaction.client.on('messageCreate', (mensaje) => {
      if (mensaje.author.id === usuario.id && afkUsuarios[usuario.id]) {
        // Envía el mensaje de bienvenida
        if (!afkUsuarios[usuario.id]. regresado) {
        const bienvenidaEmbed = {
          title: 'Bienvenido de vuelta!',
          description: `¡Hola **${usuario.tag}**! Ya no estas mas AFK, no?`,
          color: 963e00,
          timestamp: new Date(),
        };
        mensaje.channel.send({ embeds: [bienvenidaEmbed] })
        .then((mensajeEmbed) => {

          setTimeout(() => mensajeEmbed.delete(), 30000);
        });

      afkUsuarios[usuario.id].regresado = true;
    }

        delete afkUsuarios[usuario.id];
      }

      const menciones = mensaje.mentions.users;
      if (menciones.has(usuario.id) && afkUsuarios[usuario.id]) {
 
        const afkEmbed = {
          title: 'Usuario Ausente (AFK)',
          description: `**${usuario.tag}** está AFK actualmente.`,
          color: 0xFFA500,
          fields: [
            {
              name: '**Motivo:**',
              value: afkUsuarios[usuario.id].motivo,
            },
          ],
          timestamp: new Date(),
        };
        mensaje.channel.send({ embeds: [afkEmbed] })
          .then((mensajeEmbed) => {
  
            setTimeout(() => mensajeEmbed.delete(), ms('30s'));
          });
      }
    });
  },
};