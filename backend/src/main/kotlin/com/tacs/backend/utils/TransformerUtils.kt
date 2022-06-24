package com.tacs.backend.utils

import com.tacs.backend.entity.Championship
import com.tacs.backend.response.ChampionshipResponse

fun getChampionshipResponse(championship: Championship): ChampionshipResponse =
    ChampionshipResponse(
        championship.idChampionship,
        championship.name,
        championship.languages,
        championship.visibility,
        championship.startDate,
        championship.finishDate,
        championship.ownerUsername
    )

