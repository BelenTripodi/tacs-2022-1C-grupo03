package com.example.demo.services

import org.springframework.stereotype.Component

@Component
class HelperRepository {
    fun getAllWordsByLanguage(language: String): List<String> {
        //TODO: We should read this file only one time
        val allWords = HelperRepository::class.java.getResource("/helper/5letter-${language}.list")?.readText()?.split("\n")
                ?: emptyList()
        return allWords.filter { it.isNotEmpty() }.map { it.uppercase() }
    }
}