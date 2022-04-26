package com.tacs.backend.controller

import com.tacs.backend.request.HelpRequest
import com.tacs.backend.request.Try
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping
@CrossOrigin(origins = ["*"], allowedHeaders = ["*"])
class HelpController {

    @PostMapping("/help")
    fun possibleWords(@RequestBody helpRequest: HelpRequest): List<String> =
            listOf("word1","word2")
}