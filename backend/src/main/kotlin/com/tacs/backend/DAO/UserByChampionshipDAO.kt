package com.tacs.backend.DAO

import com.tacs.backend.entity.Championship
import com.tacs.backend.entity.UserByChampionship
import com.tacs.backend.entity.UserByChampionshipId
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import javax.transaction.Transactional

interface UserByChampionshipDAO : JpaRepository<UserByChampionship, UserByChampionshipId> {
    fun findByUserByChampionshipIdIdUser(idUser: Long) : List<UserByChampionship>
    @Transactional
    @Modifying
    @Query("update UserByChampionship uc set uc.score = :new_score where uc.userByChampionshipId.idChampionship = :#{#idUserByChampionshipId.idChampionship} and uc.userByChampionshipId.idUser = :#{#idUserByChampionshipId.idUser}")
    fun updateScore(@Param("new_score") newScore: Long, idUserByChampionshipId: UserByChampionshipId)
}