package com.example.demo.controller

import com.example.demo.entity.User
import com.example.demo.response.WordDefinition
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping
class HelperController {
    @GetMapping("/dictionary")
    fun getWordDefinition(@RequestParam word: String): WordDefinition =
            //TODO: use external api
            WordDefinition(listOf("Definition1", "Definition2"))
}