package com.tacs.backend.client

import org.springframework.stereotype.Component
import java.net.HttpURLConnection
import java.net.URL
import java.net.URLConnection

@Component
class URLOpener {

    fun createConnection(urlString: String, headers: Map<String, String> ): URLConnection {
        val connection = URL(urlString).openConnection() as HttpURLConnection
        //TODO: What if URL creation returns an error?
        connection.requestMethod = "GET"
        connection.addRequestProperty("Accept", "application/json")
        headers.forEach {
            connection.addRequestProperty(it.key, it.value)
        }
        return connection
    }

}