package com.tacs.backend.service

import com.tacs.backend.request.*
import com.tacs.backend.utils.HelperRepository
import io.kotest.assertions.withClue
import io.kotest.core.spec.style.WordSpec
import io.kotest.matchers.booleans.shouldBeTrue
import io.kotest.matchers.collections.shouldContainExactly
import io.kotest.matchers.collections.shouldContainExactlyInAnyOrder
import io.kotest.matchers.shouldBe
import io.mockk.every
import io.mockk.mockk

class FindWordResolverTest: WordSpec() {
    private val helperRepository = mockk<HelperRepository>()
    private val findWordResolver = FindWordResolver(helperRepository)
    private val initialPossibleWords = listOf(
        "ABEJA","ABETO","SABLE","LIBRO","LICEO","ARCOS","CASAR","CASCO","CURSO",
        "HURTO", "CURVO", "ENERO", "TORSO","TERCO", "TERMO", "TERSO",
    )
    init {
        "findWordResolver" When {
            every { helperRepository.getAllWordsByLanguage(Language.SPANISH.name) } returns initialPossibleWords
            "tries is empty" should {
                val helpRequest = HelpRequest(emptyList(), Language.SPANISH)
                "return same initialPossibleWords" {
                    findWordResolver.findPossibleWords(helpRequest) shouldContainExactly  initialPossibleWords
                }
            }
            "tries with GREEN letter" should {
                "respect letter position of possible words" {
                    val tries = listOf( Try(letters = listOf(
                        Letter("r", Colour.YELLOW),
                        Letter("a", Colour.GRAY),
                        Letter("D", Colour.GRAY),
                        Letter("i", Colour.GRAY),
                        Letter("O", Colour.GREEN),
                    ))
                    )
                    val helpRequest = HelpRequest(tries, Language.SPANISH)
                    val result = findWordResolver.findPossibleWords(helpRequest)
                    result shouldContainExactlyInAnyOrder   listOf("CURSO",
                        "HURTO", "CURVO", "ENERO", "TORSO","TERCO", "TERMO", "TERSO")
                    result.forEach {
                        it.last() shouldBe 'O'
                    }
                }
            }
            "more than one try" should {
                "filter by colours as expected" {
                    val tries = listOf( Try(letters = listOf(
                        Letter("R", Colour.YELLOW),
                        Letter("A", Colour.GRAY),
                        Letter("D", Colour.GRAY),
                        Letter("I", Colour.GRAY),
                        Letter("O", Colour.GREEN),
                    )), Try(letters = listOf(
                        Letter("H", Colour.GRAY),
                        Letter("U", Colour.GRAY),
                        Letter("R", Colour.GREEN),
                        Letter("T", Colour.YELLOW),
                        Letter("O", Colour.GREEN),
                    ))
                    )
                    val helpRequest = HelpRequest(tries, Language.SPANISH)
                    val result = findWordResolver.findPossibleWords(helpRequest)
                    withClue("filter gray letters"){
                        result.forEach { possibleWord ->
                            (possibleWord.all { !listOf('H','U','A','D','I').contains(it) }).shouldBeTrue()
                        }
                    }
                    withClue("green letters in same position"){
                        result.forEach { possibleWord ->
                            possibleWord[2] shouldBe 'R'
                            possibleWord[4] shouldBe 'O'
                        }
                    }
                    withClue("yellow letters should be included"){
                        result.forEach { possibleWord ->
                            (possibleWord.any { listOf('T').contains(it) }).shouldBeTrue()
                        }
                    }
                    result shouldContainExactlyInAnyOrder listOf("TORSO","TERCO", "TERMO", "TERSO")
                }
            }
        }
    }
}