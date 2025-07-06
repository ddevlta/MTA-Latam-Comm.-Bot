const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roles')
        .setDescription('Muestra todos los roles de tu servidor.'),
    
    async execute(interaction, client) {
        const guild = interaction.guild;

        const roles = guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        
        if (roles.length === 0) {
            return interaction.reply({ content: "No hay roles en este servidor.", ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setTitle(`${guild.name} - Roles`)
            .setDescription(`**Aquí están todos los roles de este servidor**`)
            .setColor("#963e00")
            .setTimestamp()
            .addFields({
                name: '🎭 Roles:',
                value: roles.length > 25 ? `${roles.slice(0, 25).join(', ')}...` : roles.join(', '),
            })
            .setFooter({ text: `Solicitado por ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });

        await interaction.reply({ embeds: [embed] });
    }
};
