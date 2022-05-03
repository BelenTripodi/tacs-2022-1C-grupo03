package com.tacs.backend.response

import com.tacs.backend.request.Language
import com.tacs.backend.request.VisibilityType
import org.joda.time.DateTime

data class CreateChampionshipsResponse(val id: Long, val name: String)

data class GetChampionshipsResponse(val championships: List<ChampionshipResponse>)

data class ChampionshipResponse(
    val name: String,
    val languages: List<Language>,
    val visibility: VisibilityType,
    val startDate: DateTime,
    val finishDate: DateTime
)