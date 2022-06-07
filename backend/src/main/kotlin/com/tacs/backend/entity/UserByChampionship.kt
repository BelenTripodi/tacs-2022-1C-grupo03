package com.tacs.backend.entity

import org.springframework.format.annotation.DateTimeFormat
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "users_championship_rel")
class UserByChampionship(
    @EmbeddedId
    val userByChampionshipId: UserByChampionshipId,
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    var lastUpdateTime: Date?,
    var score: Long)

@Embeddable
data class UserByChampionshipId(var idChampionship: Long, var username: String, var idLanguage: Int): java.io.Serializable