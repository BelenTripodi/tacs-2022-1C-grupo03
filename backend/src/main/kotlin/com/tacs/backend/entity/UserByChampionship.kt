package com.tacs.backend.entity

import javax.persistence.*

@Entity
@Table(name = "users_championship_rel")
class UserByChampionship(
    @EmbeddedId
    val userByChampionshipId: UserByChampionshipId)

@Embeddable
data class UserByChampionshipId(var idChampionship: Long, var idUser: Long): java.io.Serializable