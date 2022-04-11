package com.tacs.backend.controller

import com.tacs.backend.request.AddPointsRequest
import com.tacs.backend.request.Language
import com.tacs.backend.request.VisibilityType
import com.tacs.backend.response.ChampionshipResponse
import com.tacs.backend.response.GenericResponse
import com.tacs.backend.response.GetChampionshipsResponse
import org.joda.time.DateTime
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping
class UserProfileController {

    @GetMapping("users/{id}/championships")
    fun userChampionshipsByType(
        @PathVariable id: String,
        @RequestParam type: VisibilityType
    ): GenericResponse<GetChampionshipsResponse> {
        val championshipResponse = ChampionshipResponse(
            "torneo", listOf(Language.ENGLISH), VisibilityType.PUBLIC,
            DateTime.now(), DateTime.now()
        )
        return GenericResponse(GetChampionshipsResponse(listOf(championshipResponse)))
    }

    @PostMapping("users/{id}/score")
    fun addUserScore(@PathVariable id: String, @RequestBody request: AddPointsRequest): GenericResponse<String> =
        GenericResponse("id: $id, language: ${request.language}, points: ${request.points}")


}