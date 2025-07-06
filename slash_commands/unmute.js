const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
module.exports = {

     name: 'unmute',
     data: new SlashCommandBuilder()
         .setName('unmute')
         .setDescription('Unmute a user from the server')
         .addUserOption(option =>
             option.setName('user')
                 .setDescription('Choose the user you want to unmute')
                 .setRequired(true)
         )
         .addStringOption(option =>
             option.setName('reason')
                 .setDescription('Reason for muting')
                 .setRequired(false)
         ),
     /**
      *
      * @param { ChatInputCommandInteraction } interaction
      */
     async execute(interaction, client) {
         const user = interaction.options.getUser("user");
         const timeMember = await interaction.guild.members.fetch(user.id).catch(console.error);
         const { guild } = interaction;
         if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
             const embed = new EmbedBuilder()
                 .setColor("#963e00")
                 .setDescription("❌ | No tenes permisos suficientes virgooo!!!")
             return await interaction.reply({ embeds: [embed], ephemeral: true }).then(inter => {
                 setTimeout(() => inter.interaction.deleteReply(), 8 * 1000);
             })
         }
         if (!timeMember.kickable) return interaction.reply({ content: "No podes desmutear a alguien con un rol mas alto que vos", ephemeral: true }).then(inter => {
             setTimeout(() => inter.interaction.deleteReply(), 8 * 1000);
         });
         if (!timeMember.communicationDisabledUntilTimestamp) return interaction.reply({ content: "No puedo desmutear a un usuario desmuteado", ephemeral: true }).then(inter => {
             setTimeout(() => inter.interaction.deleteReply(), 8 * 1000);
         })
         if (interaction.member.id === timeMember.id) return interaction.reply({ content: "No te podes desmutear a vos mismo, fracasado", ephemeral: true }).then(inter => {
             setTimeout(() => inter.interaction.deleteReply(), 8 * 1000);
         })
         if (timeMember.permissions.has(PermissionFlagsBits.Administrator)) return interaction.reply({ content: "You cannot unmute staff members or people with administrator permission!", ephemeral: true }).then( inter => {
             setTimeout(() => inter.interaction.deleteReply(), 8 * 1000);
         })
         let reason = interaction.options.getString("reason");
         if (!reason) reason = "No se especifico una razon.";
         await timeMember.timeout(null, reason).catch(console.error);
         const embedKick = new EmbedBuilder()
             .setTitle('Usuario desmuteado')
             .setDescription(`**${user} ya esta desmuteado**`)
             .setFields(
                 { name: 'Razon:', value: `\`\`\`yaml\n${reason}\`\`\`` },
                 { name: 'Usuario:', value: `${user}`, inline: true },
                 { name: 'Staff:', value: `${interaction.user}`, inline: true }
             )
             .setThumbnail(`${user.displayAvatarURL()}`)
             .setColor("#963e00");
         interaction.reply({ embeds: [embedKick] });
     },
};