const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
.setName('serverinfo')
.setDescription('Muestra la información importante sobre el servidor.'),
async execute(interaction) {
const guild = interaction.guild;
const user = interaction.user.id;
const name = guild.name;
const id = guild.id;
const owner = guild.ownerId;
const createdAt = guild.createdAt;
const memberCount = guild.memberCount.toString(); 
const guildIcon = guild.iconURL({ dynamic: true, size: 256 });
const embed = new EmbedBuilder()
.setColor("#963e00")
    .setTitle('Información de MTA Latam Community')
    .setThumbnail(guildIcon)
    .addFields(
{ name: 'Nombre:', value: name },
{ name: 'ID:', value: id },
{ name: 'Propietario:', value: `<@${owner}>` },
{ name: 'Fecha de Creación:', value: `<t:${Math.floor(createdAt.getTime() / 1000)}:R>` }, 
{ name: 'Cantidad de Miembros:', value: memberCount }
    )
    .setTimestamp()
    .setFooter({ text: `User ID: ${user}`});
await interaction.reply({ embeds: [embed] });
    },
};