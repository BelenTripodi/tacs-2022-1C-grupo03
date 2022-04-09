package com.example.demo.request

import org.joda.time.DateTime

data class ChampionshipRequest(val name: String, val languages: List<String>, val visibility: String, val startDate: DateTime, val finishDate: DateTime)
