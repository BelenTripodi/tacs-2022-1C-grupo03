package com.tacs.backend.controller

import com.tacs.backend.exception.*
import com.tacs.backend.response.Error
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler
import java.net.MalformedURLException
import java.net.UnknownServiceException
import javax.naming.ServiceUnavailableException
import javax.validation.UnexpectedTypeException

@RestController
@ControllerAdvice
class ErrorHandlerController: ResponseEntityExceptionHandler() {

    @ExceptionHandler(WordNotFoundException::class)
    fun wordNotFoundError(exception: WordNotFoundException): ResponseEntity<Error> =
        ResponseEntity(Error(HttpStatus.NOT_FOUND.value(), exception.message), HttpStatus.NOT_FOUND)

    @ExceptionHandler(ServiceUnavailableException::class)
    fun serviceUnavailableError(exception: ServiceUnavailableException): ResponseEntity<Error> =
        ResponseEntity(Error(HttpStatus.SERVICE_UNAVAILABLE.value(), exception.message!!), HttpStatus.SERVICE_UNAVAILABLE)

    @ExceptionHandler(MalformedURLException::class)
    fun malformedURLError(exception: MalformedURLException): ResponseEntity<Error> =
        ResponseEntity(Error(HttpStatus.BAD_REQUEST.value(), exception.message!!), HttpStatus.BAD_REQUEST)

    @ExceptionHandler(MalformedClientResponse::class)
    fun malformedClientResponseError(exception: MalformedClientResponse): ResponseEntity<Error> =
        ResponseEntity(Error(HttpStatus.SERVICE_UNAVAILABLE.value(), exception.message), HttpStatus.SERVICE_UNAVAILABLE)

    @ExceptionHandler(BadRequestException::class)
    fun badRequestError(exception: BadRequestException): ResponseEntity<Error> =
        ResponseEntity(Error(HttpStatus.BAD_REQUEST.value(), exception.message), HttpStatus.BAD_REQUEST)

    @ExceptionHandler(UnknownServiceException::class)
    fun unknownServiceError(exception: UnknownServiceException): ResponseEntity<Error> =
        ResponseEntity(Error(HttpStatus.SERVICE_UNAVAILABLE.value(), exception.message!!), HttpStatus.SERVICE_UNAVAILABLE)

    @ExceptionHandler(WrongCredentialsException::class)
    fun unknownServiceError(exception: WrongCredentialsException): ResponseEntity<Error> =
        ResponseEntity(Error(HttpStatus.UNAUTHORIZED.value(), exception.message), HttpStatus.UNAUTHORIZED)

    @ExceptionHandler(UserAlreadyExistsException::class)
    fun userAlreadyExistError(exception: UserAlreadyExistsException): ResponseEntity<Error> =
        ResponseEntity(Error(HttpStatus.BAD_REQUEST.value(), exception.message), HttpStatus.BAD_REQUEST)

    @ExceptionHandler(UnknownUserException::class)
    fun unknownUserError(exception: UnknownUserException): ResponseEntity<Error> =
        ResponseEntity(Error(HttpStatus.NOT_FOUND.value(), exception.message), HttpStatus.NOT_FOUND)

    @ExceptionHandler(ChampionshipNotFoundException::class)
    fun championshipNotFoundError(exception: ChampionshipNotFoundException): ResponseEntity<Error> =
        ResponseEntity(Error(HttpStatus.NOT_FOUND.value(), exception.message), HttpStatus.NOT_FOUND)
}