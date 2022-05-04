package com.tacs.backend.controller

import com.tacs.backend.DAO.ChampionshipDAO
import com.tacs.backend.entity.Championship
import com.tacs.backend.request.AddUserToChampionshipRequest
import com.tacs.backend.request.CreateChampionshipRequest
import com.tacs.backend.request.Language
import com.tacs.backend.request.VisibilityType
import com.tacs.backend.response.ChampionshipResponse
import com.tacs.backend.response.CreateChampionshipsResponse
import com.tacs.backend.response.GenericResponse
import com.tacs.backend.response.GetChampionshipsResponse
import org.joda.time.DateTime
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping
@CrossOrigin(origins = ["*"], allowedHeaders = ["*"])
class ChampionshipController (private val championshipRepository: ChampionshipDAO) {

    @PostMapping("/championships")
    fun createChampionship(@RequestBody request: CreateChampionshipRequest): ResponseEntity<CreateChampionshipsResponse> {
        val newChampionship = championshipRepository.save(createChampionshipEntity(request))
        return ResponseEntity(CreateChampionshipsResponse(newChampionship.idChampionship, newChampionship.name), HttpStatus.OK)
    }

    private fun createChampionshipEntity(request: CreateChampionshipRequest): Championship {
        return Championship(
            name = request.name,
            visibility = request.visibility,
            startDate = request.startDate.toDate(),
            finishDate = request.finishDate.toDate(),
            languages = request.languages
        )
    }

    @PutMapping("championships/{id}/users")
    fun addUser(@PathVariable id: String, @RequestBody request: AddUserToChampionshipRequest): GenericResponse<String> =
        GenericResponse("Exito!")

    @GetMapping("championships")
    fun championshipsByType(@RequestParam type: VisibilityType): GenericResponse<GetChampionshipsResponse> {
        val championshipResponse = ChampionshipResponse(
            "torneo", listOf(Language.ENGLISH), VisibilityType.PUBLIC,
            //TODO: verlo con datetime
            Date(), Date()
        )
        return GenericResponse(GetChampionshipsResponse(listOf(championshipResponse)))
    }

    @GetMapping("championships/{id}")
    fun championshipById(@PathVariable id: String): ResponseEntity<ChampionshipResponse> {
        val foundChampionships = championshipRepository.findByIdChampionship(id.toLong())

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