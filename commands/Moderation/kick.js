const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick') // Name Of Slash Command
        .setDescription('Kicks a user') // Description Of Slash Command
        // Seletcting User To Ban
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('User you want to kick')
                .setRequired(true)
        )
        // Reason For Kicking(Optional)
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('Reason for kicking')
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers) // Permission User Should Have To Use Command
        .setDMPermission(false),

    async execute(interaction, client) {
        const user = interaction.options.getUser('target')
        const reason = interaction.options.getString('reason') ?? 'No reason provided'
        const member = await interaction.guild.members.fetch(user.id)

        const kickEmbed = new EmbedBuilder()
        .setColor('Random')
        .setTitle('kick')
        .setDescription(`Kicked ${user.username}\nReason: ${reason}`)
        
        await interaction.reply({ embeds: [kickEmbed] })
        await member.kick({ reason: reason })
    }
}