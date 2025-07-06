const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Desbanea a un usuario")
        .addStringOption(option => 
            option.setName("id")
                .setDescription("El ID del usuario que queres desbanear")
                .setRequired(true))
        .addStringOption(option => 
            option.setName("reason")
                .setDescription("El motivo del desbaneo al usuario.")
                .setRequired(false)),

    async execute(interaction, client) {
        const userID = interaction.options.getString("id"); // Cambié getUser a getString

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return await interaction.reply({ content: "No tienes permisos para desbanear.", ephemeral: true });
        }

        let reason = interaction.options.getString("reason") || "Ninguna razón especificada";

        try {
            const bans = await interaction.guild.bans.fetch();
            
            if (!bans.has(userID)) {
                return await interaction.reply({ content: "El usuario no está baneado.", ephemeral: true });
            }

            await interaction.guild.bans.remove(userID, reason);

            const embed = new EmbedBuilder()
                .setColor("#963e00")
                .setDescription(`✅ <@${userID}> ha sido desbaneado.\n**Razón:** ${reason}`)
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error("Error al intentar desbanear:", error);
            await interaction.reply({ content: "Hubo un error al intentar desbanear al usuario.", ephemeral: true });
        }
    }
};
