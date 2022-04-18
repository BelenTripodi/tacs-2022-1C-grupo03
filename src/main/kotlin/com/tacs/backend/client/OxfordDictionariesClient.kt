package com.tacs.backend.client

import com.fasterxml.jackson.module.kotlin.readValue
import com.tacs.backend.exception.OxfordException
import com.tacs.backend.utils.customObjectMapper
import org.apache.logging.log4j.message.StringFormattedMessage
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.net.HttpURLConnection
import java.net.URL

@Component
class OxfordDictionariesClient(
    @Value("\${oxfordDictionary.appId}")
    private val appId: String,
    @Value("\${oxfordDictionary.appKey}")
    private val appKey: String,
    @Value("\${oxfordDictionary.baseUrl}")
    private val baseUrl: String,

) {
    private val wordsUrl = "$baseUrl%s?q=%s&fields=definitions"

    fun getDefinition(word: String, language: String): OxfordDictionariesResponse {

        val connection: HttpURLConnection = URL(wordsUrl.format(language, word)).openConnection() as HttpURLConnection
        connection.requestMethod = "GET"
        connection.addRequestProperty("Accept", "application/json")
        connection.addRequestProperty("app_id", appId)
        connection.addRequestProperty("app_key", appKey)

        return when (connection.responseCode) {
            200 -> customObjectMapper.readValue(connection.inputStream)
            else -> {
                val message = customObjectMapper.readValue<OxfordDictionariesResponse>(connection.errorStream).error!!
                throw OxfordException(message, connection.responseCode)
            }
        }


    }
}

data class Sense(val definitions: List<String>?)
data class Entry(val senses: List<Sense>?)
data class LexicalEntry(val entries: List<Entry>?)
data class OxfordResult(val lexicalEntries: List<LexicalEntry>?)
data class OxfordDictionariesResponse(val results: List<OxfordResult>? = null, val error: String? = null)