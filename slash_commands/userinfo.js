const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
.setName('userinfo')
.setDescription('Muestra la información de un usuario')
.addUserOption(option => option.setName('usuario').setDescription('El usuario del cual obtener la información').setRequired(false)),

  async execute(interaction) {
const user = interaction.options.getUser('usuario') || interaction.user;
const member = await interaction.guild.members.fetch(user.id);
const joinDate = member.joinedAt.toLocaleString('es-ES');
const createDate = user.createdAt.toLocaleString('es-ES');
const joinTime = Math.floor((Date.now() - member.joinedTimestamp) / 3600000); 
const createTime = Math.floor((Date.now() - user.createdTimestamp) / 3600000); 
const roles = member.roles.cache.filter(role => role.id !== interaction.guild.id).map(role => `<@&${role.id}>`).join(', ') || 'Ninguno';
const hasBoost = member.premiumSince ? 'Sí' : 'No';
const userInfo = {
  username: user.tag,
  userID: user.id,
  joined: joinDate,
  created: createDate,
  joinTime: joinTime,
  createTime: createTime,
  serverBoost: hasBoost,
  roles: roles,
  avatar: user.displayAvatarURL({ dynamic: true, size: 2048 }),
};

const userInfoMessage = `
**Usuario:** ${userInfo.username}

**ID:** ${userInfo.userID}

**Cuenta creada:** ${userInfo.created} (hace ${userInfo.createTime} horas)

**Fecha de ingreso:** ${userInfo.joined} (hace ${userInfo.joinTime} horas)

**Server Boost:** ${userInfo.serverBoost}

**Roles (${roles.split(', ').length}):** ${roles}
`;
return interaction.reply({
  embeds: [{
color: 963e00,
title: `${userInfo.username} - Información de Usuario`,
description: userInfoMessage,
thumbnail: {
  url: userInfo.avatar,
},
footer: {
  text: `Solicitado por ${interaction.user.username}`,
},
  }],
});
  },
};
