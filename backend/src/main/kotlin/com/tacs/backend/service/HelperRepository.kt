package com.tacs.backend.service

import com.tacs.backend.utils.FileReader
import org.springframework.stereotype.Component

@Component
class HelperRepository {
    private var snapshot: MutableMap<String,List<String>> = mutableMapOf()

    fun getAllWordsByLanguage(language: String): List<String> {
        if (!snapshot.contains(language)) {
            snapshot[language] = getData(language)
        }
        return snapshot[language]?.filter { it.isNotEmpty() }?.map { it.uppercase() } ?: emptyList()
    }

    private fun getData(language: String): List<String> =
           FileReader.read("helper/5letter-${language.lowercase()}.list").split("\r\n")
}