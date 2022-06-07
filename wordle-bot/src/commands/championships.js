const { SlashCommandBuilder } = require('@discordjs/builders')
const { getAll } = require('../championships/getAll')
const { getMyChampionships } = require('../championships/getMyChampionships')
const { create } = require('../championships/create')
const { getChampionshipById } = require('../championships/getChampionshipById')
const { addUser } = require('../championships/addUser')
const { join } = require('../championships/join')

const subcommandToFunction = {
    all: getAll,
    mychampionships: getMyChampionships,
    create: create,
    byid: getChampionshipById,
    adduser: addUser,
    join: join,
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
                .setName('mychampionships')
                .setDescription(
                    'Consulta los torneos activos mios, publicos o privados, junto con los que creé'
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
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('join')
                .setDescription('Te une a un torneo en especifico')
                .addStringOption((option) =>
                    option
                        .setName('id')
                        .setDescription('Id del torneo')
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('adduser')
                .setDescription(
                    'Agrega a un usuario a un torneo, siempre y cuando seas el admin de ese torneo'
                )
                .addStringOption((option) =>
                    option
                        .setName('username')
                        .setDescription('Username del usuario a agregar')
                        .setRequired(true)
                )
                .addStringOption((option) =>
                    option
                        .setName('championshipid')
                        .setDescription('Id del torneo')
                        .setRequired(true)
                )
        ),
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand()
        await subcommandToFunction[subcommand](interaction)
    },
}
