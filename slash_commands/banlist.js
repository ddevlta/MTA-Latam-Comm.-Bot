const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banlist')
        .setDescription('Muestra una lista de los usuarios baneados'),

    async execute(interaction) {
        try {

            const banList = await interaction.guild.bans.fetch();

            if (banList.size === 0) {
                return interaction.reply({ content: 'No hay usuarios baneados en este servidor.', ephemeral: true });
            }

            console.log('Lista de baneos:', banList);

            const banInfo = banList.map(ban => {
                if (!ban.user) {
                    console.log('Error: El ban no tiene un usuario', ban);
                    return 'Error en el ban';
                }
                return `${ban.user.tag} **ID** (${ban.user.id})`;
            }).join('\n');

            const embed = new EmbedBuilder() 
                .setColor("#963e00")
                .setTitle('> Lista de usuarios baneados')
                .setDescription("**Aca  esta la lista de los autistas que estan baneados de la comunidad.** __**Lista**__:")
                .setThumbnail(`${interaction.client.user.displayAvatarURL()}`)
                .addFields({ name: 'Usuarios baneados', value: banInfo })
                .setFooter({ text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error al obtener la lista de baneos:', error);
            await interaction.reply({ content: 'Hubo un error al intentar obtener la lista de baneos.', ephemeral: true });
        }
    },
};
