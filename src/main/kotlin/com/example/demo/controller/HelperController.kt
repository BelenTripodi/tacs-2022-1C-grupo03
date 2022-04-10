package com.example.demo.controller

import com.example.demo.request.HelpRequest
import com.example.demo.response.WordDefinition
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping
class HelperController {
    @GetMapping("/dictionary")
    fun getWordDefinition(@RequestParam word: String): WordDefinition =
            //TODO: use external api
            WordDefinition(listOf("Definition1", "Definition2"))

    @PostMapping("/help")
    fun getHelp1(@RequestBody helpRequest: HelpRequest): List<String> =
            listOf("word1","word2")
}