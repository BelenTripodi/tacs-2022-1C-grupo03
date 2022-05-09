package com.tacs.backend.controller

import com.tacs.backend.DAO.ChampionshipDAO
import com.tacs.backend.DAO.UserByChampionshipDAO
import com.tacs.backend.entity.UserByChampionship
import com.tacs.backend.request.AddPointsRequest
import com.tacs.backend.request.VisibilityType
import com.tacs.backend.response.ChampionshipResponse
import com.tacs.backend.response.GetChampionshipsResponse
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

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
        val championships = championshipRepository.findAllByIdChampionshipIn(championshipIds)
        val response = championships.map { c -> ChampionshipResponse(c.name, c.languages, c.visibility, c.startDate, c.finishDate) }
        return ResponseEntity(GetChampionshipsResponse(response), HttpStatus.OK)
    }

    @PostMapping("users/{id}/score")
    fun addUserScore(@PathVariable id: String, @RequestBody request: AddPointsRequest): ResponseEntity<String> {
        val userByChampionships = userByChampionshipDAO.findByUserByChampionshipIdIdUser(id.toLong()).map { c ->
            UserByChampionship(c.userByChampionshipId.apply { score += request.points.toLong() })
        }
        userByChampionships.forEach { userByChampionshipDAO.save(it) }
        return ResponseEntity("Points added successfully", HttpStatus.OK)
    }


}