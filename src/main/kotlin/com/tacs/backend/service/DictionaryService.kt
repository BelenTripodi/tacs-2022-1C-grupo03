package com.tacs.backend.service

import com.tacs.backend.client.OxfordDictionariesClient
import com.tacs.backend.request.Language
import com.tacs.backend.response.DictionaryResponse
import org.springframework.stereotype.Component

@Component
class DictionaryService(
    private val oxfordDictionariesClient: OxfordDictionariesClient
) {
    fun getWordDefinition(word: String, language: Language): DictionaryResponse {
        val clientResponse = oxfordDictionariesClient.getDefinition(word, language.type)
        return DictionaryResponse(word,
            clientResponse.results?.firstOrNull()?.lexicalEntries?.firstOrNull()?.entries?.firstOrNull()?.senses?.firstOrNull()?.definitions?.firstOrNull() ?: ""
            )
    }
}