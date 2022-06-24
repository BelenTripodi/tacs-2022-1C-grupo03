package com.tacs.backend.service

import com.tacs.backend.DAO.ChampionshipDAO
import com.tacs.backend.DAO.UserByChampionshipDAO
import com.tacs.backend.entity.Championship
import com.tacs.backend.entity.UpdatedScore
import com.tacs.backend.entity.UserByChampionship
import com.tacs.backend.entity.UserByChampionshipId
import com.tacs.backend.exception.ChampionshipNotFoundException
import com.tacs.backend.exception.UnknownUserException
import com.tacs.backend.request.AddPointsRequest
import com.tacs.backend.request.Language
import com.tacs.backend.request.VisibilityType
import com.tacs.backend.response.ChampionshipResponse
import com.tacs.backend.response.GetChampionshipsResponse
import io.kotest.assertions.throwables.shouldThrowExactly
import io.kotest.core.spec.style.WordSpec
import io.kotest.core.test.TestCase
import io.kotest.matchers.shouldBe
import io.mockk.*
import org.joda.time.DateTime
import org.joda.time.DateTimeUtils
import org.springframework.http.HttpStatus

class UserProfileServiceTest : WordSpec() {
    private val championshipRepository = mockk<ChampionshipDAO>()
    private val userByChampionshipRepository = mockk<UserByChampionshipDAO>()
    private val userProfileService = UserProfileService(championshipRepository, userByChampionshipRepository)

    override suspend fun beforeTest(testCase: TestCase) {
        clearAllMocks(false)
    }

