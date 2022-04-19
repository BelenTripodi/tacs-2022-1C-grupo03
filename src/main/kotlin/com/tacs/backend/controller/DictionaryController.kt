package com.tacs.backend.controller

import com.tacs.backend.request.Language
import com.tacs.backend.response.DictionaryResponse
import com.tacs.backend.response.GenericResponse
import com.tacs.backend.service.DictionaryService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping
class DictionaryController(val dictionaryService: DictionaryService) {
    @GetMapping("/dictionary")
    fun wordDefinition(@RequestParam word: String, @RequestParam language: Language): ResponseEntity<DictionaryResponse> {
        val dictionaryResponse = dictionaryService.getWordDefinition(word, language)
        return ResponseEntity(dictionaryResponse, HttpStatus.OK)
    }
}