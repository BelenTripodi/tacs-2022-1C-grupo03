package com.tacs.backend.controller

import com.tacs.backend.request.AddUserToChampionshipRequest
import com.tacs.backend.request.CreateChampionshipRequest
import com.tacs.backend.response.*
import com.tacs.backend.service.ChampionshipService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping
@CrossOrigin(origins = ["*"], allowedHeaders = ["*"])
class ChampionshipController(
    private val service: ChampionshipService
) {

    @PostMapping("/championships")
    fun createChampionship(@RequestBody request: CreateChampionshipRequest): ResponseEntity<CreateChampionshipsResponse> {
        val newChampionship = service.create(request)
        return ResponseEntity(
            CreateChampionshipsResponse(newChampionship.first, newChampionship.second),
            HttpStatus.OK
        )
    }

    @PutMapping("championships/{idChampionship}/users")
    fun addUser(
        @PathVariable idChampionship: Long,
        @RequestBody request: AddUserToChampionshipRequest
    ): ResponseEntity<AddUserToChampionship> {
        service.addUser(idChampionship, request.username)
        return ResponseEntity(
            AddUserToChampionship("Successfully added the user ${request.username}"),
            HttpStatus.OK
        )

    }

    @GetMapping("championships")
    fun championshipsByType(): ResponseEntity<GetChampionshipsResponse> {
        val resultChampionships = service.findByType()

        return ResponseEntity(
            GetChampionshipsResponse(resultChampionships),
            HttpStatus.OK
        )
    }

    @GetMapping("championships/{id}")
    fun championshipById(
        @PathVariable id: Long
    ): ResponseEntity<ChampionshipResponse> {
        val result = service.findById(id)
        return ResponseEntity(result, HttpStatus.OK)
    }

    @GetMapping("championships/{id}/score")
    fun scoreChampionshipById(
        @PathVariable id: Long
    ): ResponseEntity<ChampionshipScoreResponse> {
        val result = service.scoreForChampionship(id)
        return ResponseEntity(result, HttpStatus.OK)
    }
}