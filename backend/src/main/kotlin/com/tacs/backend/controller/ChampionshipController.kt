package com.tacs.backend.controller

import com.tacs.backend.DAO.ChampionshipDAO
import com.tacs.backend.DAO.UserByChampionshipDAO
import com.tacs.backend.DAO.UserDAO
import com.tacs.backend.entity.Championship
import com.tacs.backend.entity.User
import com.tacs.backend.entity.UserByChampionship
import com.tacs.backend.entity.UserByChampionshipId
import com.tacs.backend.request.AddUserToChampionshipRequest
import com.tacs.backend.request.CreateChampionshipRequest
import com.tacs.backend.request.VisibilityType
import com.tacs.backend.response.ChampionshipResponse
import com.tacs.backend.response.CreateChampionshipsResponse
import com.tacs.backend.response.GetChampionshipsResponse
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping
@CrossOrigin(origins = ["*"], allowedHeaders = ["*"])
class ChampionshipController (private val championshipRepository: ChampionshipDAO, private val userRepository: UserDAO, private val userByChampionshipRepository: UserByChampionshipDAO) {

    @PostMapping("/championships")
    fun createChampionship(@RequestBody request: CreateChampionshipRequest): ResponseEntity<CreateChampionshipsResponse> {
        val ownerUser = userRepository.findByUsername(request.owner).first()
        val newChampionship = championshipRepository.save(createChampionshipEntity(request, ownerUser))
        userByChampionshipRepository.save(UserByChampionship(UserByChampionshipId(newChampionship.idChampionship, ownerUser.idUser)))
        return ResponseEntity(CreateChampionshipsResponse(newChampionship.idChampionship, newChampionship.name), HttpStatus.OK)
    }

    private fun createChampionshipEntity(request: CreateChampionshipRequest, ownerUser: User): Championship {
        return Championship(
            name = request.name,
            visibility = request.visibility,
            startDate = request.startDate.toDate(),
            finishDate = request.finishDate.toDate(),
            languages = request.languages,
            idOwner = ownerUser.idUser
        )
    }

    @PutMapping("championships/{idChampionship}/users")
    fun addUser(@PathVariable idChampionship: Long, @RequestBody request: AddUserToChampionshipRequest): ResponseEntity<String> {
        val foundChampionships = championshipRepository.findByIdChampionship(idChampionship)
        return if (foundChampionships.isNotEmpty()) {
            userByChampionshipRepository.save(UserByChampionship(UserByChampionshipId(foundChampionships.first().idChampionship, request.idUser)))
            ResponseEntity("Successful creation", HttpStatus.OK)
        } else {
            ResponseEntity("There isn't a championship with id: $idChampionship", HttpStatus.NOT_FOUND)
        }

    }

    @GetMapping("championships")
    fun championshipsByType(@RequestParam type: VisibilityType, @RequestParam username: String): ResponseEntity<GetChampionshipsResponse> {
        //Podemos tener algo como sesiones para no tener que buscar siempre el user?
        val ownerUser = userRepository.findByUsername(username).first()
        val resultChampionships = if (type == VisibilityType.PUBLIC) {
            championshipRepository.findByVisibility(type).map { transformChampionshipResponse(it) }
        } else {
            val allChampionshipId = userByChampionshipRepository.findByUserByChampionshipIdIdUser(ownerUser.idUser)
            val championships = championshipRepository.findAllByIdChampionshipIn(allChampionshipId.map { it.userByChampionshipId.idChampionship })
            championships.filter { it.visibility == type }.map { transformChampionshipResponse(it) }
        }

        return ResponseEntity(GetChampionshipsResponse(resultChampionships), HttpStatus.OK)
    }

    @GetMapping("championships/{id}")
    fun championshipById(@PathVariable id: Long): ResponseEntity<ChampionshipResponse> {
        val foundChampionships = championshipRepository.findByIdChampionship(id)

        return if (foundChampionships.isNotEmpty()) {
            ResponseEntity(transformChampionshipResponse(foundChampionships.first()), HttpStatus.OK)
        } else {
            ResponseEntity(HttpStatus.NOT_FOUND)
        }
    }

    private fun transformChampionshipResponse(championship: Championship): ChampionshipResponse {
        return ChampionshipResponse(
            name = championship.name,
            finishDate = championship.finishDate,
            startDate = championship.startDate,
            visibility = championship.visibility,
            languages = championship.languages
        )
    }

}