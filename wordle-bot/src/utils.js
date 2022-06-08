const secretReply = async (interaction, msg) => {
    await interaction.reply({
        content: msg,
        ephemeral: true,
    })
}

const buildChampionshipsString = (championships) => {
    if (!championships.length) return 'No championships found'

    let str = ``
    for (let i = 0; i < championships.length; i++) {
        const elem = championships[i]
        const startDate = new Date(elem.startDate)
        const finishDate = new Date(elem.finishDate)

        const newStr = `
            ID: ${elem.idChampionship}
            Name: ${elem.name}
            Languages: ${elem.languages.toString()}
            Start date: ${startDate.getDate()}/${
            startDate.getMonth() + 1
        }/${startDate.getFullYear()}
            Finish date: ${finishDate.getDate()}/${
            finishDate.getMonth() + 1
        }/${finishDate.getFullYear()}
        `
        str += newStr
    }
    return str
}

const buildScoresString = (scores) => {
    let str = ''
    const sorted = scores.sort((a, b) => b.score - a.score)
    for (let i = 0; i < sorted.length; i++) {
        const elem = sorted[i]
        const newStr = `
            User: ${elem.user} - Score: ${elem.score}`
        str += newStr
    }
    return str
}

module.exports = {
    secretReply,
    buildChampionshipsString,
    buildScoresString,
}
