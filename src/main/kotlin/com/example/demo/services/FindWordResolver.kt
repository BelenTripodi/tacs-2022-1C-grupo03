package com.example.demo.services

import com.example.demo.request.Letter
import com.example.demo.request.LetterColor
import org.springframework.stereotype.Component

@Component
class FindWordResolver {
    fun findPossibleWords(letters: List<Letter>, initialPossibleWords: List<String>): List<String> {

        val lettersByColour = letters.mapIndexed { index, letter ->
            index to letter
        }.groupBy { it.second.color }

        val filteringByColour = mapOf(
                LetterColor.GRAY to { possibleWord:String, letter: Letter, _: Int -> !possibleWord.contains(letter.letter) },
                LetterColor.GREEN to { possibleWord:String, letter: Letter, index: Int -> possibleWord[index] == letter.letter.first() },
                LetterColor.YELLOW to { possibleWord:String, letter: Letter, index: Int -> possibleWord[index] != letter.letter.first() && possibleWord.contains(letter.letter) },
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