package com.tacs.backend.entity

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id


@Entity
data class User(
    @Id
    val username: String = "",
    val password: String = ""
)

data class AuthUser(
    val jwt: String = ""
)