package com.tacs.backend.service

import com.tacs.backend.DAO.ChampionshipDAO
import com.tacs.backend.DAO.UserByChampionshipDAO
import com.tacs.backend.DAO.UserDAO
import com.tacs.backend.entity.Championship
import com.tacs.backend.entity.User
import com.tacs.backend.entity.UserByChampionship
import com.tacs.backend.entity.UserByChampionshipId
import com.tacs.backend.exception.ChampionshipNotFoundException
import com.tacs.backend.exception.UnknownUserException
import com.tacs.backend.request.CreateChampionshipRequest
import com.tacs.backend.request.Language
import com.tacs.backend.request.VisibilityType
import com.tacs.backend.response.ChampionshipResponse
import com.tacs.backend.response.ChampionshipScoreResponse
import com.tacs.backend.response.ScoreByUser
import io.kotest.assertions.throwables.shouldThrowExactly
import io.kotest.core.spec.Spec
import io.kotest.core.spec.style.WordSpec
import io.kotest.core.test.TestCase
import io.kotest.matchers.equality.shouldBeEqualToComparingFields
import io.kotest.matchers.shouldBe
import io.kotest.matchers.throwable.shouldHaveMessage
import io.mockk.*
import org.joda.time.DateTime
import java.util.*

class ChampionshipServiceTest : WordSpec() {

    private val championshipRepository = mockk<ChampionshipDAO>()
    private val userRepository = mockk<UserDAO>()
    private val userByChampionshipRepository = mockk<UserByChampionshipDAO>()
    private val service = ChampionshipService(championshipRepository, userRepository, userByChampionshipRepository)

    override suspend fun beforeSpec(spec: Spec) {
        clearAllMocks()
    }

