package com.tacs.backend.client

import com.tacs.backend.exception.BadRequestException
import com.tacs.backend.exception.WordNotFoundException
import com.tacs.backend.utils.FileReader
import com.tacs.backend.utils.TacsObjectMapper
import io.kotest.assertions.throwables.shouldThrowExactly
import io.kotest.core.spec.style.WordSpec
import io.kotest.core.test.TestCase
import io.kotest.matchers.shouldBe
import io.kotest.matchers.shouldNotBe
import io.mockk.*
import java.io.InputStream
import java.net.HttpURLConnection
import java.net.MalformedURLException
import java.net.UnknownServiceException
import javax.naming.ServiceUnavailableException

class OxfordDictionariesClientTest : WordSpec() {
    private val mapper = TacsObjectMapper()
    private val urlOpener = mockk<URLOpener>()
    private val oxfordDictionariesClient= OxfordDictionariesClient("someAppId", "someAppKey", "someBaseURL", mapper, urlOpener)
    override suspend fun beforeTest(testCase: TestCase) {
        clearAllMocks()
    }

    init {
        "oxfordClient.getDefinition" When {
            "connection returns 200" should {
                "return correct response" {
                    val oxfordResponse = FileReader.read("jsonExamples/client/correctOxfordResponse.json")
                    val inputStream: InputStream = oxfordResponse.byteInputStream()
                    val huc: HttpURLConnection = mockk(relaxed = true)
                    every { urlOpener.createConnection(any(), any()) } returns huc
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
            "connection returns 400" should {
                "throw BadRequestException" {
                    val oxfordResponse = FileReader.read("jsonExamples/client/errorOxfordResponse.json")
                    val inputStream: InputStream = oxfordResponse.byteInputStream()
                    val huc: HttpURLConnection = mockk(relaxed = true)
                    every { urlOpener.createConnection(any(), any()) } returns huc
                    every { huc.addRequestProperty(any(), any()) } returns Unit
                    every { huc.responseCode } returns 400
                    every { huc.errorStream } returns inputStream
                    every { huc.addRequestProperty(any(), any()) } returns Unit
                    shouldThrowExactly<BadRequestException> { oxfordDictionariesClient.getDefinition("definicion", "english") }
                }
            }
            "connection returns 404" should {
                "throw WordNotFoundException" {
                    val oxfordResponse = FileReader.read("jsonExamples/client/errorOxfordResponse.json")
                    val inputStream: InputStream = oxfordResponse.byteInputStream()
                    val huc: HttpURLConnection = mockk(relaxed = true)
                    every { urlOpener.createConnection(any(), any()) } returns huc
                    every { huc.addRequestProperty(any(), any()) } returns Unit
                    every { huc.responseCode } returns 404
                    every { huc.errorStream } returns inputStream
                    every { huc.addRequestProperty(any(), any()) } returns Unit
                    shouldThrowExactly<WordNotFoundException> { oxfordDictionariesClient.getDefinition("definicion", "en") }
                }
            }
            "connection returns 500" should {
                "throw ServiceUnavailableException" {
                    val oxfordResponse = FileReader.read("jsonExamples/client/errorOxfordResponse.json")
                    val inputStream: InputStream = oxfordResponse.byteInputStream()
                    val huc: HttpURLConnection = mockk(relaxed = true)
                    every { urlOpener.createConnection(any(), any()) } returns huc
                    every { huc.addRequestProperty(any(), any()) } returns Unit
                    every { huc.responseCode } returns 500
                    every { huc.errorStream } returns inputStream
                    every { huc.addRequestProperty(any(), any()) } returns Unit
                    shouldThrowExactly<ServiceUnavailableException> { oxfordDictionariesClient.getDefinition("definicion", "en") }
                }
            }
            "connection returns 414" should {
                "throw MalformedURLException" {
                    val oxfordResponse = FileReader.read("jsonExamples/client/errorOxfordResponse.json")
                    val inputStream: InputStream = oxfordResponse.byteInputStream()
                    val huc: HttpURLConnection = mockk(relaxed = true)
                    every { urlOpener.createConnection(any(), any()) } returns huc
                    every { huc.addRequestProperty(any(), any()) } returns Unit
                    every { huc.responseCode } returns 414
                    every { huc.errorStream } returns inputStream
                    every { huc.addRequestProperty(any(), any()) } returns Unit
                    shouldThrowExactly<MalformedURLException> { oxfordDictionariesClient.getDefinition("definicion", "en") }
                }
            }
            "connection returns unexpected code" should {
                "throw UnknownServiceException" {
                    val oxfordResponse = FileReader.read("jsonExamples/client/errorOxfordResponse.json")
                    val inputStream: InputStream = oxfordResponse.byteInputStream()
                    val huc: HttpURLConnection = mockk(relaxed = true)
                    every { urlOpener.createConnection(any(), any()) } returns huc
                    every { huc.addRequestProperty(any(), any()) } returns Unit
                    every { huc.responseCode } returns 503
                    every { huc.errorStream } returns inputStream
                    every { huc.addRequestProperty(any(), any()) } returns Unit
                    shouldThrowExactly<UnknownServiceException> { oxfordDictionariesClient.getDefinition("definicion", "en") }
                }
            }
        }
    }
}