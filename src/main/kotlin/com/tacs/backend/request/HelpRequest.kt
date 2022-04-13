package com.tacs.backend.request

data class HelpRequest(val tries: List<Try>, val language: String)
data class Try(val letters: List<Letter>)
data class Letter(val letter: String, val color: Color)
enum class Color {
    YELLOW, GRAY, GREEN
}