package com.tacs.backend.service

import com.tacs.backend.request.Colour
import com.tacs.backend.request.HelpRequest
import com.tacs.backend.request.Letter
import com.tacs.backend.request.Try
import com.tacs.backend.utils.HelperRepository
import org.springframework.stereotype.Component

@Component
class FindWordResolver(private val helperRepository: HelperRepository) {

    fun findPossibleWords(helpRequest: HelpRequest): List<String> {
        val wordsRepository = helperRepository.getAllWordsByLanguage(helpRequest.language.name)
        return findWordsRecursively(helpRequest.tries, wordsRepository)
    }

    private fun findWordsRecursively(tries: List<Try>, initialPossibleWords: List<String>, tryIndex: Int = 0): List<String> {

        if (tries.size == tryIndex) {
            return initialPossibleWords
        }

        val lettersByColour = tries.getOrNull(tryIndex)?.letters?.mapIndexed { index, letter ->
            index to letter
        }?.groupBy { it.second.colour } ?: emptyMap()

        var possibleWords = initialPossibleWords
        FILTERING_BY_COLOUR.forEach { (letterColour, predicateToColour) ->
            lettersByColour[letterColour]?.forEach { (index, letter) ->
                possibleWords = possibleWords.filter { possibleWord ->
                    predicateToColour(possibleWord, letter, index)
                }
            }
        }
        return findWordsRecursively(tries, possibleWords, tryIndex + 1)
    }

    companion object {
        private val FILTERING_BY_COLOUR =  mapOf(
            Colour.GRAY to { possibleWord:String, letter: Letter, _: Int -> !possibleWord.contains(letter.letter.uppercase()) },
            Colour.GREEN to { possibleWord:String, letter: Letter, index: Int -> possibleWord[index] == letter.letter.uppercase().first() },
            Colour.YELLOW to { possibleWord:String, letter: Letter, index: Int -> possibleWord[index] != letter.letter.uppercase().first() && possibleWord.contains(letter.letter.uppercase()) },
        )
    }
}