package com.tacs.backend.cron

import com.tacs.backend.service.ChampionshipService
import com.tacs.backend.utils.logger
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component


@Component
class CheckPointsInDay(private val championshipService: ChampionshipService) {

    @Scheduled(cron = "0 59 23 * * *")
    fun addPointsIfNotPlayed() {
        logger().info("Executing score updating.")
        championshipService.updateScoreAtEndOfDay()
    }
}