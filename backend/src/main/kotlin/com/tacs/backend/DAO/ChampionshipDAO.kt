package com.tacs.backend.DAO

import com.tacs.backend.entity.Championship
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface ChampionshipDAO : JpaRepository<Championship, Long> {

    override fun findById(id: Long): Optional<Championship>

}