    init {
        DateTimeUtils.setCurrentMillisFixed(1655939985000)
        val userByChampionships = listOf(
            UserByChampionship(
                userByChampionshipId = UserByChampionshipId(1, "anUsername", 0),
                score = 0,
                lastUpdateTime = null
            )
        )
        val dateChampionship = DateTime(1655939985000).toDate()
        "getUserChampionshipByType" When {
            val championships = listOf(
                Championship(
                    idChampionship = 1,
                    languages = listOf(Language.SPANISH),
                    name = "aPublicChampionship",
                    visibility = VisibilityType.PUBLIC,
                    startDate = dateChampionship,
                    finishDate = dateChampionship,
                    ownerUsername = "anUsername"
                )
            )
            "repositories has username and championships" should {
                val championshipsResponse = listOf(
                    ChampionshipResponse(
                        idChampionship = 1,
                        languages = listOf(Language.SPANISH),
                        name = "aPublicChampionship",
                        visibility = VisibilityType.PUBLIC,
                        startDate = dateChampionship,
                        finishDate = dateChampionship,
                        ownerUsername = "anUsername"
                    )
                )
                every { userByChampionshipRepository.findByUserByChampionshipIdUsername("anUsername") } returns userByChampionships
                every {
                    championshipRepository.findAllByIdChampionshipInAndVisibility(
                        listOf(1),
                        VisibilityType.PUBLIC
                    )
                } returns championships
                "return Response entity with expected championships" {
                    val result = userProfileService.getUserChampionshipByType("anUsername", VisibilityType.PUBLIC)
                    result.body shouldBe GetChampionshipsResponse(championshipsResponse)
                    result.statusCode shouldBe HttpStatus.OK
                }
            }
            "user doesn't have related championships" should {
                val championshipsResponse = emptyList<ChampionshipResponse>()
                every { userByChampionshipRepository.findByUserByChampionshipIdUsername("anUsername") } returns emptyList()
                every {
                    championshipRepository.findAllByIdChampionshipInAndVisibility(
                        emptyList(),
                        VisibilityType.PUBLIC
                    )
                } returns emptyList()
                "return Response entity with empty list" {
                    val result = userProfileService.getUserChampionshipByType("anUsername", VisibilityType.PUBLIC)
                    result.body shouldBe GetChampionshipsResponse(championshipsResponse)
                    result.statusCode shouldBe HttpStatus.OK
                }
            }
        }
        "addUserScore" When {
            "user doesn't registered" should {
                "throw an UnknownUserException" {
                    every {
                        userByChampionshipRepository.findByUserByChampionshipIdIdLanguageAndUserByChampionshipIdUsername(
                            0,
                            "anUsername"
                        )
                    } returns emptyList()
                    shouldThrowExactly<UnknownUserException> {
                        userProfileService.addUserScore("anUsername", AddPointsRequest(5, Language.SPANISH))
                    }
                }
            }
            "user is registered and should update score (never updated)" should {
                "updateScore in repository" {
                    every {
                        userByChampionshipRepository.findByUserByChampionshipIdIdLanguageAndUserByChampionshipIdUsername(
                            0,
                            "anUsername"
                        )
                    } returns userByChampionships
                    every {
                        userByChampionshipRepository.updateScore(
                            5,
                            any(),
                            UserByChampionshipId(1, "anUsername", 0),
                            0
                        )
                    } just Runs
                    val result = userProfileService.addUserScore("anUsername", AddPointsRequest(5, Language.SPANISH))
                    result.body shouldBe "Points added successfully"
                    result.statusCode shouldBe HttpStatus.OK
                    verify(exactly = 1) {
                        userByChampionshipRepository.updateScore(5, any(), UserByChampionshipId(1, "anUsername", 0), 0)
                    }
                }
            }

            "user is registered and should update score (not updated in date)" should {

                "updateScore in repository" {
                    val userByChampionshipsWithNotUpdatedScore = listOf(
                        UserByChampionship(
                            userByChampionshipId = UserByChampionshipId(1, "anUsername", 0),
                            score = 2,
                            lastUpdateTime = DateTime(1655903985000).toDate()
                        ),
                        UserByChampionship(
                            userByChampionshipId = UserByChampionshipId(2, "anUsername", 0),
                            score = 5,
                            lastUpdateTime = DateTime(1655903985000).toDate()
                        )
                    )
                    every {
                        userByChampionshipRepository.findByUserByChampionshipIdIdLanguageAndUserByChampionshipIdUsername(
                            0,
                            "anUsername"
                        )
                    } returns userByChampionshipsWithNotUpdatedScore
                    every {
                        userByChampionshipRepository.updateScore(
                            7,
                            any(),
                            UserByChampionshipId(1, "anUsername", 0),
                            0
                        )
                    } just Runs
                    every {
                        userByChampionshipRepository.updateScore(
                            10,
                            any(),
                            UserByChampionshipId(2, "anUsername", 0),
                            0
                        )
                    } just Runs
                    val result = userProfileService.addUserScore("anUsername", AddPointsRequest(5, Language.SPANISH))
                    result.body shouldBe "Points added successfully"
                    result.statusCode shouldBe HttpStatus.OK
                    verify() {
                        userByChampionshipRepository.updateScore(7, any(), UserByChampionshipId(1, "anUsername", 0), 0)
                        userByChampionshipRepository.updateScore(10, any(), UserByChampionshipId(2, "anUsername", 0), 0)
                    }
                }
            }

            "user is registered but score is already updated" should {

                "not updateScore in repository" {
                    val userByChampionshipsWithNotUpdatedScore = listOf(
                        UserByChampionship(
                            userByChampionshipId = UserByChampionshipId(1, "anUsername", 0),
                            score = 2,
                            lastUpdateTime = DateTime(1655990385000).toDate()
                        )
                    )
                    every {
                        userByChampionshipRepository.findByUserByChampionshipIdIdLanguageAndUserByChampionshipIdUsername(
                            0,
                            "anUsername"
                        )
                    } returns userByChampionshipsWithNotUpdatedScore

                    val result = userProfileService.addUserScore("anUsername", AddPointsRequest(5, Language.SPANISH))
                    result.body shouldBe "Points already added today"
                    result.statusCode shouldBe HttpStatus.OK
                    verify(exactly = 0) {
                        userByChampionshipRepository.updateScore(any(), any(), UserByChampionshipId(1, "anUsername", 0), 0)
                    }
                }
            }
        }
        "getUpdatedScore" When {
            "user doesn't registered" should {
                "throw an UnknownUserException" {
                    every {
                        userByChampionshipRepository.findByUserByChampionshipIdIdLanguageAndUserByChampionshipIdUsername(
                            0,
                            "anUsername"
                        )
                    } returns emptyList()
                    shouldThrowExactly<UnknownUserException> {
                        userProfileService.getUpdatedScore("anUsername", Language.SPANISH)
                    }
                }
            }
            "user is registered and should update score (never updated)" should {
                "updateScore in repository" {
                    every {
                        userByChampionshipRepository.findByUserByChampionshipIdIdLanguageAndUserByChampionshipIdUsername(
                            0,
                            "anUsername"
                        )
                    } returns userByChampionships
                    val result = userProfileService.getUpdatedScore("anUsername", Language.SPANISH)
                    result.body shouldBe UpdatedScore(false)
                    result.statusCode shouldBe HttpStatus.OK
                }
            }

            "user is registered and should update score (not updated in date)" should {

                "updateScore in repository" {
                    val userByChampionshipsWithNotUpdatedScore = listOf(
                        UserByChampionship(
                            userByChampionshipId = UserByChampionshipId(1, "anUsername", 0),
                            score = 2,
                            lastUpdateTime = DateTime(1655903985000).toDate()
                        ),
                        UserByChampionship(
                            userByChampionshipId = UserByChampionshipId(2, "anUsername", 0),
                            score = 5,
                            lastUpdateTime = DateTime(1655903985000).toDate()
                        )
                    )
                    every {
                        userByChampionshipRepository.findByUserByChampionshipIdIdLanguageAndUserByChampionshipIdUsername(
                            0,
                            "anUsername"
                        )
                    } returns userByChampionshipsWithNotUpdatedScore
                    val result = userProfileService.getUpdatedScore("anUsername", Language.SPANISH)
                    result.body shouldBe UpdatedScore(false)
                    result.statusCode shouldBe HttpStatus.OK

                }
            }

            "user is registered but score is already updated" should {

                "not updateScore in repository" {
                    val userByChampionshipsWithNotUpdatedScore = listOf(
                        UserByChampionship(
                            userByChampionshipId = UserByChampionshipId(1, "anUsername", 0),
                            score = 2,
                            lastUpdateTime = DateTime(1655990385000).toDate()
                        )
                    )
                    every {
                        userByChampionshipRepository.findByUserByChampionshipIdIdLanguageAndUserByChampionshipIdUsername(
                            0,
                            "anUsername"
                        )
                    } returns userByChampionshipsWithNotUpdatedScore

                    val result = userProfileService.getUpdatedScore("anUsername", Language.SPANISH)
                    result.body shouldBe UpdatedScore(true)
                    result.statusCode shouldBe HttpStatus.OK
                }
            }
        }
        "getUserChampionships" When {
            "there isn't any registered user" should {
                every { userByChampionshipRepository.findByUserByChampionshipIdUsername("anUsername2") } returns emptyList()
                "throw an UnknownUserException" {
                    shouldThrowExactly<UnknownUserException> {
                        userProfileService.getUserChampionships("anUsername2", "1")
                    }
                }
            }
            "there isn't any championship registered" should {
                every { userByChampionshipRepository.findByUserByChampionshipIdUsername("anUsername") } returns userByChampionships
                every { championshipRepository.findByIdChampionship(5) } returns emptyList()
                "throw an ChampionshipNotFoundException" {
                    shouldThrowExactly<ChampionshipNotFoundException> {
                        userProfileService.getUserChampionships("anUsername", "5")
                    }
                }
            }
            "there isn't any championship for that user" should {
                every { championshipRepository.findByIdChampionship(5) } returns listOf(
                    Championship(
                        idChampionship = 5,
                        languages = listOf(Language.SPANISH),
                        name = "aPublicChampionship",
                        visibility = VisibilityType.PUBLIC,
                        startDate = dateChampionship,
                        finishDate = dateChampionship,
                        ownerUsername = "anUsername"
                    )
                )
                every { userByChampionshipRepository.findByUserByChampionshipIdUsername("anUsername") } returns userByChampionships
                "throw an ChampionshipNotFoundException" {
                    shouldThrowExactly<ChampionshipNotFoundException> {
                        userProfileService.getUserChampionships("anUsername", "5")
                    }
                }
            }
        }
    }
}