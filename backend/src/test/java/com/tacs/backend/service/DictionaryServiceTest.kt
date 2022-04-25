package com.tacs.backend.service

import com.fasterxml.jackson.module.kotlin.readValue
import com.tacs.backend.client.OxfordDictionariesClient
import com.tacs.backend.client.OxfordDictionariesResponse
import com.tacs.backend.request.Language
import com.tacs.backend.service.DictionaryService
import com.tacs.backend.utils.FileReader
import com.tacs.backend.utils.mapper
import io.kotest.core.spec.style.WordSpec
import io.kotest.matchers.shouldBe
import io.mockk.every
import io.mockk.mockk

class DictionaryServiceTest : WordSpec() {

    private val client = mockk<OxfordDictionariesClient>()
    private val service = DictionaryService(client)

    init {
        "DictionaryService" When {
            "getDefinition" should {
                "return correct response" {
                    val oxfordResponse = FileReader.read("jsonExamples/client/correctOxfordResponse.json")
                    every { client.getDefinition("casa", "es") } returns mapper.readValue(oxfordResponse)
                    service.getWordDefinition("casa", Language.SPANISH)
                }
            }
        }
    }
}
