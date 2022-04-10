package com.example.demo.request

import org.joda.time.DateTime

data class ChampionshipRequest(val name: String, val languages: List<String>, val visibility: VisibilityType, val startDate: DateTime, val finishDate: DateTime)
data class HelpRequest(val letters: List<Letter>, val language: String)
data class Letter(val letter: String, val color: LetterColor)
enum class LetterColor {
    YELLOW, GRAY, GREEN
}
enum class VisibilityType {
    PUBLIC, PRIVATE
}