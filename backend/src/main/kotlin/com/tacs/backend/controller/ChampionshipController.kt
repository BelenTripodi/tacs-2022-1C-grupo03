package com.tacs.backend.controller

import com.tacs.backend.request.AddUserToChampionshipRequest
import com.tacs.backend.request.CreateChampionshipRequest
import com.tacs.backend.request.Language
import com.tacs.backend.request.VisibilityType
import com.tacs.backend.response.ChampionshipResponse
import com.tacs.backend.response.CreateChampionshipsResponse
import com.tacs.backend.response.GenericResponse
import com.tacs.backend.response.GetChampionshipsResponse
import org.joda.time.DateTime
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping
class ChampionshipController {

    @PostMapping("/championships")
    fun createChampionship(@RequestBody request: CreateChampionshipRequest): GenericResponse<CreateChampionshipsResponse> =
        //TODO: send correctInfo
        GenericResponse(CreateChampionshipsResponse("1", request.name))

    @PutMapping("championships/{id}/users")
    fun addUser(@PathVariable id: String, @RequestBody request: AddUserToChampionshipRequest): GenericResponse<String> =
        GenericResponse("Exito!")

    @GetMapping("championships")
    fun championshipsByType(@RequestParam type: VisibilityType): GenericResponse<GetChampionshipsResponse> {
        val championshipResponse = ChampionshipResponse(
            "torneo", listOf(Language.ENGLISH), VisibilityType.PUBLIC,
            DateTime.now(), DateTime.now()
        )
        return GenericResponse(GetChampionshipsResponse(listOf(championshipResponse)))
    }

    @GetMapping("championships/{id}")
    fun championshipById(@PathVariable id: String): GenericResponse<ChampionshipResponse> {
        val championshipResponse = ChampionshipResponse(
            "torneo", listOf(Language.ENGLISH), VisibilityType.PUBLIC,
            DateTime.now(), DateTime.now()
        )
        return GenericResponse(championshipResponse)
    }

}