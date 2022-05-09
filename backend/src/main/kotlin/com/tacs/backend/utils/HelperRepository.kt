package com.tacs.backend.utils

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

@Component
class HelperRepository(@Value("\${helperRepository.pathRepositoryWords:helper/5letter-LANGUAGE.list}")private val pathRepositoryWords: String) {
    private var snapshot: MutableMap<String,List<String>> = mutableMapOf()

    fun getAllWordsByLanguage(language: String): List<String> {
        if (!snapshot.contains(language)) {
            snapshot[language] = getData(language)
        }
        return snapshot[language]?.filter { it.isNotEmpty() }?.map { it.uppercase() } ?: emptyList()
    }

    private fun getData(language: String): List<String> {
        val fullPath = pathRepositoryWords.replace(LANGUAGE_IN_PATH, language.lowercase())
        return FileReader.read(fullPath).replace("\r", "").split("\n")
    }

    companion object {
        const val LANGUAGE_IN_PATH = "LANGUAGE"
    }

}