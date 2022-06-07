package com.tacs.backend.service

import com.tacs.backend.DAO.UserDAO
import com.tacs.backend.entity.User
import com.tacs.backend.exception.UserAlreadyExistsException
import com.tacs.backend.exception.WrongCredentialsException
import com.tacs.backend.utils.passwordEncoder
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

    fun getJwtToken(username: String, password:String): String {
        val user = userRepository.findByUsername(username).firstOrNull() ?: throw WrongCredentialsException("Wrong username or password")
        if(passwordEncoder.matches(password, user.password)){
            val secretKey = "mySecretKey"
            val grantedAuthorities = AuthorityUtils
                .commaSeparatedStringToAuthorityList("ROLE_USER")
            return Jwts
                .builder()
                .setSubject(username)
                .claim("authorities",
                    grantedAuthorities.stream()
                        .map { obj: GrantedAuthority -> obj.authority }
                        .collect(Collectors.toList()))
                .setIssuedAt(Date(System.currentTimeMillis()))
                .setExpiration(Date(System.currentTimeMillis() + 3600000))
                .signWith(
                    SignatureAlgorithm.HS512,
                    secretKey.toByteArray()
                ).compact()
        }
        throw WrongCredentialsException("Wrong username or password")
    }

    fun signup(username: String, password: String) {
        if(userRepository.findByUsername(username).isEmpty()){
            userRepository.save(User(username = username, password = passwordEncoder.encode(password)))
        } else throw UserAlreadyExistsException("User $username already exists")

    }
}