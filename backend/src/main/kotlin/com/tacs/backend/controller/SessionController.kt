package com.tacs.backend.controller

import com.tacs.backend.DAO.UserDAO
import com.tacs.backend.entity.AuthUser
import com.tacs.backend.entity.User
import com.tacs.backend.request.SessionRequest
import com.tacs.backend.response.GenericResponse
import com.tacs.backend.service.SessionService
import com.tacs.backend.utils.logger
import org.springframework.context.annotation.Bean
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*



@RestController
@RequestMapping
@CrossOrigin(origins = ["*"], allowedHeaders = ["*"])
class SessionController(private val userRepository: UserDAO, private val passwordEncoder: PasswordEncoder, private val sessionService: SessionService) {

    @PostMapping("/login")
    fun login(@RequestBody loginRequest: SessionRequest): GenericResponse<AuthUser> {
        val jwt = sessionService.getJwtToken(loginRequest.username,loginRequest.password)
        logger().info("Retrieving jwt token")
        return GenericResponse(AuthUser(jwt = jwt))
    }


    @PostMapping("/signup")
    fun signup(@RequestBody signupRequest: SessionRequest): String {
        if(userRepository.findByUsername(signupRequest.username).isNotEmpty()){
            return "User already exists"
        }
        userRepository.save(User(username = signupRequest.username,password = passwordEncoder.encode(signupRequest.password)))
        return "Registration successful"
    }

    @PostMapping("/logout")
    fun logout(): String = "EXITO"

    @GetMapping("/users")
    fun getUsers(): List<User> =
        userRepository.findAll()


    @Bean
    fun createUsers() {
        val anUser = User(id = 0, username = "username", password = passwordEncoder.encode("password"))

        userRepository.save(anUser)

    }
}
