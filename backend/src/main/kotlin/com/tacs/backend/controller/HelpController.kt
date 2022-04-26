package com.tacs.backend.controller

import com.tacs.backend.request.HelpRequest
import com.tacs.backend.response.HelperResponse
import com.tacs.backend.service.FindWordResolver
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping
@CrossOrigin(origins = ["*"], allowedHeaders = ["*"])
class HelpController(private val findWordResolver: FindWordResolver) {

    @PostMapping("/help")
    fun possibleWords(@RequestBody helpRequest: HelpRequest): ResponseEntity<HelperResponse> {
        return ResponseEntity(HelperResponse(findWordResolver.findPossibleWords(helpRequest)), HttpStatus.OK)
    }

} 