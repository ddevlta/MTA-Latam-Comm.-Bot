const Discord = require("discord.js");

module.exports = {
    data: new Discord.SlashCommandBuilder()
    .setName ("random")
    .setDescription ("Genera un numero random del 1 al 100."),
    execute: async (interaction) => {
const randomNum = Math.floor(Math.random() * 100)

// respuesta 
interaction
.reply(`Tu numero random es: ${randomNum}`)
.catch(console.error); 

},

};