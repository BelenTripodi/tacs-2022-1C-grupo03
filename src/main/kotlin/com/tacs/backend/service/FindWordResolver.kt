package com.tacs.backend.service

import com.tacs.backend.request.Color
import com.tacs.backend.request.Letter
import com.tacs.backend.request.Try
import org.springframework.stereotype.Component

@Component
class FindWordResolver {
    fun findPossibleWords(tries: List<Try>, tryIndex: Int, initialPossibleWords: List<String>): List<String> {

        if (tries.size == tryIndex) {
            return initialPossibleWords
        }

        val lettersByColour = tries.getOrNull(tryIndex)?.letters?.mapIndexed { index, letter ->
            index to letter
        }?.groupBy { it.second.color } ?: emptyMap()

        val filteringByColour = mapOf(
                Color.GRAY to { possibleWord:String, letter: Letter, _: Int -> !possibleWord.contains(letter.letter) },
                Color.GREEN to { possibleWord:String, letter: Letter, index: Int -> possibleWord[index] == letter.letter.first() },
                Color.YELLOW to { possibleWord:String, letter: Letter, index: Int -> possibleWord[index] != letter.letter.first() && possibleWord.contains(letter.letter) },
        )
        var possibleWords = initialPossibleWords
        filteringByColour.forEach { (letterColour, predicateToColour) ->
            lettersByColour[letterColour]?.forEach { (index, letter) ->
                possibleWords = possibleWords.filter { possibleWord ->
                    predicateToColour(possibleWord, letter, index)
                }
            }
        }
        return findPossibleWords(tries, tryIndex + 1, possibleWords)
    }
}