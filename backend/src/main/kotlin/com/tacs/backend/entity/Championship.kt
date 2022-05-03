package com.tacs.backend.entity

import com.tacs.backend.request.Language
import com.tacs.backend.request.VisibilityType
import javax.persistence.*

@Entity
data class Championship(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val championshipId: Long = 0,
    val name: String,
    /*@ElementCollection(targetElement = Language.class)
    @JoinTable(name = "tblInterests", joinColumns = @JoinColumn(name = "personID"))
    @Column(name = "interest", nullable = false)
    @Enumerated(EnumType.STRING)
    val languages: List<Language>,
    */
    @Enumerated(EnumType.STRING)
    val visibility: VisibilityType,
    val startDate: Long,
    val finishDate: Long
)

@Entity
data class LanguageDTO(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val languageId: Long = 0,
    val language: String
)