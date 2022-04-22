package com.tacs.backend.client

import com.fasterxml.jackson.module.kotlin.readValue
import com.tacs.backend.utils.TacsObjectMapper
import io.kotest.core.spec.style.WordSpec
import io.kotest.matchers.shouldBe
import io.kotest.matchers.shouldNotBe
import org.junit.runner.RunWith
import org.mockito.ArgumentMatchers.any
import org.powermock.api.mockito.PowerMockito
import org.powermock.modules.junit4.PowerMockRunner
import java.io.InputStream
import java.net.HttpURLConnection
import java.net.URL

@RunWith(PowerMockRunner::class)
class OxfordDictionariesClientTest : WordSpec() {

    private val mapper = PowerMockito.mock(TacsObjectMapper::class.java)
    private val oxfordDictionariesClient =
        OxfordDictionariesClient("someAppId", "someAppKey", "https://od-api.oxforddictionaries.com/api/v2/words/", mapper)

    init {
        "oxfordClientTest" When {
            "getDefinition with a word and a language" should {
                val clientResponse = OxfordDictionariesResponse(
                    listOf(
                        OxfordResult(
                            "someId", listOf(
                                LexicalEntry(listOf(Entry(listOf(Sense(listOf("someDef"))))))
                            )
                        )
                    )
                )
                val u = PowerMockito.mock(URL::class.java)
                val url = "https://od-api.oxforddictionaries.com/api/v2/words/es?q=casa&fields=definitions"
                PowerMockito.whenNew(URL::class.java).withArguments(url).thenReturn(u)
                val huc: HttpURLConnection = PowerMockito.mock(HttpURLConnection::class.java)
                PowerMockito.`when`(u.openConnection()).thenReturn(huc)
                PowerMockito.`when`(huc.responseCode).thenReturn(200)
                PowerMockito.`when`(huc.inputStream).thenReturn(InputStream.nullInputStream())
                PowerMockito.`when`(mapper.mapper.readValue<OxfordDictionariesResponse>(any(InputStream::class.java))).thenReturn(clientResponse)

                "return correct response" {
                    val response = oxfordDictionariesClient.getDefinition("casa", "es")
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