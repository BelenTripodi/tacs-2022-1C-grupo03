package com.tacs.backend.request

import org.joda.time.DateTime

data class CreateChampionshipRequest(val name: String, val languages: List<Language>, val visibility: VisibilityType, val startDate: DateTime, val finishDate: DateTime, val owner: String)
enum class VisibilityType {
    PUBLIC, PRIVATE
}
enum class Language(val type: String = "") {
    SPANISH("es"),
    ENGLISH("en-gb");

}

data class AddUserToChampionshipRequest(val username: String)