package com.example.demo.controller

import com.example.demo.request.HelpRequest
import com.example.demo.response.WordDefinition
import com.example.demo.services.HelperRepository
import com.example.demo.services.FindWordResolver
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping
class HelperController(private val helperRepository: HelperRepository, private val findWordResolver: FindWordResolver) {

    @GetMapping("/dictionary")
    fun getWordDefinition(@RequestParam word: String): WordDefinition =
            //TODO: use external api
            WordDefinition(listOf("Definition1", "Definition2"))

    @PostMapping("/help")
    fun getHelp1(@RequestBody helpRequest: HelpRequest): List<String> {
        //TODO: when we try a second chance, we must use previous possible words
        val wordsRepository = helperRepository.getAllWordsByLanguage(helpRequest.language)
        return findWordResolver.findPossibleWords(helpRequest.letters, wordsRepository)
    }
}