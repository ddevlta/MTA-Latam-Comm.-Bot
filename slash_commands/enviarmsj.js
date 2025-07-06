const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

const ROL_AUTORIZADO = '1325972490723266671';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('enviarmsj')
    .setDescription('Envía un mensaje por DM a todos los miembros del servidor')
    .addStringOption(option =>
      option.setName('mensaje')
        .setDescription('El mensaje que querés enviar')
        .setRequired(true)
    ),

  async execute(interaction) {
    const rolUsuario = interaction.member.roles.cache.has(ROL_AUTORIZADO);

    if (!rolUsuario) {
      return interaction.reply({ content: 'No tenés permiso para usar este comando, jajaja.', ephemeral: true });
    }

    const mensaje = interaction.options.getString('mensaje');
    const miembros = await interaction.guild.members.fetch();

    await interaction.reply({ content: `Enviando mensajes a ${miembros.size} miembros...`, ephemeral: true });

    let enviados = 0;
    let fallidos = 0;

    for (const [id, miembro] of miembros) {
      if (miembro.user.bot) continue;

      try {
        await miembro.send(mensaje);
        enviados++;
      } catch (error) {
        console.log(`No pude enviarle un DM a ${miembro.user.tag}`);
        fallidos++;
      }
    }

    return interaction.followUp({
      content: `Mensaje enviado a ${enviados} miembros.\n Fallaron ${fallidos} envíos.`,
      ephemeral: true
    });
  }
};