    init {
        "ChampionshipService" When {
            "create" should {
                "return a pair with id and championship name" {
                    val request = CreateChampionshipRequest("championship1", listOf(Language.SPANISH),
                        VisibilityType.PRIVATE, DateTime.now(), DateTime.now().plusDays(3), "someOwner")

                    val championship = Championship(
                        name = request.name,
                        visibility = request.visibility,
                        startDate = request.startDate.toDate(),
                        finishDate = request.finishDate.toDate(),
                        languages = request.languages,
                        ownerUsername = "someOwner"
                    )

                    val userByChampionship = UserByChampionship(
                        UserByChampionshipId(
                            championship.idChampionship,
                            "someOwner",
                            Language.SPANISH.ordinal
                        ), null, 0
                    )
                    every { userRepository.findByUsername("someOwner") } returns listOf(User())
                    every { championshipRepository.save(any()) } returns championship
                    every { userByChampionshipRepository.save(any()) } returns userByChampionship
                    service.create(request) shouldBe Pair(0L, "championship1")
                }
            }
            "addUser" should {
                "return unit (and that's fine)" {
                    val request = CreateChampionshipRequest("championship1", listOf(Language.SPANISH),
                        VisibilityType.PRIVATE, DateTime.now(), DateTime.now().plusDays(3), "someOwner")

                    val championship = Championship(
                        name = request.name,
                        visibility = request.visibility,
                        startDate = request.startDate.toDate(),
                        finishDate = request.finishDate.toDate(),
                        languages = request.languages,
                        ownerUsername = "someOwner"
                    )

                    val userByChampionship = UserByChampionship(
                        UserByChampionshipId(
                            championship.idChampionship,
                            "someOwner",
                            Language.SPANISH.ordinal
                        ), null, 0
                    )
                    every { userRepository.findByUsername("someUsername") } returns listOf(User("someUsername"))
                    every { championshipRepository.findByIdChampionship(0L) } returns listOf(championship)
                    every { userByChampionshipRepository.save(any()) } returns userByChampionship

                    service.addUser(0L, "someUsername") shouldBe Unit
                }
                "return UnknownUserException" {
                    every { userRepository.findByUsername("someUsername") } returns emptyList()

                    shouldThrowExactly<UnknownUserException> {
                        service.addUser(0L, "someUsername")
                    } shouldHaveMessage "User with username someUsername not found"
                }

                "return ChampionshipNotFoundException" {
                    every { championshipRepository.findByIdChampionship(0L) } returns emptyList()
                    every { userRepository.findByUsername("someUsername") } returns listOf(User("someUsername"))

                    shouldThrowExactly<ChampionshipNotFoundException> {
                        service.addUser(0L, "someUsername")
                    } shouldHaveMessage "There isn't a championship with id: 0"
                }
            }
            "findByType" should {
                "return ChampionshipResponse" {
                    val championshipResponse = ChampionshipResponse(
                        idChampionship = 0L,
                        name = "championship1",
                        visibility = VisibilityType.PUBLIC,
                        startDate = DateTime.now().toDate(),
                        finishDate = DateTime().plusDays(3).toDate(),
                        languages = listOf(Language.SPANISH),
                        ownerUsername = "someOwner"
                    )
                    val championship = Championship(
                        name = "championship1",
                        visibility = VisibilityType.PUBLIC,
                        startDate = DateTime.now().toDate(),
                        finishDate = DateTime().plusDays(3).toDate(),
                        languages = listOf(Language.SPANISH),
                        ownerUsername = "someOwner"
                    )

                    every { championshipRepository.findByVisibility(VisibilityType.PUBLIC) } returns listOf(championship)

                    service.findByType().get(0).idChampionship shouldBe championshipResponse.idChampionship
                    service.findByType().get(0).name shouldBe championshipResponse.name
                    service.findByType().get(0).languages shouldBe championshipResponse.languages
                    service.findByType().get(0).ownerUsername shouldBe championshipResponse.ownerUsername
                    service.findByType().get(0).visibility shouldBe championshipResponse.visibility
                }
            }
            "findById" should {
                "return ChampionshipResponse" {
                    val championshipResponse = ChampionshipResponse(
                        idChampionship = 0L,
                        name = "championship1",
                        visibility = VisibilityType.PUBLIC,
                        startDate = DateTime.now().toDate(),
                        finishDate = DateTime().plusDays(3).toDate(),
                        languages = listOf(Language.SPANISH),
                        ownerUsername = "someOwner"
                    )
                    val championship = Championship(
                        name = "championship1",
                        visibility = VisibilityType.PUBLIC,
                        startDate = DateTime.now().toDate(),
                        finishDate = DateTime().plusDays(3).toDate(),
                        languages = listOf(Language.SPANISH),
                        ownerUsername = "someOwner"
                    )

                    every { championshipRepository.findByIdChampionship(0L) } returns listOf(championship)

                    service.findById(0L).idChampionship shouldBe championshipResponse.idChampionship
                    service.findById(0L).name shouldBe championshipResponse.name
                    service.findById(0L).languages shouldBe championshipResponse.languages
                    service.findById(0L).ownerUsername shouldBe championshipResponse.ownerUsername
                    service.findById(0L).visibility shouldBe championshipResponse.visibility
                }
                "return ChampionshipNotFoundException" {

                    every { championshipRepository.findByIdChampionship(0L) } returns listOf()

                    shouldThrowExactly<ChampionshipNotFoundException> {
                        service.findById(0L)
                    } shouldHaveMessage "There isn't a championship with id: 0"
                }
            }
            "scoreForChampionship" should {
                "return ChampionshipResponse" {
                    val userByChampionship = UserByChampionship(UserByChampionshipId(0L, "someUsername", 0), null, 100L)

                    val championshipScoreResponse = ChampionshipScoreResponse(
                        idChampionship = 0L,
                        scores = listOf(ScoreByUser(100L, "someUsername")))

                    every { userByChampionshipRepository.findByUserByChampionshipIdIdChampionshipOrderByScoreAsc(0L) } returns listOf(userByChampionship)

                    service.scoreForChampionship(0L) shouldBe championshipScoreResponse
                }

                "return ChampionshipNotFoundException" {

                    every { userByChampionshipRepository.findByUserByChampionshipIdIdChampionshipOrderByScoreAsc(0L) } returns listOf()

                    shouldThrowExactly<ChampionshipNotFoundException> {
                        service.scoreForChampionship(0L)
                    } shouldHaveMessage "There isn't a championship with id: 0"
                }
            }
            "updateScoreAtEndOfDay" should {
                "update correctly score" {
                    clearAllMocks()
                    every { userByChampionshipRepository.updateScoreAtEndOfDayWithMaxPoints(7, any()) } returns Unit
                    service.updateScoreAtEndOfDay() shouldBe Unit
                }
            }
        }
    }
}
