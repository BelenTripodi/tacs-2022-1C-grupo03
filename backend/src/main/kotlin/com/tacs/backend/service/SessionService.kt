package com.tacs.backend.service

import com.tacs.backend.DAO.UserDAO
import com.tacs.backend.exception.WrongCredentialsException
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.AuthorityUtils
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component
import java.util.*
import java.util.stream.Collectors

@Component
class SessionService(private val userRepository: UserDAO) {

    @Autowired
    private val passwordEncoder: PasswordEncoder? = null

    fun getJwtToken(username: String, password:String): String {
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
                .setId(user[0].idUser.toString())
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
}