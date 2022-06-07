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
import org.apache.commons.lang3.time.DateUtils
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping
@CrossOrigin(origins = ["*"], allowedHeaders = ["*"])
class UserProfileController(private val championshipRepository: ChampionshipDAO, private val userByChampionshipDAO: UserByChampionshipDAO) {

    @GetMapping("users/{username}/championships")
    fun userChampionshipsByType(
        @PathVariable username: String,
        @RequestParam type: VisibilityType
    ): ResponseEntity<GetChampionshipsResponse> {
       val championshipIds = userByChampionshipDAO.findByUserByChampionshipIdUsername(username).map { it.userByChampionshipId.idChampionship }
        val championships = championshipRepository.findAllByIdChampionshipInAndVisibility(championshipIds, type)
        val response = championships.map { c -> ChampionshipResponse(c.idChampionship, c.name, c.languages, c.visibility, c.startDate, c.finishDate, c.ownerUsername) }
        return ResponseEntity(GetChampionshipsResponse(response), HttpStatus.OK)
    }

    @PostMapping("users/{username}/score")
    fun addUserScore(@PathVariable username: String, @RequestBody request: AddPointsRequest): ResponseEntity<String> {
        val idLanguage = request.language.ordinal
        val userByChampionships = userByChampionshipDAO.findByUserByChampionshipIdIdLanguageAndUserByChampionshipIdUsername(idLanguage, username)
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

    @GetMapping("users/{username}/score/updated")
    fun getUserScore(@PathVariable username: String, @RequestParam language: Language): ResponseEntity<UpdatedScore>{
        val idLanguage = language.ordinal
        val userByChampionship = userByChampionshipDAO.findByUserByChampionshipIdIdLanguageAndUserByChampionshipIdUsername(idLanguage, username)
        if(userByChampionship.isEmpty()) throw  UnknownUserException("There isn't a registered user in expected championship")
        val today = Date()
        return if(userByChampionship.first().lastUpdateTime == null || !DateUtils.isSameDay(today, userByChampionship.first().lastUpdateTime)){
            ResponseEntity(UpdatedScore(false), HttpStatus.OK)
        } else {
            ResponseEntity(UpdatedScore(true),HttpStatus.OK)
        }
    }

    @GetMapping("users/{username}/championships/{championshipId}")
    fun getUserChampionships(@PathVariable username: String, @PathVariable championshipId: String): ResponseEntity<GetUserChampionship>
    {
        val userByChampionships = userByChampionshipDAO.findByUserByChampionshipIdUsername(username)
        if (userByChampionships.isEmpty()) throw UnknownUserException("Couldn't get any championship for user $username")
        val userByChampionship = userByChampionships.find { c -> c.userByChampionshipId.idChampionship == championshipId.toLong() }
            ?: throw ChampionshipNotFoundException(championshipId.toLong())
        val championship = championshipRepository.findByIdChampionship(championshipId.toLong()).firstOrNull() ?: throw ChampionshipNotFoundException(championshipId.toLong())
        val response = GetUserChampionship(
            ChampionshipResponse(championship.idChampionship, championship.name, championship.languages, championship.visibility, championship.startDate, championship.finishDate, championship.ownerUsername), userByChampionship.score)

        return ResponseEntity(response, HttpStatus.OK)
    }


}