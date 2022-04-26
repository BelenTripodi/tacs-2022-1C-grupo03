import {useEffect, useState, createRef, RefObject } from "react";
import { Typography, Container, Input, Button } from "@mui/material";
import Loading from "../../components/Loading";
import Snackbar from '@mui/material/Snackbar';
import Alert from '../../components/Alert';
import httpClient from './../../services/client/index';

const axios = require('axios').default;


enum COLORS {
    YELLOW, GREY, GREEN
}

const colorToHex = [
    '#daee07', // amarillo
    '#96999b', // gris
    '#32b45f' // verde
]

interface ILetter {
    letter: string,
    color: COLORS
}

interface Try {
    letters: ILetter[]
}

const Helper = () =>{
    const [alertOpened, setAlertOpened] = useState(false)
    const [loading, setLoading] = useState(false)
    const wordLength = 5
    const [possibleWords, setPossibleWords] = useState([])
    
    const [inputRefs, setInputRefs ] = useState<RefObject<HTMLInputElement>[]>([])
    const [colorRefs, setColorRefs ] = useState<RefObject<HTMLDivElement>[]>([])
    const [letters, setLetters] = useState<ILetter[]>([])
    const [tries, setTries] = useState<Try[]>([])
    

    // Inicializacion de los array de Referencias a los elementos del DOM
    useEffect( () => {
        setInputRefs(Array(wordLength).fill(0).map( _ => createRef()))
        setColorRefs( Array(wordLength).fill(0).map( _ => createRef()))
        setLetters( Array(wordLength).fill(0).map( _ => {return {letter: '', color: COLORS.GREY}}))
    }, [])

    // Este useEffect es para que una vez se inicialice el inputRef, se ponga el foco en el primer input
    // La idea es que cargue esta view y ya al toque puedas ingresar caracteres
    useEffect( () => {
        if(inputRefs.length){
            inputRefs[0].current?.focus()
        }
    }, [inputRefs])


    const getDeepCopy = (arr: any[]) => {
        return JSON.parse(JSON.stringify(arr))
    }

    const handleCharInput = (index: number) => {
        const currentValue = inputRefs[index].current!.value
        const regex = /^[a-z]*$/i // solo acepto caracteres y el string vacio.
        if(!regex.test(currentValue)) return

        setLetters(prev => {
            const aux = getDeepCopy(prev)
            aux[index].letter = currentValue.length > 1? currentValue[currentValue.length - 1] : currentValue 
            // esto es para que quede solo el ultimo caracter ingresado en el input
            return [...aux]
        })
        // Cuando se detecta el ingreso de un caracter en un input, se pasa al siguiente en la lista
        inputRefs[(index+1) % wordLength].current!.focus()
    }

    const handleColorClick = (index: number) => {
        setLetters(prev => {
            const aux = getDeepCopy(prev)
            const currentColor = aux[index].color
            aux[index].color = (currentColor+1) % colorToHex.length
            return [...aux]
        })
    }

    const handleAlertClose = () => {
        setAlertOpened(false)
    }

    const newTry = () => {
        setTries([])
        setLetters( Array(wordLength).fill(0).map( _ => {return {letter: '', color: COLORS.GREY}}))
        inputRefs[0].current?.focus()
        setPossibleWords([])
    }

    const emptyInputs = () => {
        setLetters( Array(wordLength).fill(0).map( _ => {return {letter: '', color: COLORS.GREY}}))
        inputRefs[0].current?.focus()
    }
    
    // fetch
    const getHelp = async () => {
        try {
            if(inputRefs.some(ref => !ref.current!.value )){
                setAlertOpened(true)
                return
            }
            setPossibleWords([])
            setLoading(true)
            const aux = getDeepCopy(tries)
            aux.push({letters})

            const jwt = localStorage.getItem("jwt");

            const response = await httpClient.get("/help",{
                headers: {
                    "Authorization": `Bearer ${jwt}`
                },
                data: aux
            })
            
            // actualizo la lista de intentos
            setTries(prev => {
                const temp = getDeepCopy(prev)
                temp.push({letters})
                return [...temp]
            })
            setPossibleWords(response.data.possibleWords)

            // vacio los inputs y enfoco en el primero
            emptyInputs()
        } catch (error) {
            console.log("Error getting help", {error})
        } finally {
            setLoading(false)
        }
    }


    return(
        <>
                <Typography align="center" variant='h2' marginTop='2rem'>Wordle Helper</Typography>
                <Typography align="center" variant="subtitle1">If you are kinda stupid, this is the right place!</Typography>

                {/**Contenedor de los inputs*/}
                <Container 
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        '&>*':{margin: '1rem 1rem'},
                        width: '600px',
                        marginTop: '4rem'
                    }}
                >
                    {inputRefs.length && colorRefs.length && letters.length && Array(wordLength).fill(0).map( (_, index) =>
                        <Container key={index}>
                            <Input inputRef={inputRefs[index]} onChange={() => handleCharInput(index)} value={letters[index].letter}/>
                            <div  ref={colorRefs[index]} onClick={() => handleColorClick(index)} style={{background: `${colorToHex[letters[index].color]}`, minWidth:'inherit', minHeight: '20px'}}></div>
                        </Container>
                    )}
                </Container>

                {/**Contenedor de los Intentos realizados previamente*/}
                <Container sx={{textAlign: 'center'}}>
                    <Typography variant='h5'>Last tries: {tries.length === 0 && '-'}</Typography>
                    {tries.length>0 && 
                        tries.map( (_try: Try, index) => {
                            const word = _try.letters.reduce((prev: string, current : ILetter) => prev+current.letter, '')
                            return <Typography key={index} paragraph>{`${index+1}: ${word}`}</Typography>
                        })
                    }
                </Container>
        
                {/* Resultados del Helper */}
                <Container sx={{'&>*': {margin: '1.1rem 0'} ,display: 'flex', flexDirection:'column', alignItems:'center'}}>
                    <>
                        
                        <Container sx={{display: 'flex', margin: '1rem 0', justifyContent: 'space-around', width: '400px'}}>
                            <Button variant="contained"  onClick={getHelp}>Get Help!</Button>
                            <Button variant="contained" onClick={newTry}>New try</Button>
                        </Container>
                        {loading && <Loading/>}
                        {possibleWords.length > 0 &&  
                                <>
                                    {possibleWords.map( (word, index) => 
                                        <Typography key={index} paragraph>{`${index+1} : ${word}`}</Typography>
                                    )}
                                </>
                        }
                    </>
                </Container>
                <Snackbar open={alertOpened} autoHideDuration={6000} onClose={handleAlertClose}>
                    <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
                    Fullfil all the inputs
                    </Alert>
                </Snackbar>
        </>
    )
}

export default Helper;
