package com.tacs.backend.client

import com.fasterxml.jackson.module.kotlin.readValue
import com.tacs.backend.exception.BadRequestException
import com.tacs.backend.exception.MalformedClientResponse
import com.tacs.backend.exception.WordNotFoundException
import com.tacs.backend.utils.TacsObjectMapper
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.net.HttpURLConnection
import java.net.MalformedURLException
import java.net.URL
import java.net.UnknownServiceException
import javax.naming.ServiceUnavailableException

@Component
class OxfordDictionariesClient(
    @Value("\${oxfordDictionary.appId}")
    private val appId: String,
    @Value("\${oxfordDictionary.appKey}")
    private val appKey: String,
    @Value("\${oxfordDictionary.baseUrl}")
    private val baseUrl: String,
    private val mapper: TacsObjectMapper
) {
    private val wordsUrl = "$baseUrl%s?q=%s&fields=definitions"

    fun getDefinition(word: String, language: String): OxfordDictionariesResponse {

        val stringURL = wordsUrl.format(language, word)
        val connection = createConnection(stringURL)
        connection.requestMethod = "GET"
        connection.addRequestProperty("Accept", "application/json")
        connection.addRequestProperty("app_id", appId)
        connection.addRequestProperty("app_key", appKey)

        val responseCode = connection.responseCode

        if (responseCode == 200) {
            return mapper.mapper.readValue(connection.inputStream)
        } else {
            val message = mapper.mapper.readValue<OxfordDictionariesResponse>(connection.errorStream).error
                ?: throw MalformedClientResponse("Oxford Dictionaries Client return an unexpected response")
            when(responseCode) {
                404 ->
                    throw WordNotFoundException(message)
                500 ->
                    throw ServiceUnavailableException(message)
                414 ->
                    throw MalformedURLException(message)
                400 ->
                    throw BadRequestException(message)
                else ->
                    throw UnknownServiceException(message)
            }
        }
    }

    fun createConnection(string: String): HttpURLConnection{
        return URL(string).openConnection() as HttpURLConnection
        //TODO: What if URL creation returns an error?
    }
}

data class Sense(val definitions: List<String>?)
data class Entry(val senses: List<Sense>?)
data class LexicalEntry(val entries: List<Entry>?)
data class OxfordResult(val id: String, val lexicalEntries: List<LexicalEntry>?)
data class OxfordDictionariesResponse(val results: List<OxfordResult>? = null, val error: String? = null)