const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nickname')
        .setDescription('Cambia el apodo de un usuario.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('El usuario al que quieres cambiar el apodo.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('nuevo_nombre')
                .setDescription('El nuevo apodo del usuario.')
                .setRequired(true)),

    async execute(interaction) {
        const usuario = interaction.options.getMember('usuario');
        const nuevoNombre = interaction.options.getString('nuevo_nombre');

        if (!usuario) {
            return interaction.reply('❌ No pude encontrar a ese usuario.');
        }

        try {
            await usuario.setNickname(nuevoNombre);
            await interaction.reply(`✅ **${usuario.user.username}** ahora se llama **${nuevoNombre}**.`);
        } catch (error) {
            console.error(error);
            await interaction.reply('❌ No puedo cambiar el apodo de este usuario.');
        }
    }
};
