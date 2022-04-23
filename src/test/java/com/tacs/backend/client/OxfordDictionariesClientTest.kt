package com.tacs.backend.client

import com.tacs.backend.utils.FileReader
import com.tacs.backend.utils.TacsObjectMapper
import io.kotest.core.spec.style.WordSpec
import io.kotest.matchers.shouldBe
import io.kotest.matchers.shouldNotBe
import io.mockk.every
import io.mockk.mockk
import io.mockk.spyk
import java.io.InputStream
import java.net.HttpURLConnection

class OxfordDictionariesClientTest : WordSpec() {
    private val mapper = TacsObjectMapper()
    private val oxfordDictionariesClient= spyk<OxfordDictionariesClient>(OxfordDictionariesClient("someAppId", "someAppKey", "https://od-api.oxforddictionaries.com/api/v2/words/", mapper))

    init {
        "oxfordClientTest" When {
            "getDefinition with a word and a language" should {
                val huc: HttpURLConnection = mockk(relaxed = true)
                val url = "https://od-api.oxforddictionaries.com/api/v2/words/es?q=definicion&fields=definitions"
                every { oxfordDictionariesClient.createConnection(url) } returns huc
                "return correct response" {
                    val oxfordResponse = FileReader.read("jsonExamples/client/correctOxfordResponse.json")
                    val inputStream: InputStream = oxfordResponse.byteInputStream()
                    every { huc.responseCode } returns 200
                    every { huc.inputStream } returns inputStream
                    every { huc.addRequestProperty(any(), any()) } returns Unit
                    val response = oxfordDictionariesClient.getDefinition("definicion", "es")
                    response.results shouldNotBe null
                    response.results!!.forEach { result ->
                        result.lexicalEntries!! shouldNotBe null
                        result.id shouldBe "someId"
                        result.lexicalEntries!!.forEach { lexicalEntry ->
                            lexicalEntry.entries!! shouldNotBe null
                            lexicalEntry.entries!!.forEach { entry ->
                                entry.senses!! shouldNotBe null
                                entry.senses!!.forEach { sense ->
                                    sense.definitions!! shouldNotBe null
                                    sense.definitions!!.forEach { definition ->
                                        definition shouldNotBe null
                                        definition shouldBe "someDef"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}