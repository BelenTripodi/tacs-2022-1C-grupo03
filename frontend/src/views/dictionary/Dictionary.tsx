import React, { useRef, useState } from "react";
import { Input, Container, Typography, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Loading from "../../components/Loading";
import httpClient from './../../services/client/index';

const axios = require('axios').default;


interface IMeaning {
    word: string | undefined,
    definitions: string[]
}

const Dictionary = () =>{
    const [ language, setLanguage ] = useState(0)
    const [meaning, setMeaning ] = useState<IMeaning>({word: '', definitions: []})
    const inputRef = useRef<HTMLInputElement>()
    const [loading, setLoading] = useState(false)

    const getMeaning = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        try {
            if(event.key === 'Enter'){
                setLoading(true)
                const word = inputRef.current?.value
                const response = await httpClient.get("/dictionary",{params: {word,language: 0}})
                setMeaning({word, definitions: response.data.definitions})
            }
        } catch (error) {
            console.log("Error fetching meaning", { error })
        } finally {
            setLoading(false)
        }
    }

    const handleDictionaryChange = (e: SelectChangeEvent) : void => {
        setLanguage(Number(e.target.value))
    }

    if(loading) return <Loading />

    return(
        <>
            <Container
                maxWidth='sm'
                sx={{'&>*:not(last-child)': {margin:'1rem'}, display:'flex', alignItems:'center'}}>
                <Select
                    labelId="dictionary"
                    id="dictionary"
                    value={language.toString()}
                    onChange={handleDictionaryChange}
                    label="Age"
                    displayEmpty
                    sx={{minWidth: '300px'}}
                >
                    <MenuItem value={0}>Español</MenuItem>
                    <MenuItem value={1}>Ingles</MenuItem>
                </Select>
                <Container sx={{display:'flex', alignItems:'center'}}>
                    <Input 
                        inputRef={inputRef} 
                        autoFocus={true}
                        placeholder="Search..."
                        onKeyUp={getMeaning}
                    />
                </Container>
            </Container>

            {!meaning.word ?
            <Container sx={{display: 'flex', justifyContent:'center'}}>
                <Typography variant="h4" fontStyle="italic" color='#afb5b5'>Not found...</Typography>
            </Container>
            : 
            <Container
                sx={{'&>*:not(last-child)': {margin:'1rem 0'}}}
            >
                <Typography variant="h4" fontStyle="italic">{meaning.word}</Typography>
                {meaning.definitions.map((def, index) => 
                    <Typography paragraph key={index}>{`${index+1} : ${def}`}</Typography>
                )}
            </Container>
            }
        </>
        
    )
}

export default Dictionary;
