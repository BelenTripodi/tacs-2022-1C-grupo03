package com.tacs.backend.exception

data class WordNotFoundException(override val message: String): RuntimeException(message)
data class MalformedClientResponse(override val message: String): RuntimeException(message)
data class BadRequestException(override val message: String): RuntimeException(message)
data class WrongCredentialsException(override val message: String): RuntimeException(message)