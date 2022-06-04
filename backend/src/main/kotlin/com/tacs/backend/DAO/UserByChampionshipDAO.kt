package com.tacs.backend.DAO

import com.tacs.backend.entity.UserByChampionship
import com.tacs.backend.entity.UserByChampionshipId
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import java.util.*
import javax.transaction.Transactional

interface UserByChampionshipDAO : JpaRepository<UserByChampionship, UserByChampionshipId> {
    fun findByUserByChampionshipIdIdUser(idUser: Long) : List<UserByChampionship>
    fun findByUserByChampionshipIdIdLanguageAndUserByChampionshipIdIdUser(idLanguage: Int, idUser: Long) : List<UserByChampionship>
    @Transactional
    @Modifying
    @Query("update UserByChampionship uc set uc.score = :new_score, uc.lastUpdateTime = :new_update_time where uc.userByChampionshipId.idChampionship = :#{#idUserByChampionshipId.idChampionship} and uc.userByChampionshipId.idUser = :#{#idUserByChampionshipId.idUser} and uc.userByChampionshipId.idLanguage = :#{#languageId}")
    fun updateScore(@Param("new_score") newScore: Long, @Param("new_update_time")newUpdateTime: Date, idUserByChampionshipId: UserByChampionshipId, languageId: Int)
    fun findByUserByChampionshipIdIdChampionshipOrderByScoreAsc(idChampionship: Long): List<UserByChampionship>
}