package com.tacs.backend.exception

data class WordNotFoundException(override val message: String): RuntimeException(message)
data class MalformedClientResponse(override val message: String): RuntimeException(message)
data class BadRequestException(override val message: String): RuntimeException(message)
data class WrongCredentialsException(override val message: String): RuntimeException(message)
data class UserAlreadyExistsException(override val message: String): RuntimeException(message)
data class UnknownUserException(override val message: String): RuntimeException(message)
data class ChampionshipNotFoundException(val id: Long, override val message: String = "There isn't a championship with id: $id"): RuntimeException(message)