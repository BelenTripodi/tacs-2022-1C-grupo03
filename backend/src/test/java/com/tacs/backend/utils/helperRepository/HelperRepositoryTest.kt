package com.tacs.backend.utils.helperRepository

import com.tacs.backend.utils.HelperRepository
import io.kotest.core.spec.style.WordSpec
import io.kotest.matchers.collections.shouldContainExactlyInAnyOrder
import io.kotest.matchers.shouldBe

class HelperRepositoryTest: WordSpec() {
    private val helperRepository = HelperRepository("jsonExamples/utils/helperRepository/5letter-LANGUAGE.list")
    init {
        "helperRepository.getAllWordsByLanguage" When {
            "expected english" should {
                "return english word list"{
                    val result = helperRepository.getAllWordsByLanguage("ENGLISH")
                    result.size shouldBe 10
                    result shouldContainExactlyInAnyOrder listOf("AALII", "AARON", "ABACA",
                            "ABACK", "ABAFF", "ABAFT", "ABAMA", "ABASE", "ABASH", "ABATE")
                }
            }
            "expected spanish" should {
                "return spanish word list"{
                    val result = helperRepository.getAllWordsByLanguage("SPANISH")
                    result.size shouldBe 10
                    result shouldContainExactlyInAnyOrder listOf("ABADA", "ABAJO", "ABANO",
                        "ABATE", "ABEJA", "ABETE", "ABETO", "ABIAR", "ABISO", "ABITA")
                }
            }
        }
    }
}