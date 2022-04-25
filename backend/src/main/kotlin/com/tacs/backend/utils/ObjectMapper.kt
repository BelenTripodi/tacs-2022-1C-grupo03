package com.tacs.backend.utils

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.MapperFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.joda.JodaModule
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.springframework.stereotype.Component
import java.text.SimpleDateFormat

val mapper: ObjectMapper = jacksonObjectMapper().apply {
    registerModule(JodaModule())
    configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true)
    configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
    disable(DeserializationFeature.ADJUST_DATES_TO_CONTEXT_TIME_ZONE)
    dateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss")
}


