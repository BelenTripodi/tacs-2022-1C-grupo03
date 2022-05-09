package com.tacs.backend.utils

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlin.text.Charsets.UTF_8

object FileReader {
    fun read(fileName: String): String {
        return this.javaClass.classLoader.getResource(fileName)!!.readText(UTF_8)
    }
}

suspend fun asyncFileRead(fileName: String): String = withContext(Dispatchers.IO) {
    FileReader.read(fileName)
}