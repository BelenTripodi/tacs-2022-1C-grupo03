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
    scores = scores.sort()
    console.log(scores)
    for (let i = 0; i < scores.length; i++) {
        const elem = scores[i]
        const newStr = `
            User: ${elem.user} - Score: ${elem.score}`
        str += newStr
    }
    return str
}

function compareScores(a, b) {
    if (a.score > b.score) return 1
    if (b.score > a.score) return -1

    return 0
}

module.exports = {
    secretReply,
    buildChampionshipsString,
    buildScoresString,
}
