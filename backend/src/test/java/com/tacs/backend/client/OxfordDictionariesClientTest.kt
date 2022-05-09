package com.tacs.backend.client

import com.tacs.backend.exception.BadRequestException
import com.tacs.backend.exception.MalformedClientResponse
import com.tacs.backend.exception.WordNotFoundException
import com.tacs.backend.utils.FileReader
import com.tacs.backend.utils.asyncFileRead
import io.kotest.assertions.throwables.shouldThrowExactly
import io.kotest.core.spec.style.WordSpec
import io.kotest.core.test.TestCase
import io.kotest.matchers.shouldBe
import io.kotest.matchers.shouldNotBe
import io.mockk.clearAllMocks
import io.mockk.every
import io.mockk.mockk
import java.io.InputStream
import java.net.HttpURLConnection
import java.net.MalformedURLException
import java.net.UnknownServiceException
import javax.naming.ServiceUnavailableException

class OxfordDictionariesClientTest : WordSpec() {
    private val urlOpener = mockk<URLOpener>()
    private val oxfordDictionariesClient= OxfordDictionariesClient("someAppId", "someAppKey", "someBaseURL", urlOpener)
    override suspend fun beforeTest(testCase: TestCase) {
        clearAllMocks()
    }

    init {
        "oxfordClient.getDefinition" When {
            "connection returns 200" should {
                "return correct response" {
                    val oxfordResponse = asyncFileRead("jsonExamples/client/correctOxfordResponse.json")
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
                        result.id shouldBe "casa"
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
                    val oxfordResponse = asyncFileRead("jsonExamples/client/someErrorResponse.json")
                    val inputStream: InputStream = oxfordResponse.byteInputStream()
                    val huc: HttpURLConnection = mockk(relaxed = true)
                    every { urlOpener.createConnection(any(), any()) } returns huc
                    every { huc.addRequestProperty(any(), any()) } returns Unit
                    every { huc.responseCode } returns 400
                    every { huc.errorStream } returns inputStream
                    every { huc.addRequestProperty(any(), any()) } returns Unit
                    val exception = shouldThrowExactly<BadRequestException> { oxfordDictionariesClient.getDefinition("definicion", "english") }
                    exception.message shouldBe "Some message error"
                }
            }
            "connection returns 404" should {
                "throw WordNotFoundException" {
                    val oxfordResponse = asyncFileRead("jsonExamples/client/someErrorResponse.json")
                    val inputStream: InputStream = oxfordResponse.byteInputStream()
                    val huc: HttpURLConnection = mockk(relaxed = true)
                    every { urlOpener.createConnection(any(), any()) } returns huc
                    every { huc.addRequestProperty(any(), any()) } returns Unit
                    every { huc.responseCode } returns 404
                    every { huc.errorStream } returns inputStream
                    every { huc.addRequestProperty(any(), any()) } returns Unit
                    val exception = shouldThrowExactly<WordNotFoundException> { oxfordDictionariesClient.getDefinition("definicion", "en") }
                    exception.message shouldBe "Some message error"
                }
            }
            "connection returns 500" should {
                "throw ServiceUnavailableException" {
                    val oxfordResponse = asyncFileRead("jsonExamples/client/someErrorResponse.json")
                    val inputStream: InputStream = oxfordResponse.byteInputStream()
                    val huc: HttpURLConnection = mockk(relaxed = true)
                    every { urlOpener.createConnection(any(), any()) } returns huc
                    every { huc.addRequestProperty(any(), any()) } returns Unit
                    every { huc.responseCode } returns 500
                    every { huc.errorStream } returns inputStream
                    every { huc.addRequestProperty(any(), any()) } returns Unit
                    val exception = shouldThrowExactly<ServiceUnavailableException> { oxfordDictionariesClient.getDefinition("definicion", "en") }
                    exception.message shouldBe "Some message error"
                }
            }
            "connection returns 414" should {
                "throw MalformedURLException" {
                    val oxfordResponse = asyncFileRead("jsonExamples/client/someErrorResponse.json")
                    val inputStream: InputStream = oxfordResponse.byteInputStream()
                    val huc: HttpURLConnection = mockk(relaxed = true)
                    every { urlOpener.createConnection(any(), any()) } returns huc
                    every { huc.addRequestProperty(any(), any()) } returns Unit
                    every { huc.responseCode } returns 414
                    every { huc.errorStream } returns inputStream
                    every { huc.addRequestProperty(any(), any()) } returns Unit
                    val exception = shouldThrowExactly<MalformedURLException> { oxfordDictionariesClient.getDefinition("definicion", "en") }
                    exception.message shouldBe "Some message error"
                }
            }
            "connection returns unexpected code" should {
                "throw UnknownServiceException" {
                    val oxfordResponse = asyncFileRead("jsonExamples/client/someErrorResponse.json")
                    val inputStream: InputStream = oxfordResponse.byteInputStream()
                    val huc: HttpURLConnection = mockk(relaxed = true)
                    every { urlOpener.createConnection(any(), any()) } returns huc
                    every { huc.addRequestProperty(any(), any()) } returns Unit
                    every { huc.responseCode } returns 503
                    every { huc.errorStream } returns inputStream
                    every { huc.addRequestProperty(any(), any()) } returns Unit
                    val exception = shouldThrowExactly<UnknownServiceException> { oxfordDictionariesClient.getDefinition("definicion", "en") }
                    exception.message shouldBe "Some message error"
                }
            }

            "connection doesn't return 200 and response is unexpected" should {
                "throw MalformedClientResponse" {
                    val oxfordResponse = asyncFileRead("jsonExamples/client/unexpectedErrorResponse.json")
                    val inputStream: InputStream = oxfordResponse.byteInputStream()
                    val huc: HttpURLConnection = mockk(relaxed = true)
                    every { urlOpener.createConnection(any(), any()) } returns huc
                    every { huc.addRequestProperty(any(), any()) } returns Unit
                    every { huc.responseCode } returns 503
                    every { huc.errorStream } returns inputStream
                    every { huc.addRequestProperty(any(), any()) } returns Unit
                    val exception = shouldThrowExactly<MalformedClientResponse> { oxfordDictionariesClient.getDefinition("definicion", "en") }
                    exception.message shouldBe "Oxford Dictionaries Client return an unexpected response"
                }
            }
        }
    }
}