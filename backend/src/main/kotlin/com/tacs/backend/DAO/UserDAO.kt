package com.tacs.backend.DAO

import com.tacs.backend.entity.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserDAO : JpaRepository<User,Long> {
}