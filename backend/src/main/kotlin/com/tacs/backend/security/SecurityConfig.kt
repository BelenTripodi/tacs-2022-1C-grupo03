package com.tacs.backend.security

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.security.web.firewall.DefaultHttpFirewall
import org.springframework.security.web.firewall.HttpFirewall


@Configuration
@EnableWebSecurity
class SecurityConfig : WebSecurityConfigurerAdapter() {

    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
        http.csrf().disable().cors().and()
            .addFilterAfter(JWTAuthorizationFilter(), UsernamePasswordAuthenticationFilter::class.java)
            .authorizeRequests()
            .antMatchers(HttpMethod.POST, "/login").permitAll()
            .antMatchers(HttpMethod.POST,"/signup").permitAll()
            .antMatchers(HttpMethod.GET,"/swagger-ui.html",
                "/webjars/**",
                "/v3/api-docs/**",
                "/swagger-ui/**").permitAll()
            .anyRequest().authenticated()
    }

    @Bean
    fun defaultHttpFirewall(): HttpFirewall? {
        return DefaultHttpFirewall()
    }

    companion object {
        private val AUTH_WHITELIST = listOf( // -- Swagger UI v2
            "/swagger-ui.html",
            "/webjars/**",
            "/v3/api-docs/**",
            "/swagger-ui/**" // other public endpoints of your API may be appended to this array
        )
    }

}