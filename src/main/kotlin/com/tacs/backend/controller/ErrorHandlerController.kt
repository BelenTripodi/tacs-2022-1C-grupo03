package com.tacs.backend.controller

import com.tacs.backend.exception.OxfordException
import com.tacs.backend.response.DictionaryResponse
import com.tacs.backend.response.Error
import com.tacs.backend.response.GenericResponse
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestController
@ControllerAdvice
class ErrorHandlerController: ResponseEntityExceptionHandler() {

    @ExceptionHandler(OxfordException::class)
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    fun oxfordError(exception: OxfordException): GenericResponse<DictionaryResponse>{
        return GenericResponse(error = Error(exception.code, exception.message))
    }
}