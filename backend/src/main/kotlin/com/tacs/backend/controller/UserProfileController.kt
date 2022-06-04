package com.tacs.backend.controller

import com.tacs.backend.DAO.ChampionshipDAO
import com.tacs.backend.DAO.UserByChampionshipDAO
import com.tacs.backend.entity.UpdatedScore
import com.tacs.backend.exception.ChampionshipNotFoundException
import com.tacs.backend.exception.UnknownUserException
import com.tacs.backend.request.AddPointsRequest
import com.tacs.backend.request.Language
import com.tacs.backend.request.VisibilityType
import com.tacs.backend.response.ChampionshipResponse
import com.tacs.backend.response.GetChampionshipsResponse
import com.tacs.backend.response.GetUserChampionship
import netscape.javascript.JSObject
import org.apache.commons.lang3.time.DateUtils
import org.joda.time.DateTime
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.temporal.ChronoUnit
import java.util.*

@RestController
@RequestMapping
@CrossOrigin(origins = ["*"], allowedHeaders = ["*"])
class UserProfileController(private val championshipRepository: ChampionshipDAO, private val userByChampionshipDAO: UserByChampionshipDAO) {

    @GetMapping("users/{id}/championships")
    fun userChampionshipsByType(
        @PathVariable id: String,
        @RequestParam type: VisibilityType
    ): ResponseEntity<GetChampionshipsResponse> {
       val championshipIds = userByChampionshipDAO.findByUserByChampionshipIdIdUser(id.toLong()).map { it.userByChampionshipId.idChampionship }
        val championships = championshipRepository.findAllByIdChampionshipInAndVisibility(championshipIds, type)
        val response = championships.map { c -> ChampionshipResponse(c.idChampionship, c.name, c.languages, c.visibility, c.startDate, c.finishDate, c.idOwner) }
        return ResponseEntity(GetChampionshipsResponse(response), HttpStatus.OK)
    }

    @PostMapping("users/{id}/score")
    fun addUserScore(@PathVariable id: String, @RequestBody request: AddPointsRequest): ResponseEntity<String> {
        val idLanguage = request.language.ordinal
        val userByChampionships = userByChampionshipDAO.findByUserByChampionshipIdIdLanguageAndUserByChampionshipIdIdUser(idLanguage, id.toLong())
        if (userByChampionships.isEmpty()) throw UnknownUserException("Couldn't add score: There isn't a registered user in expected championship")
        val today = Date()
        return if(userByChampionships.first().lastUpdateTime == null || !DateUtils.isSameDay(today, userByChampionships.first().lastUpdateTime)) {
            userByChampionships.forEach {
                userByChampionshipDAO.updateScore(
                    it.score + request.points,
                    today,
                    it.userByChampionshipId,
                    idLanguage
                )
            }
            ResponseEntity("Points added successfully", HttpStatus.OK)
        } else {
            ResponseEntity("Points already added today", HttpStatus.OK)
        }
    }

    @GetMapping("users/{id}/score")
    fun getUserScore(@PathVariable id: String, @RequestParam language: Language): ResponseEntity<UpdatedScore>{
        val idLanguage = language.ordinal
        val userByChampionship = userByChampionshipDAO.findByUserByChampionshipIdIdLanguageAndUserByChampionshipIdIdUser(idLanguage, id.toLong())
        if(userByChampionship.isEmpty()) throw  UnknownUserException("There isn't a registered user in expected championship")
        val today = Date()
        return if(userByChampionship.first().lastUpdateTime == null || !DateUtils.isSameDay(today, userByChampionship.first().lastUpdateTime)){
            ResponseEntity(UpdatedScore(false), HttpStatus.OK)
        } else {
            ResponseEntity(UpdatedScore(true),HttpStatus.OK)
        }
    }

    @GetMapping("users/{userId}/championships/{championshipId}")
    fun getUserChampionships(@PathVariable userId: String, @PathVariable championshipId: String): ResponseEntity<GetUserChampionship>
    {
        val userByChampionships = userByChampionshipDAO.findByUserByChampionshipIdIdUser(userId.toLong())
        if (userByChampionships.isEmpty()) throw UnknownUserException("Couldn't get any championship for user $userId")
        val userByChampionship = userByChampionships.find { c -> c.userByChampionshipId.idChampionship == championshipId.toLong() }
            ?: throw ChampionshipNotFoundException(championshipId.toLong())
        val championship = championshipRepository.findByIdChampionship(championshipId.toLong()).firstOrNull() ?: throw ChampionshipNotFoundException(championshipId.toLong())
        val response = GetUserChampionship(
            ChampionshipResponse(championship.idChampionship, championship.name, championship.languages, championship.visibility, championship.startDate, championship.finishDate,championship.idOwner), userByChampionship.score)

        return ResponseEntity(response, HttpStatus.OK)
    }


}