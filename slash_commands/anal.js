const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');  

module.exports = {
  data: new SlashCommandBuilder()
.setName('anal')
.setDescription('Penetra de forma anal a un usuario')
.addUserOption(option =>
option.setName('usuario')
.setDescription('El usuario que será penetrado')
.setRequired(true)
),
  async execute(interaction) {
const usuarioEjecutante = interaction.user;
const usuarioSeleccionado = interaction.options.getUser('usuario');

const respuestas = [
`${usuarioEjecutante.username} penetra de forma violenta por el ano a ${usuarioSeleccionado.username}, y no para de gritar, el trolito de ${usuarioSeleccionado.username}`,
`${usuarioEjecutante.username} se lo re contra garcha fuertemente al puto de mierda de ${usuarioSeleccionado.username}`,
`${usuarioEjecutante.username} le mete toda la pija bien dura a ${usuarioSeleccionado.username}, y lo goza.`,
`${usuarioEjecutante.username} coge bien rico a la trola de ${usuarioSeleccionado.username}`,
`${usuarioSeleccionado.username} es violado por el recto anal y dedeado por ${usuarioEjecutante.username}`
];
const respuestaElegida = respuestas[Math.floor(Math.random() * respuestas.length)];
const embed = new EmbedBuilder()
.setColor('#963e00')
.setTitle(respuestaElegida)
.setFooter({ text: 'Que pedazo de cogida eh!' });
await interaction.reply({ embeds: [embed] });
  },
};
