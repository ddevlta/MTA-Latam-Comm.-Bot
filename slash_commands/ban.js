/// Credits thatduckjuan#0
const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Banea a un usuario del servidor")
        .addUserOption(option => option
            .setName("usuario")
            .setDescription("Usuario a banear"))
        .addStringOption(option => option
            .setName("id_usuario")
            .setDescription("La ID del usuario"))
        .addStringOption(option => option
            .setName("motivos")
            .setDescription("Motivos del baneo"))
        .setDMPermission(true),

    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return await interaction.reply({
                content: `No tenés permisos para banear.`,
                ephemeral: true
            });
        }

        const { options } = interaction;
        const userOption = options.getUser("usuario");
        const userIdOption = options.getString("id_usuario");
        const reason = options.getString("motivos") || "Sin razón proporcionada";

        let memberToBan;

        if (userOption) {
            memberToBan = userOption;
        } else if (userIdOption) {
            try {
                memberToBan = await interaction.client.users.fetch(userIdOption);
            } catch (error) {
                console.error("Error al obtener el usuario por ID:", error);
                return await interaction.reply({
                    content: "No se encontró al usuario con esa ID.",
                    ephemeral: true
                });
            }
        } else {
            return await interaction.reply({
                content: "Debes proporcionar un usuario o una ID para banear.",
                ephemeral: true
            });
        }

        if (memberToBan.id === interaction.user.id) {
            return await interaction.reply({
                content: "No puedes banearte a ti mismo.",
                ephemeral: true
            });
        }

        await interaction.deferReply();

        try {
            const guildMember = interaction.guild.members.cache.get(memberToBan.id);

            if (guildMember) {
                if (guildMember.roles.highest.position >= interaction.member.roles.highest.position) {
                    return await interaction.editReply({
                        content: `No puedes banear a ${guildMember.user} porque tiene un rol más alto o igual que el tuyo.`
                    });
                }

                await guildMember.ban({ reason });
            } else {
                await interaction.guild.members.ban(memberToBan.id, { reason });
            }

            // Embed de confirmación
            const embed = new EmbedBuilder()
                .setTitle("Usuario Baneado")
                .setDescription(`${memberToBan.tag} fue baneado del servidor.`)
                .setColor("#963e00")
                .setTimestamp()
                .addFields({ name: "Razón", value: reason });

            await interaction.channel.send({ embeds: [embed] }); 
            await interaction.deleteReply(); 

        } catch (error) {
            console.error("Error al intentar banear al usuario:", error);
            await interaction.editReply({
                content: "Hubo un error al intentar banear al usuario."
            });
        }
    }
};
