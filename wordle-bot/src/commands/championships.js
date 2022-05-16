const { SlashCommandBuilder } = require('@discordjs/builders')
const { secretReply, buildChampionshipsString } = require('../utils')
const { getAll } = require('../championships/getAll')
const { getMyChampionships } = require('../championships/getMyChampionships')
const { create } = require('../championships/create')
const { getChampionshipById } = require('../championships/getChampionshipById')

const subcommandToFunction = {
    all: getAll,
    inscripted: getMyChampionships,
    create: create,
    byid: getChampionshipById,
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('championships')
        .setDescription(
            'Comando base para crear, obtener, unirse o consultar torneos'
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('all')
                .setDescription('Consulta todos los torneos publicos activos')
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('inscripted')
                .setDescription(
                    'Consulta los torneos activos mios, publicos o privados'
                )
                .addStringOption((option) =>
                    option
                        .setName('type')
                        .setDescription('Visibilidad del torneo')
                        .setRequired(true)
                        .addChoices(
                            { name: 'public', value: 'PUBLIC' },
                            { name: 'private', value: 'PRIVATE' }
                        )
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('create')
                .setDescription('Crea un torneo')
                .addStringOption((option) =>
                    option
                        .setName('name')
                        .setDescription('Nombre del torneo')
                        .setRequired(true)
                )
                .addStringOption((option) =>
                    option
                        .setName('type')
                        .setDescription('Visibilidad del torneo')
                        .setRequired(true)
                        .addChoices(
                            { name: 'public', value: 'PUBLIC' },
                            { name: 'private', value: 'PRIVATE' }
                        )
                )
                .addStringOption((option) =>
                    option
                        .setName('languages')
                        .setDescription('EN / ES / BOTH')
                        .setRequired(true)
                        .addChoices(
                            { name: 'spanish', value: 'SPANISH' },
                            { name: 'english', value: 'ENGLISH' },
                            { name: 'both', value: 'BOTH' }
                        )
                )
                .addStringOption((option) =>
                    option
                        .setName('start')
                        .setDescription('Fecha de comienzo xx/xx/xxxx')
                        .setRequired(true)
                )
                .addStringOption((option) =>
                    option
                        .setName('finish')
                        .setDescription('Fecha de finalizacion xx/xx/xxxx')
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('byid')
                .setDescription('Consulta un torneo en especifico')
                .addIntegerOption((option) =>
                    option
                        .setName('id')
                        .setDescription('Id del torneo')
                        .setRequired(true)
                )
        ),
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand()
        await subcommandToFunction[subcommand](interaction)
    },
}
