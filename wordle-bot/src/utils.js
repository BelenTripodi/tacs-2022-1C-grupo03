const LIMIT = 2000 // limite del tamaño de respuesta de un mensaje de Discord

const secretReply = async (interaction, msg) => {
    try {
        await interaction.reply({
            content: 'uwu...',
            ephemeral: true,
        })

        let str = ''
        let lines = msg.split('\n')
        for (let i = 0; i < lines.length; i++) {
            /**
             * 1 - Transformo al mensaje en un array de lineas
             * 2 - itero sobre cada linea y voy concatenandolas
             * 3 - Si el str con la linea nueva supera el limite, mando el mensaje y reseteo str
             * 4 - repito hasta que me quede sin lineas
             */
            if (str.length + lines[i].length <= LIMIT) {
                str += lines[i] + '\n'
            } else {
                await interaction.followUp({
                    content: str,
                    ephemeral: true,
                }) // envio el msj sin la linea nueva y reseteo el str
                str = lines[i] + '\n'
            }
        }

        if (str) {
            await interaction.followUp({
                content: str,
                ephemeral: true,
            })
        }
    } catch (error) {
        console.log(
            'Error replying. Message size :',
            msg.length,
            '. Error: ',
            error
        )
    }
}

const buildChampionshipsString = (championships) => {
    if (!championships.length) return 'No championships found'

    let str = ``
    for (let i = 0; i < championships.length; i++) {
        const elem = championships[i]
        const startDate = new Date(elem.startDate)
        const finishDate = new Date(elem.finishDate)

        const newStr = `
            ------
            ID: ${elem.idChampionship}
            Name: ${elem.name}
            Languages: ${elem.languages.toString()}
            Start date: ${startDate.getDate()}/${
            startDate.getMonth() + 1
        }/${startDate.getFullYear()}
            Finish date: ${finishDate.getDate()}/${
            finishDate.getMonth() + 1
        }/${finishDate.getFullYear()}`

        str += newStr + '\n'
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
