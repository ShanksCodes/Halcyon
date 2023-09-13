const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban') // Name Of Slash Command
        .setDescription('Bans a user') // Description Of Slash Command
        // Seletcting User To Ban
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('User you want to ban')
                .setRequired(true)
        )
        // Reason For Banning(Optional)
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('Reason for banning')
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers) // Permission User Should Have To Use Command
        .setDMPermission(false),

    async execute(interaction, client) {
        const user = interaction.options.getUser('target')
        const reason = interaction.options.getString('reason') ?? 'No reason provided'
        const member = await interaction.guild.members.fetch(user.id)

        const banEmbed = new EmbedBuilder()
        .setColor('Random')
        .setTitle('ban')
        .setDescription(`Banned ${user.username}\nReason: ${reason}`)
        
        await interaction.reply({ embeds: [banEmbed] })
        await member.ban({ reason: reason })
    }
}