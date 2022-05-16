package com.tacs.backend.entity

import javax.persistence.Embeddable
import javax.persistence.EmbeddedId
import javax.persistence.Entity
import javax.persistence.Table

@Entity
@Table(name = "users_championship_rel")
class UserByChampionship(
    @EmbeddedId
    val userByChampionshipId: UserByChampionshipId,
    var score: Long)

@Embeddable
data class UserByChampionshipId(var idChampionship: Long, var idUser: Long, var idLanguage: Int): java.io.Serializable