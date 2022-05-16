const secretReply = async (interaction, msg) => {
    await interaction.reply({
        content: msg,
        ephemeral: true,
    })
}

module.exports = {
    secretReply,
}
