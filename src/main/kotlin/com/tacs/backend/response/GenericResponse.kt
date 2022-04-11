package com.tacs.backend.response

data class GenericResponse<T>(val data: T? = null, val error: Error? = null)

data class Error(val code: Int, val message: String)
