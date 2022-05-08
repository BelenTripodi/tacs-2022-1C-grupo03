package com.tacs.backend.DAO

import com.tacs.backend.entity.UserByChampionship
import com.tacs.backend.entity.UserByChampionshipId
import org.springframework.data.jpa.repository.JpaRepository

interface UserByChampionshipDAO : JpaRepository<UserByChampionship, UserByChampionshipId> {
    fun findByUserByChampionshipIdIdUser(idUser: Long) : List<UserByChampionship>
}