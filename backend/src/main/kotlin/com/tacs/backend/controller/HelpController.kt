package com.tacs.backend.controller

import com.tacs.backend.request.HelpRequest
import com.tacs.backend.service.FindWordResolver
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping
@CrossOrigin(origins = ["*"], allowedHeaders = ["*"])
class HelpController(private val findWordResolver: FindWordResolver) {

    @PostMapping("/help")
    fun possibleWords(@RequestBody helpRequest: HelpRequest): List<String> {
        return findWordResolver.findPossibleWords(helpRequest)
    }

}