import React, { useState } from 'react'
import { LANGUAGE } from '../../Interfaces/Language'
import LanguageSelector from '../../components/LanguageSelector'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { Container, Select, SelectChangeEvent } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import HttpClient from './../../services/client/index'
import Loading from '../../components/Loading'
import userService from '../../services/user'

interface Result {
    points: number
    language: string
}

const Score = () => {
    const [result, setResult] = useState<Result>({
        points: 0,
        language: LANGUAGE.ES,
    })
    const [loading, setLoading] = useState(false)

    const handlePointsChange = (e: SelectChangeEvent<number>) => {
        setResult((prev) => {
            return {
                points: parseInt(e.target.value.toString()),
                language: LANGUAGE.ES,
            }
        })
    }

    const handleLanguageChange = (e: SelectChangeEvent<string>) => {
        setResult((prev) => {
            return { points: prev.points, language: e.target.value.toString() }
        })
    }
    const handleSend = async () => {
        try {
            setLoading(true)
            console.log('ID: ', userService.id())
            const response = await HttpClient.httpPost(
                `/users/${userService.id()}/score`,
                result
            )
            console.log(response)
        } catch (error) {
            console.log('Error sending results', { error })
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Container
                sx={{
                    margin: '0',
                    padding: '0',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{ margin: 'auto', marginBottom: '1rem' }}
                        >
                            <Select
                                labelId={`labelPoints`}
                                id={`points`}
                                value={result.points}
                                label="Points"
                                onChange={(e) => handlePointsChange(e)}
                            >
                                {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                                    <MenuItem key={n} value={n}>
                                        {n} points
                                    </MenuItem>
                                ))}
                            </Select>
                            <LanguageSelector
                                language={result.language}
                                handleChange={handleLanguageChange}
                            />
                        </Stack>

                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{ margin: 'auto' }}
                        >
                            <Button
                                variant="contained"
                                endIcon={<SendIcon />}
                                onClick={handleSend}
                            >
                                Send
                            </Button>
                        </Stack>
                    </>
                )}
            </Container>
        </>
    )
}

export default Score
