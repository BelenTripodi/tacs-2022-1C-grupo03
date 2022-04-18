package com.tacs.backend.exception

data class OxfordException(override val message: String, val code: Int): RuntimeException(message)