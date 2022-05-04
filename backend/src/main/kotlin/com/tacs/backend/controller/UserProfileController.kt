package com.tacs.backend.controller

import com.tacs.backend.request.AddPointsRequest
import com.tacs.backend.request.Language
import com.tacs.backend.request.VisibilityType
import com.tacs.backend.response.ChampionshipResponse
import com.tacs.backend.response.GenericResponse
import com.tacs.backend.response.GetChampionshipsResponse
import org.joda.time.DateTime
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping
@CrossOrigin(origins = ["*"], allowedHeaders = ["*"])
class UserProfileController {

    @GetMapping("users/{id}/championships")
    fun userChampionshipsByType(
        @PathVariable id: String,
        @RequestParam type: VisibilityType
    ): GenericResponse<GetChampionshipsResponse> {
        val championshipResponse = ChampionshipResponse(
            "torneo", listOf(Language.ENGLISH), VisibilityType.PUBLIC,
            //TODO: verlo con datetime
            Date(), Date()
        )
        return GenericResponse(GetChampionshipsResponse(listOf(championshipResponse)))
    }

    @PostMapping("users/{id}/score")
    fun addUserScore(@PathVariable id: String, @RequestBody request: AddPointsRequest): GenericResponse<String> =

        GenericResponse("id: $id, language: ${request.language}, points: ${request.points}")


}