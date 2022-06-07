package com.tacs.backend.controller

import com.tacs.backend.DAO.ChampionshipDAO
import com.tacs.backend.DAO.UserByChampionshipDAO
import com.tacs.backend.DAO.UserDAO
import com.tacs.backend.entity.Championship
import com.tacs.backend.entity.User
import com.tacs.backend.entity.UserByChampionship
import com.tacs.backend.entity.UserByChampionshipId
import com.tacs.backend.exception.ChampionshipNotFoundException
import com.tacs.backend.exception.UnknownUserException
import com.tacs.backend.request.AddUserToChampionshipRequest
import com.tacs.backend.request.CreateChampionshipRequest
import com.tacs.backend.request.VisibilityType
import com.tacs.backend.response.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping
@CrossOrigin(origins = ["*"], allowedHeaders = ["*"])
class ChampionshipController(
    private val championshipRepository: ChampionshipDAO,
    private val userRepository: UserDAO,
    private val userByChampionshipRepository: UserByChampionshipDAO
) {

    @PostMapping("/championships")
    fun createChampionship(@RequestBody request: CreateChampionshipRequest): ResponseEntity<CreateChampionshipsResponse> {
        val ownerUser = userRepository.findByUsername(request.owner).first()
        val newChampionship = championshipRepository.save(createChampionshipEntity(request, ownerUser))
        newChampionship.languages.forEach { language ->
            userByChampionshipRepository.save(
                UserByChampionship(
                    UserByChampionshipId(
                        newChampionship.idChampionship,
                        ownerUser.username,
                        language.ordinal
                    ), null, 0
                )
            )
        }
        return ResponseEntity(
            CreateChampionshipsResponse(newChampionship.idChampionship, newChampionship.name),
            HttpStatus.OK
        )
    }

    @PutMapping("championships/{idChampionship}/users")
    fun addUser(
        @PathVariable idChampionship: Long,
        @RequestBody request: AddUserToChampionshipRequest
    ): ResponseEntity<String> {
        val foundChampionships = championshipRepository.findByIdChampionship(idChampionship)
        val username = userRepository.findByUsername(request.username)
        if (username.isEmpty()) {
            throw UnknownUserException("Username not found")
        }
        return if (foundChampionships.isNotEmpty()) {
            val championship = foundChampionships.first()
            championship.languages.forEach {
                userByChampionshipRepository.save(
                    UserByChampionship(
                        UserByChampionshipId(
                            championship.idChampionship,
                            request.username,
                            it.ordinal
                        ), null, 0
                    )
                )
            }
            ResponseEntity("Successful creation", HttpStatus.OK)
        } else {
            throw ChampionshipNotFoundException(idChampionship)
        }

    }

    @GetMapping("championships")
    fun championshipsByType(): ResponseEntity<GetChampionshipsResponse> {
        val resultChampionships =
            championshipRepository.findByVisibility(VisibilityType.PUBLIC).map { transformChampionshipResponse(it) }
        return ResponseEntity(GetChampionshipsResponse(resultChampionships), HttpStatus.OK)
    }

    @GetMapping("championships/{id}")
    fun championshipById(@PathVariable id: Long): ResponseEntity<ChampionshipResponse> {
        val foundChampionships = championshipRepository.findByIdChampionship(id)

        return if (foundChampionships.isNotEmpty()) {
            ResponseEntity(transformChampionshipResponse(foundChampionships.first()), HttpStatus.OK)
        } else {
            throw ChampionshipNotFoundException(id)
        }
    }

    @GetMapping("championships/{id}/score")
    fun scoreChampionshipById(@PathVariable id: Long): ResponseEntity<ChampionshipScoreResponse> {
        val usersByChampionship =
            userByChampionshipRepository.findByUserByChampionshipIdIdChampionshipOrderByScoreAsc(id)
        return if (usersByChampionship.isNotEmpty()) {
            ResponseEntity(transformChampionshipScoreResponse(usersByChampionship, id), HttpStatus.OK)
        } else {
            throw ChampionshipNotFoundException(id)
        }
    }

    private fun transformChampionshipScoreResponse(
        usersByChampionship: List<UserByChampionship>,
        id: Long
    ): ChampionshipScoreResponse {
        return ChampionshipScoreResponse(
            idChampionship = id,
            scores = usersByChampionship.groupBy { it.userByChampionshipId.username }
                .map { (user, userScores) ->
                    val username = userRepository.findByUsername(user).first().username
                    ScoreByUser(userScores.sumOf { it.score }, username)
                }
        )
    }


    private fun transformChampionshipResponse(championship: Championship): ChampionshipResponse {
        return ChampionshipResponse(
            idChampionship = championship.idChampionship,
            name = championship.name,
            finishDate = championship.finishDate,
            startDate = championship.startDate,
            visibility = championship.visibility,
            languages = championship.languages,
            ownerUsername = championship.ownerUsername
        )
    }

    private fun createChampionshipEntity(request: CreateChampionshipRequest, ownerUser: User): Championship {
        return Championship(
            name = request.name,
            visibility = request.visibility,
            startDate = request.startDate.toDate(),
            finishDate = request.finishDate.toDate(),
            languages = request.languages,
            ownerUsername = ownerUser.username
        )
    }
}