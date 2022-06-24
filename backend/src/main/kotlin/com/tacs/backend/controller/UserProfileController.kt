package com.tacs.backend.controller

import com.tacs.backend.entity.UpdatedScore
import com.tacs.backend.request.AddPointsRequest
import com.tacs.backend.request.Language
import com.tacs.backend.request.VisibilityType
import com.tacs.backend.response.GetChampionshipsResponse
import com.tacs.backend.response.GetUserChampionship
import com.tacs.backend.service.UserProfileService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping
@CrossOrigin(origins = ["*"], allowedHeaders = ["*"])
class UserProfileController(private val userProfileService: UserProfileService) {

    @GetMapping("users/{username}/championships")
    fun userChampionshipsByType(
        @PathVariable username: String,
        @RequestParam type: VisibilityType
    ): ResponseEntity<GetChampionshipsResponse> =
        userProfileService.getUserChampionshipByType(username, type)


    @PostMapping("users/{username}/score")
    fun addUserScore(@PathVariable username: String, @RequestBody request: AddPointsRequest): ResponseEntity<String> =
       userProfileService.addUserScore(username, request)

    @GetMapping("users/{username}/score/updated")
    fun getUpdatedScore(@PathVariable username: String, @RequestParam language: Language): ResponseEntity<UpdatedScore> =
        userProfileService.getUpdatedScore(username, language)

    @GetMapping("users/{username}/championships/{championshipId}")
    fun getUserChampionships(@PathVariable username: String, @PathVariable championshipId: String): ResponseEntity<GetUserChampionship> =
        userProfileService.getUserChampionships(username, championshipId)

}