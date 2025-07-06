// archivo index.js
const fs = require("fs");
const config = require ("./config.json");
const Discord = require("discord.js");
const { Client, Events, GatewayIntentBits, Partials } = require('discord.js');

const { error } = require("console");

// crear nuevo cliente de discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,      
    GatewayIntentBits.GuildMembers,     
    GatewayIntentBits.GuildMessages,      
    GatewayIntentBits.DirectMessages,     
    GatewayIntentBits.MessageContent     
  ],
  partials: [Partials.Channel] 
});



// cargar comandos
Client.commands = new Discord.Collection();
fs.readdirSync("./slash_commands").forEach((commandfile) => {
  const command = require(`./slash_commands/${commandfile}`);
  Client.commands.set(command.data.name, command);
});



client.on('messageCreate', message => {
  if (message.author.bot) return;
  if (message.content.toLowerCase() === 'qonda') {
    message.reply('Tu zanja redonda');
  }
});



client.on('messageCreate', (message) => {
  if (message.author.bot) return;
  if (message.content.toLowerCase() === 'buenas') {
      message.reply('Que onda makina, todo piola?');
  }
});


// registrar comandos
const REST = new Discord.REST().setToken(config.CLIENT_TOKEN);

(async () => {
  try { 
    await REST.put(
      Discord.Routes.applicationGuildCommands(config.clientId, config.guildId),
    { 
      body: Client.commands.map((cmd) => cmd.data.toJSON()),
    }
    );
    console.log(`Loaded ${Client.commands.size} slash command {/}`);
  } catch (error) {
    console.log("Error loading comands.", error);
  }
})();

// evento Ready
client.on('ready', async (ready) => {
  const estados = [
{
tipo: "Playing",
contenido: "MTA Latam Community",
opcionesestado: "on"
},

]

async function activarestado () {
  const estado = Math.floor(Math.random() * estados.length);

  try {
    await client.user.setPresence ({
      activities: [
      {
        name: estados [estado].contenido,
        type: estados[estado].tipo
      },
    ],
    status: estados[estado].opcionesestado
  });
  } catch (error) {
    console.error (error);
  }
  }

setInterval(activarestado, 10000)
console.log("Estado activado ATR");
console.log("MTA Latam Community Bot ONNNNNNN")
});



 // evento interaction create
 client.on('interactionCreate', async (interaction) => {
if(interaction.isButton()) {
  interaction.reply(`holaxd ${interaction.user}`)
} else if (interaction.isChatInputCommand())
{ const {commandName} = interaction;
const command = require(`./slash_commands/${commandName}`);
command.execute( interaction );
}
});




client.on('interactionCreate', async (interaction) => {
  if (interaction.isChatInputCommand()) return;
  try {
    const execute = requiere(`./interactions/${interaction.customId}`);
    execute(interaction);
  } catch (error) {
    console.log('[ERR] Int fallida')
  }
});

// respuesta a mensajes del bot
client.on(Events.MessageCreate, async (message) => {
  if(message.author.bot) return;
  if(!message.content.startsWith('!')) return;

  const args = message.content.slice(1).split(' ')[0]
    
  // text comand handler
try {
  const command = require(`./commands/${args}`);
  command.run(message);
  } catch (error) {
  console.log(`Ha ocurrido un error al utilizar el comando-${args}`, error.message);
  }
});

