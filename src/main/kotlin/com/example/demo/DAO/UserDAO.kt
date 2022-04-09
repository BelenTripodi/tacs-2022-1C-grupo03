package com.example.demo.DAO

import com.example.demo.entity.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserDAO : JpaRepository<User,Long> {
}