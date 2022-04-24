package com.tacs.backend.controller

import com.tacs.backend.DAO.UserDAO
import com.tacs.backend.entity.User
import com.tacs.backend.request.SessionRequest
import org.springframework.context.annotation.Bean
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping
class SessionController(private val userRepository: UserDAO) {

    @PostMapping("/login")
    fun login(@RequestBody loginRequest: SessionRequest): String =
        "Login success"

    @PostMapping("/signup")
    fun signup(@RequestBody signupRequest: SessionRequest): String = "EXITO"

    @PostMapping("/logout")
    fun logout(): String = "EXITO"

    @GetMapping("/users")
    fun getUsers(): List<User> =
        userRepository.findAll()


    @Bean
    fun createUsers() {
        val anUser = User(name = "usuario", password = "contraseña");

        userRepository.save(anUser)
    }
}
