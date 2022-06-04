package com.tacs.backend.service

import com.fasterxml.jackson.module.kotlin.readValue
import com.tacs.backend.client.OxfordDictionariesClient
import com.tacs.backend.request.Language
import com.tacs.backend.utils.asyncFileRead
import com.tacs.backend.utils.mapper
import io.kotest.core.spec.style.WordSpec
import io.kotest.matchers.shouldBe
import io.mockk.every
import io.mockk.mockk
import org.joda.time.DateTime
import java.time.DateTimeException

class DictionaryServiceTest : WordSpec() {

    private val client = mockk<OxfordDictionariesClient>()
    private val service = DictionaryService(client)

    init {
        "DictionaryService" When {
            "getDefinition" should {
                "return correct response" {
                    val oxfordResponse = asyncFileRead("jsonExamples/client/correctOxfordResponse.json")
                    every { client.getDefinition("casa", "es") } returns mapper.readValue(oxfordResponse)
                    service.getWordDefinition("casa", Language.SPANISH)
                }
            }
        }
    }
}
