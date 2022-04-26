package com.tacs.backend.request

data class HelpRequest(val tries: List<Try>, val language: Language)
data class Try(val letters: List<Letter>)
data class Letter(val letter: String, val colour: Colour)
enum class Colour {
    YELLOW, GRAY, GREEN
}