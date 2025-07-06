const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Aisla temporalmente a un usuario")
    .addUserOption(option => option.setName("member").setDescription("Usuario al que vas a aislar").setRequired(true))
    .addStringOption(option => option.setName("duracion").setDescription("La duracion del aislamiento").addChoices(
        { name: '60 Segundos', value: '60' },
        { name: '2 Minutos', value: '120' },
        { name: '5 Minutos', value: '300' },
        { name: '10 Minutos', value: '600' },
        { name: '15 Minutos', value: '900' },
        { name: '20 Minutos', value: '1200' },
        { name: '30 Minutos', value: '1800' },
        { name: '45 Minutos', value: '2700' },
        { name: '1 Hora', value: '3600' },
        { name: '2 Horas', value: '7200' },
        { name: '3 Horas', value: '10800' },
        { name: '5 Horas', value: '18000' },
        { name: '10 Horas', value: '36000' },
        { name: '1 Dia', value: '86400' },
        { name: '2 Dias', value: '172800' },
        { name: '3 Dias', value: '259200' },
        { name: '5 Dias', value: '432000' },
        { name: 'Una Semana', value: '604800' },
    ))
    .addStringOption(option => option.setName("razon").setDescription("Razon para aislar al usuario")),

    async execute(interaction) {

        await interaction.deferReply({ ephemeral: false });

        const timeUser = interaction.options.getUser("member");
        const timeMember = await interaction.guild.members.fetch(timeUser.id);
        const duration = interaction.options.getString("duracion");
        const reason = interaction.options.getString("razon") || 'Ninguna razón dada';

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) 
            return await interaction.editReply({ content: "❌ Que haces virgen? No podes usar ese comando" });

        if (!timeMember) 
            return await interaction.editReply({ content: "❌ El usuario ya no está en el servidor." });

        if (!timeMember.kickable) 
            return await interaction.editReply({ content: "❌ No puedo mutear a este usuario porque tiene un rol superior al mío." });

        if (interaction.member.id === timeMember.id) 
            return await interaction.editReply({ content: "❌ No podes mutearte a vos mismo, virgo." });

        if (timeMember.permissions.has(PermissionsBitField.Flags.Administrator)) 
            return await interaction.editReply({ content: "❌ No puedo mutear a un administrador." });

        try {
            await timeMember.timeout(duration * 1000, reason);

            const embed = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`✅ **${timeUser.tag}** fue muteado durante **${duration / 60} minuto(s)**.\n📝 Razón: ${reason}`);

            const dmEmbed = new EmbedBuilder()
                .setColor("#963e00")
                .setDescription(`⚠️ Te mutearon en **${interaction.guild.name}, comportate.**.\n📝 Razón: ${reason}`);


            await timeMember.send({ embeds: [dmEmbed] }).catch(() => {});

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            await interaction.editReply({ content: "❌ Hubo un error al intentar mutear a este usuario." });
            console.error(error);
        }
    }
};
