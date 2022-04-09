package com.example.demo.controller

import com.example.demo.request.ChampionshipRequest
import com.example.demo.response.Championship
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping
class ChampionshipController {

    @PostMapping("/championships")
    fun createChampionship(@RequestBody request: ChampionshipRequest): Championship =
            //TODO: send correctInfo
            Championship("1",request.name)
}