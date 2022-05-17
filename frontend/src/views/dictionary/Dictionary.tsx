import React, { useRef, useState } from 'react'
import { Input, Container, Typography } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import Loading from '../../components/Loading'
import HttpClient from './../../services/client/index'
import { LANGUAGE } from '../../Interfaces/Language'
import LanguageSelector from '../../components/LanguageSelector'

import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from './../../context/UserContext';

interface IMeaning {
    word: string | undefined
    definition: string
}

const Dictionary = () => {
    let navigate = useNavigate();

    const { logout } = useContext(UserContext);

    const [language, setLanguage] = useState(LANGUAGE.ES.toString())
    const [meaning, setMeaning] = useState<IMeaning>({
        word: '',
        definition: '',
    })
    const inputRef = useRef<HTMLInputElement>()
    const [loading, setLoading] = useState(false)

    const getMeaning = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        try {
            if (event.key === 'Enter') {
                setLoading(true)
                const word = inputRef.current?.value
                const response = await HttpClient.httpGet('/dictionary', {
                    word,
                    language,
                })
                setMeaning({
                    word,
                    definition: response!.data.definition,
                })
            }
        } catch (error: any) {
            if(error?.response?.status === 401 || error?.response?.status === 403){
                logout();
                navigate("/login");
                return;
            }

            console.log('Error fetching meaning', { error })
            setMeaning({
                word: '',
                definition: '',
            })
        } finally {
            setLoading(false)
        }
    }

    const handleLanguageChange = (e: SelectChangeEvent): void => {
        setLanguage(e.target.value)
    }

    if (loading) return <Loading />

    return (
        <>
            <Typography align="center" variant="h2" marginTop="2rem">
                Diccionario
            </Typography>
            <Typography align="center" variant="subtitle1">
                Qué querés buscar?
            </Typography>
            <Container
                maxWidth="sm"
                sx={{
                    '&>*:not(last-child)': { margin: '1rem' },
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <LanguageSelector
                    language={language}
                    handleChange={handleLanguageChange}
                />
                <Container sx={{ display: 'flex', alignItems: 'center' }}>
                    <Input
                        inputRef={inputRef}
                        autoFocus={true}
                        placeholder="Search..."
                        onKeyUp={getMeaning}
                    />
                </Container>
            </Container>

            {!meaning.word ? (
                <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h4" fontStyle="italic" color="#afb5b5">
                        Busque una palabra...
                    </Typography>
                </Container>
            ) : (
                <Container sx={{ '&>*:not(last-child)': { margin: '1rem 0' } }}>
                    <Typography variant="h4" fontStyle="italic">
                        {meaning.word.charAt(0).toUpperCase() +
                            meaning.word.slice(1)}
                    </Typography>
                    <Typography paragraph>{`${
                        meaning.definition.charAt(0).toUpperCase() +
                        meaning.definition.slice(1)
                    }`}</Typography>
                </Container>
            )}
        </>
    )
}

export default Dictionary
