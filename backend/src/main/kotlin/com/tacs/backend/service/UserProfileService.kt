package com.tacs.backend.service

import com.tacs.backend.DAO.ChampionshipDAO
import com.tacs.backend.DAO.UserByChampionshipDAO
import com.tacs.backend.entity.Championship
import com.tacs.backend.entity.UpdatedScore
import com.tacs.backend.entity.UserByChampionship
import com.tacs.backend.exception.ChampionshipNotFoundException
import com.tacs.backend.exception.UnknownUserException
import com.tacs.backend.request.AddPointsRequest
import com.tacs.backend.request.Language
import com.tacs.backend.request.VisibilityType
import com.tacs.backend.response.ChampionshipResponse
import com.tacs.backend.response.GetChampionshipsResponse
import com.tacs.backend.response.GetUserChampionship
import com.tacs.backend.utils.getChampionshipResponse
import org.apache.commons.lang3.time.DateUtils
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Component
import java.util.*

@Component
class UserProfileService(
    private val championshipRepository: ChampionshipDAO,
    private val userByChampionshipRepository: UserByChampionshipDAO
) {
    fun getUserChampionshipByType(username: String, type: VisibilityType): ResponseEntity<GetChampionshipsResponse> {
        val championshipIds = userByChampionshipRepository.findByUserByChampionshipIdUsername(username)
            .map { it.userByChampionshipId.idChampionship }
        val championships = championshipRepository.findAllByIdChampionshipInAndVisibility(championshipIds, type)
        return ResponseEntity(GetChampionshipsResponse(transformToChampionshipResponses(championships)), HttpStatus.OK)
    }

    fun addUserScore(username: String, request: AddPointsRequest): ResponseEntity<String> {
        val idLanguage = request.language.ordinal
        val (shouldBeUpdated, userByChampionships) = getIfChampionshipsShouldBeUpdated(idLanguage, username)
        return if (shouldBeUpdated) {
            userByChampionships.forEach {
                userByChampionshipRepository.updateScore(
                    it.score + request.points,
                    Date(),
                    it.userByChampionshipId,
                    idLanguage
                )
            }
            ResponseEntity("Points added successfully", HttpStatus.OK)
        } else {
            ResponseEntity("Points already added today", HttpStatus.OK)
        }
    }

    fun getUpdatedScore(username: String, language: Language): ResponseEntity<UpdatedScore> {
        val idLanguage = language.ordinal
        val (shouldBeUpdated, _) = getIfChampionshipsShouldBeUpdated(idLanguage, username)
        return if (shouldBeUpdated) {
            ResponseEntity(UpdatedScore(false), HttpStatus.OK)
        } else {
            ResponseEntity(UpdatedScore(true), HttpStatus.OK)
        }
    }

    private fun getIfChampionshipsShouldBeUpdated(idLanguage: Int, username: String): Pair<Boolean, List<UserByChampionship>> {
        val userByChampionships =
            userByChampionshipRepository.findByUserByChampionshipIdIdLanguageAndUserByChampionshipIdUsername(
                idLanguage,
                username
            )
        if (userByChampionships.isEmpty()) throw UnknownUserException("There isn't a registered user in expected championship")
        val lastUpdateTime = userByChampionships.first().lastUpdateTime
        return Pair(lastUpdateTime == null || !DateUtils.isSameDay(Date(), lastUpdateTime), userByChampionships)
    }

    fun getUserChampionships(username: String, championshipId: String): ResponseEntity<GetUserChampionship> {
        val userByChampionships = userByChampionshipRepository.findByUserByChampionshipIdUsername(username)
        if (userByChampionships.isEmpty()) throw UnknownUserException("Couldn't get any championship for user $username")
        val userByChampionship =
            userByChampionships.find { c -> c.userByChampionshipId.idChampionship == championshipId.toLong() }
                ?: throw ChampionshipNotFoundException(championshipId.toLong())
        val championship = championshipRepository.findByIdChampionship(championshipId.toLong()).firstOrNull()
            ?: throw ChampionshipNotFoundException(championshipId.toLong())

        return ResponseEntity(GetUserChampionship(getChampionshipResponse(championship), userByChampionship.score), HttpStatus.OK)
    }

    private fun transformToChampionshipResponses(championships: List<Championship>): List<ChampionshipResponse> =
        championships.map { c -> getChampionshipResponse(c) }

}