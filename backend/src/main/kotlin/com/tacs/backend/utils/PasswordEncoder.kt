package com.tacs.backend.utils

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

val passwordEncoder = BCryptPasswordEncoder(10)