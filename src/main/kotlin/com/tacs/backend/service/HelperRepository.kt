package com.tacs.backend.service

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
            HelperRepository::class.java.getResource("/helper/5letter-${language}.list")?.readText()?.split("\r\n")
                    ?: emptyList()
}