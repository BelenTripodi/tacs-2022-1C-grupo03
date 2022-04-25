package com.tacs.backend.controller

import com.tacs.backend.DAO.UserDAO
import com.tacs.backend.entity.AuthUser
import com.tacs.backend.entity.User
import com.tacs.backend.exception.WrongCredentialsException
import com.tacs.backend.request.SessionRequest
import com.tacs.backend.response.GenericResponse
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.AuthorityUtils
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*
import java.util.*
import java.util.stream.Collectors


@RestController
@RequestMapping
class SessionController(private val userRepository: UserDAO) {

    @Autowired
    private val passwordEncoder: PasswordEncoder? = null

    @PostMapping("/login")
    fun login(@RequestBody loginRequest: SessionRequest): GenericResponse<AuthUser> {
        val jwt = getJwtToken(loginRequest.username,loginRequest.password)
        return GenericResponse(AuthUser(jwt = jwt))
    }

    private fun getJwtToken(username: String, password:String): String {
        val user = userRepository.findByUsername(username)
        if (user.isEmpty()) {
            throw WrongCredentialsException("Wrong username or password")
        }
        if(passwordEncoder!!.matches(password, user[0].password)){
            val secretKey = "mySecretKey"
            val grantedAuthorities = AuthorityUtils
                .commaSeparatedStringToAuthorityList("ROLE_USER")
            val token: String = Jwts
                .builder()
                .setId("tacsJWT")
                .setSubject(username)
                .claim("authorities",
                    grantedAuthorities.stream()
                        .map { obj: GrantedAuthority -> obj.authority }
                        .collect(Collectors.toList()))
                .setIssuedAt(Date(System.currentTimeMillis()))
                .setExpiration(Date(System.currentTimeMillis() + 600000))
                .signWith(
                    SignatureAlgorithm.HS512,
                    secretKey.toByteArray()
                ).compact()
            return token
        }
        throw WrongCredentialsException("Wrong username or password")
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
        val anUser = User(username = "username", password = passwordEncoder!!.encode("password"))

        userRepository.save(anUser)

    }
}
