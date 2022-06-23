package com.tacs.backend.service

import com.tacs.backend.DAO.ChampionshipDAO
import com.tacs.backend.DAO.UserByChampionshipDAO
import com.tacs.backend.DAO.UserDAO
import com.tacs.backend.entity.Championship
import com.tacs.backend.entity.User
import com.tacs.backend.entity.UserByChampionship
import com.tacs.backend.entity.UserByChampionshipId
import com.tacs.backend.exception.ChampionshipNotFoundException
import com.tacs.backend.exception.UnknownUserException
import com.tacs.backend.request.CreateChampionshipRequest
import com.tacs.backend.request.VisibilityType
import com.tacs.backend.response.ChampionshipResponse
import com.tacs.backend.response.ChampionshipScoreResponse
import com.tacs.backend.response.ScoreByUser
import org.springframework.stereotype.Component
import java.util.*

@Component
class ChampionshipService(
    private val championshipRepository: ChampionshipDAO,
    private val userRepository: UserDAO,
    private val userByChampionshipRepository: UserByChampionshipDAO
) {

    fun create(request: CreateChampionshipRequest): Pair<Long, String> {
        val ownerUser = userRepository.findByUsername(request.owner).first()
        val newChampionship = championshipRepository.save(createEntity(request, ownerUser))
        saveInUserByChampionship(ownerUser.username, newChampionship)
        return Pair(newChampionship.idChampionship, newChampionship.name)
    }

    fun addUser(championshipId: Long, username: String) {
        val foundChampionships =
            championshipRepository.findByIdChampionship(championshipId)
        val user = userRepository.findByUsername(username)
        if (user.isEmpty()) {
            throw UnknownUserException("User with username $username not found")
        }
        return if (foundChampionships.isNotEmpty()) {
            val championship = foundChampionships.first()
            saveInUserByChampionship(username, championship)
        } else {
            throw ChampionshipNotFoundException(championshipId)
        }
    }

    fun findByType(): List<ChampionshipResponse> =
        championshipRepository.findByVisibility(VisibilityType.PUBLIC)
            .map { transformChampionshipResponse(it) }

    fun findById(championshipId: Long): ChampionshipResponse {
        val foundChampionships = championshipRepository.findByIdChampionship(championshipId)
        if (foundChampionships.isNotEmpty()) {
            return transformChampionshipResponse(foundChampionships.first())
        } else {
            throw ChampionshipNotFoundException(championshipId)
        }
    }

    fun scoreForChampionship(championshipId: Long): ChampionshipScoreResponse {
        val usersByChampionship =
            userByChampionshipRepository.findByUserByChampionshipIdIdChampionshipOrderByScoreAsc(championshipId)
        if (usersByChampionship.isNotEmpty()) {
            return transformChampionshipScoreResponse(usersByChampionship, championshipId)
        } else {
            throw ChampionshipNotFoundException(championshipId)
        }
    }
    fun updateScoreAtEndOfDay() {
        userByChampionshipRepository.updateScoreAtEndOfDayWithMaxPoints(MAX_POINTS, Date())
    }

    private fun saveInUserByChampionship(username: String, championship: Championship) {
        championship.languages.forEach { language ->
            userByChampionshipRepository.save(
                UserByChampionship(
                    UserByChampionshipId(
                        championship.idChampionship,
                        username,
                        language.ordinal
                    ), null, 0
                )
            )
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

    private fun createEntity(request: CreateChampionshipRequest, ownerUser: User): Championship {
        return Championship(
            name = request.name,
            visibility = request.visibility,
            startDate = request.startDate.toDate(),
            finishDate = request.finishDate.toDate(),
            languages = request.languages,
            ownerUsername = ownerUser.username
        )
    }

    companion object {
        const val MAX_POINTS = 7L
    }

}