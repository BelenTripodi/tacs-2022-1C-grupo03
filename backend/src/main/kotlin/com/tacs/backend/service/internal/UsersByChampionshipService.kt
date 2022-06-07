package com.tacs.backend.service.internal

import com.tacs.backend.DAO.UserByChampionshipDAO
import org.springframework.stereotype.Service
import java.util.*

@Service
class UsersByChampionshipService(private val userByChampionshipDAO: UserByChampionshipDAO) {
    fun updateScoreAtEndOfDay(endDate: Date) {
        userByChampionshipDAO.updateScoreAtEndOfDayWithMaxPoints(MAX_POINTS.toLong(), endDate)
    }
    //TODO: se puede usar esto en los controllers? y no tener los dao en los controllers
    companion object {
        const val MAX_POINTS = 7
    }
}