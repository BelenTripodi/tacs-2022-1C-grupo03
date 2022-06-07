package com.tacs.backend.cron

import com.tacs.backend.service.internal.UsersByChampionshipService
import com.tacs.backend.utils.logger
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import java.util.*


@Component
class CheckPointsInDay(private val usersByChampionshipService: UsersByChampionshipService) {

    @Scheduled(cron = "0 59 23 * * *")
    fun addPointsIfNotPlayed() {
        val endDate = Date()
        logger().info("Executing score updating.")
        usersByChampionshipService.updateScoreAtEndOfDay(endDate)
    }
}