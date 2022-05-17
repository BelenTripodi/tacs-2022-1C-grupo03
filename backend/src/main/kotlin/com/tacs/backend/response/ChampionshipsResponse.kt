package com.tacs.backend.response

import com.tacs.backend.request.Language
import com.tacs.backend.request.VisibilityType
import java.util.*

data class CreateChampionshipsResponse(val id: Long, val name: String)

data class GetChampionshipsResponse(val championships: List<ChampionshipResponse>)
data class GetUserChampionship(val championship: ChampionshipResponse, val score: Long)

data class ChampionshipResponse(
    val idChampionship: Long,
    val name: String,
    val languages: List<Language>,
    val visibility: VisibilityType,
    val startDate: Date,
    val finishDate: Date,
    val idOwner: Long
)