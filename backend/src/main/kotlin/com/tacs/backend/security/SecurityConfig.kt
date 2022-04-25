package com.tacs.backend.security

import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter


@Configuration
@EnableWebSecurity
class SecurityConfig : WebSecurityConfigurerAdapter() {


    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
        http.csrf().disable()
            .addFilterAfter(JWTAuthorizationFilter(), UsernamePasswordAuthenticationFilter::class.java)
            .authorizeRequests()
            .antMatchers(HttpMethod.POST, "/login").permitAll()
            .antMatchers(HttpMethod.POST,"/signup").permitAll()
            .anyRequest().authenticated()
    }



}