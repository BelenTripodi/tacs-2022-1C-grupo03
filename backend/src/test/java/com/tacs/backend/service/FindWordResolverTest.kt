package com.tacs.backend.service

import com.tacs.backend.request.Colour
import com.tacs.backend.request.Letter
import com.tacs.backend.request.Try
import io.kotest.assertions.withClue
import io.kotest.core.spec.style.WordSpec
import io.kotest.matchers.booleans.shouldBeTrue
import io.kotest.matchers.collections.shouldContainExactly
import io.kotest.matchers.collections.shouldContainExactlyInAnyOrder
import io.kotest.matchers.shouldBe

class FindWordResolverTest: WordSpec() {
    private val findWordResolver = FindWordResolver()
    private val initialPossibleWords = listOf(
        "ABEJA","ABETO","SABLE","LIBRO","LICEO","ARCOS","CASAR","CASCO","CURSO",
        "HURTO", "CURVO", "ENERO", "TORSO","TERCO", "TERMO", "TERSO",
    )
    init {
        "findWordResolver" When {
            "tries is empty" should {
                "return same initialPossibleWords" {
                    findWordResolver.findPossibleWords(emptyList(), initialPossibleWords) shouldContainExactly  initialPossibleWords
                }
            }
            "tries with GREEN letter" should {
                "respect letter position of possible words" {
                    val tries = listOf( Try(letters = listOf(
                        Letter("R", Colour.YELLOW),
                        Letter("A", Colour.GRAY),
                        Letter("D", Colour.GRAY),
                        Letter("I", Colour.GRAY),
                        Letter("O", Colour.GREEN),
                    ))
                    )
                    val result = findWordResolver.findPossibleWords(tries, initialPossibleWords)
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
                    val result = findWordResolver.findPossibleWords(tries, initialPossibleWords)
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