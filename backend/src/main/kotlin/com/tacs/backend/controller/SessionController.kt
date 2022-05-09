package com.tacs.backend.controller

import com.tacs.backend.entity.AuthUser
import com.tacs.backend.request.SessionRequest
import com.tacs.backend.service.SessionService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping
@CrossOrigin(origins = ["*"], allowedHeaders = ["*"])
class SessionController(private val sessionService: SessionService) {

    @PostMapping("/login")
    fun login(@RequestBody loginRequest: SessionRequest): ResponseEntity<AuthUser> {
        val jwt = sessionService.getJwtToken(loginRequest.username, loginRequest.password)
        return ResponseEntity(AuthUser(jwt = jwt), HttpStatus.OK)
    }

    @PostMapping("/signup")
    fun signup(@RequestBody signupRequest: SessionRequest): ResponseEntity<String> {
        sessionService.signup(signupRequest.username, signupRequest.password)
        return ResponseEntity("User created successfully", HttpStatus.OK)
    }

}
