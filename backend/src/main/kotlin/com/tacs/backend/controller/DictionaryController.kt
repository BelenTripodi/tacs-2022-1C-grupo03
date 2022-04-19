package com.tacs.backend.controller

import com.tacs.backend.response.DictionaryResponse
import com.tacs.backend.response.GenericResponse
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping
class DictionaryController {
    @GetMapping("/dictionary")
    fun wordDefinition(@RequestParam word: String): GenericResponse<DictionaryResponse> =
        GenericResponse(DictionaryResponse(word, "definition", "www.google.com"))
}