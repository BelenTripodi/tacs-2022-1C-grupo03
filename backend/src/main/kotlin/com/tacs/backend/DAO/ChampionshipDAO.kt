package com.tacs.backend.DAO

import com.tacs.backend.entity.Championship
import com.tacs.backend.request.VisibilityType
import org.springframework.data.jpa.repository.JpaRepository

interface ChampionshipDAO : JpaRepository<Championship, Long> {
    fun findByIdChampionship(id: Long): List<Championship>
    fun findAllByIdChampionshipIn(idsChampionship: List<Long>): List<Championship>
    fun findByVisibility(visibilityType: VisibilityType): List<Championship>
}