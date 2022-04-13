package com.tacs.backend.service

import com.tacs.backend.request.Color
import com.tacs.backend.request.Letter
import com.tacs.backend.request.Try
import org.springframework.stereotype.Component

@Component
class FindWordResolver {
    fun findPossibleWords(tries: List<Try>, initialPossibleWords: List<String>): List<String> {

        //TODO: If we have more than one try, should we filter one by one?
        val lettersByColour = tries.first().letters.mapIndexed { index, letter ->
            index to letter
        }.groupBy { it.second.color }

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
        return possibleWords


//        lettersByColour[LetterColor.GRAY]?.forEach { (_, letter) ->
//            possibleWords = possibleWords.filter { possibleWord ->
//                !possibleWord.contains(letter.letter)
//            }
//        }
//        lettersByColour[LetterColor.GREEN]?.forEach { (index, letter) ->
//            possibleWords = possibleWords.filter { possibleWord ->
//                possibleWord[index] == letter.letter.first()
//            }
//        }
//        lettersByColour[LetterColor.YELLOW]?.forEach { (index, letter) ->
//            possibleWords = possibleWords.filter { possibleWord ->
//                possibleWord[index] != letter.letter.first() && possibleWord.contains(letter.letter)
//            }
//        }
//        return possibleWords
    }
}