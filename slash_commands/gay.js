const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
data: new SlashCommandBuilder()
.setName('gay')
.setDescription('Calcula el porcentaje de cuánto eres de gay')
.addUserOption(option =>
option.setName('usuario')
.setDescription('Elige un usuario para ver cuánto porcentaje tiene de gay')
.setRequired(false)
),
async execute(interaction) {
const usuario = interaction.options.getUser('usuario') || interaction.user;
const porcentajes = ['5%', '10%', '15%', '20%', '25%', '30%', '35%', '40%', '45%', '50%', '55%', '60%', '65%', '70%', '75%', '80%', '85%', '90%', '95%', '100%'];
const porcentajeGey = porcentajes[Math.floor(Math.random() * porcentajes.length)];
const embed = new EmbedBuilder()
.setColor('#FF69B4') 
.setTitle('🌈 ¿Qué tan gay eres? 🌈')
.setThumbnail('https://media.tenor.com/images/3b1b4f6a447c8b10a5270c7b29b9e75f/tenor.gif') 
.addFields(
{ name: 'Usuario:', value: `${usuario}`, inline: true },
{ name: 'Porcentaje de Gay:', value: `${porcentajeGey}`, inline: true }
)
.setFooter({ text: 'Sos un putito, trolaso, homosexual barbaro eh, te re cabe la vergota doblada en la colita!!!' });
await interaction.reply({ embeds: [embed], ephemeral: false });
},
};
