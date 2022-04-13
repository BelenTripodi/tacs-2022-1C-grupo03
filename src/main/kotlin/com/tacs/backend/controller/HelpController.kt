package com.tacs.backend.controller

import com.tacs.backend.request.HelpRequest
import com.tacs.backend.request.Try
import com.tacs.backend.service.FindWordResolver
import com.tacs.backend.service.HelperRepository
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping
class HelpController(private val helperRepository: HelperRepository, private val findWordResolver: FindWordResolver) {

    @PostMapping("/help")
    fun possibleWords(@RequestBody helpRequest: HelpRequest): List<String> {
        val wordsRepository = helperRepository.getAllWordsByLanguage(helpRequest.language)
        return findWordResolver.findPossibleWords(helpRequest.tries, wordsRepository)
    }

}