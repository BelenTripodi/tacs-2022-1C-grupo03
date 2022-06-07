package com.tacs.backend.DAO

import com.tacs.backend.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface UserDAO : JpaRepository<User,Long> {

    fun findByUsername(name: String): List<User>

}