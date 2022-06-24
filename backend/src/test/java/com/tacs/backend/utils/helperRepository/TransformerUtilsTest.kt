package com.tacs.backend.utils.helperRepository

import com.tacs.backend.entity.Championship
import com.tacs.backend.request.Language
import com.tacs.backend.request.VisibilityType
import com.tacs.backend.response.ChampionshipResponse
import com.tacs.backend.utils.getChampionshipResponse
import io.kotest.core.spec.style.WordSpec
import io.kotest.matchers.shouldBe
import org.joda.time.DateTime

class TransformerUtilsTest : WordSpec() {
    init {
        val dateChampionship = DateTime(1655939985000).toDate()
        "getChampionshipResponse" should {
            "transform Championship entity into ChampionshipResponse" {
                getChampionshipResponse(
                    Championship(
                        idChampionship = 1,
                        languages = listOf(Language.SPANISH, Language.ENGLISH),
                        name = "aChampionship",
                        visibility = VisibilityType.PUBLIC,
                        startDate = dateChampionship,
                        finishDate = dateChampionship,
                        ownerUsername = "anUsername"
                    )
                ) shouldBe ChampionshipResponse(
                    idChampionship = 1,
                    languages = listOf(Language.SPANISH, Language.ENGLISH),
                    name = "aChampionship",
                    visibility = VisibilityType.PUBLIC,
                    startDate = dateChampionship,
                    finishDate = dateChampionship,
                    ownerUsername = "anUsername"
                )
            }
        }
    }
}