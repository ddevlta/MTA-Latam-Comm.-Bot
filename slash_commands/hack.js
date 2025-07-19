const { SlashCommandBuilder } = require('discord.js');
module.exports = {
data: new SlashCommandBuilder()
.setName('hack')
.setDescription('Simula hackear a un usuario. 👨‍💻')
.addUserOption(option =>
option.setName('usuario')
.setDescription('El usuario a hackear')
.setRequired(true)),
async execute(interaction) {
const usuario = interaction.options.getUser('usuario');
const emails = ['gmail.com', 'outlook.com', 'yahoo.com', 'protonmail.com'];
const ip = `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
const correo = `${usuario.username}${Math.floor(Math.random() * 1000)}@${emails[Math.floor(Math.random() * emails.length)]}`;
const contraseña = Math.random().toString(36).slice(-10);

await interaction.reply(`🔍 **Iniciando hackeo a ${usuario.username}...**`);
setTimeout(() => {
    interaction.channel.send(`🕵️ **Obteniendo IP...**\n📡 IP encontrada: \`${ip}\``);
}, 3000);
setTimeout(() => {
    interaction.channel.send(`📂 **Descifrando correos electrónicos...**\n📧 Correo: \`${correo}\``);
}, 6000);
setTimeout(() => {
    interaction.channel.send(`🔑 **Descifrando contraseña...**\n🔓 Contraseña encontrada: \`${contraseña}\``);
}, 9000);
setTimeout(() => {
    interaction.channel.send(`💰 **Accediendo a cuentas bancarias...**\n❌ **ERROR: Firewall detectado.**`);
}, 12000);
setTimeout(() => {
    interaction.channel.send(`✅ **Hackeo completado. Enviando datos al servidor...**\n📤 **Información filtrada con éxito.**`);
}, 15000);
    }
};
