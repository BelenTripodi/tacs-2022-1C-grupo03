package com.tacs.backend.controller

import com.tacs.backend.DAO.UserDAO
import com.tacs.backend.entity.AuthUser
import com.tacs.backend.entity.User
import com.tacs.backend.request.SessionRequest
import com.tacs.backend.response.GenericResponse
import com.tacs.backend.service.SessionService
import org.springframework.context.annotation.Bean
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*



@RestController
@RequestMapping
class SessionController(private val userRepository: UserDAO, private val passwordEncoder: PasswordEncoder, private val sessionService: SessionService) {

    @PostMapping("/login")
    fun login(@RequestBody loginRequest: SessionRequest): GenericResponse<AuthUser> {
        val jwt = sessionService.getJwtToken(loginRequest.username,loginRequest.password)
        return GenericResponse(AuthUser(jwt = jwt))
    }


    @PostMapping("/signup")
    fun signup(@RequestBody signupRequest: SessionRequest): String = "EXITO"

    @PostMapping("/logout")
    fun logout(): String = "EXITO"

    @GetMapping("/users")
    fun getUsers(): List<User> =
        userRepository.findAll()


    @Bean
    fun createUsers() {
        val anUser = User(username = "username", password = passwordEncoder.encode("password"))

        userRepository.save(anUser)

    }
}
