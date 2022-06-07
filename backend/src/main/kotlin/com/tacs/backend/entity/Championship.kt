package com.tacs.backend.entity

import com.tacs.backend.request.Language
import com.tacs.backend.request.VisibilityType
import java.util.*
import javax.persistence.*

@Entity
data class Championship(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val idChampionship: Long = 0,
    @ElementCollection(targetClass = Language::class)
    @CollectionTable(name = "language_championship_rel",
        joinColumns = [JoinColumn(name = "id_championship")])
    @Column(name = "id_language")
    val languages: List<Language>,
    val name: String,
    @Enumerated(EnumType.STRING)
    @Column(name = "visibility")
    val visibility: VisibilityType,
    @Column(columnDefinition="DATETIME")
    @Temporal(TemporalType.TIMESTAMP)
    val startDate: Date,
    @Column(columnDefinition="DATETIME")
    @Temporal(TemporalType.TIMESTAMP)
    val finishDate: Date,
    val ownerUsername: String,
)