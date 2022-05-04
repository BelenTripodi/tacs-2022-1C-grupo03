package com.tacs.backend.DAO

import com.tacs.backend.entity.Championship
import org.springframework.data.jpa.repository.JpaRepository

interface ChampionshipDAO : JpaRepository<Championship, Long> {
    fun findByIdChampionship(id: Long): List<Championship>
}