import { useEffect, useState, createRef, RefObject } from 'react'
import { Typography, Container, Input, Button } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import Loading from '../../components/Loading'
import Snackbar from '@mui/material/Snackbar'
import Alert from '../../components/Alert'
import HttpClient from './../../services/client/index'
import { LANGUAGE } from '../../Interfaces/Language'
import LanguageSelector from '../../components/LanguageSelector'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from './../../context/UserContext';

enum COLOUR {
    YELLOW = 'YELLOW',
    GRAY = 'GRAY',
    GREEN = 'GREEN',
}

const nextColor = {
    YELLOW: 'GRAY',
    GRAY: 'GREEN',
    GREEN: 'YELLOW',
}

interface ILetter {
    letter: string
    colour: COLOUR
}

interface Try {
    letters: ILetter[]
}

const Helper = () => {
    let navigate = useNavigate();

    const { logout } = useContext(UserContext);

    const [alertOpened, setAlertOpened] = useState(false)
    const [loading, setLoading] = useState(false)
    const wordLength = 5
    const [possibleWords, setPossibleWords] = useState([])
    const [language, setLanguage] = useState(LANGUAGE.ES.toString())

    const [inputRefs, setInputRefs] = useState<RefObject<HTMLInputElement>[]>(
        []
    )
    const [colorRefs, setColorRefs] = useState<RefObject<HTMLDivElement>[]>([])
    const [letters, setLetters] = useState<ILetter[]>([])
    const [tries, setTries] = useState<Try[]>([])

    // Inicializacion de los array de Referencias a los elementos del DOM
    useEffect(() => {
        setInputRefs(
            Array(wordLength)
                .fill(0)
                .map((_) => createRef())
        )
        setColorRefs(
            Array(wordLength)
                .fill(0)
                .map((_) => createRef())
        )
        setLetters(
            Array(wordLength)
                .fill(0)
                .map((_) => {
                    return { letter: '', colour: COLOUR.GRAY }
                })
        )
    }, [])

    // Este useEffect es para que una vez se inicialice el inputRef, se ponga el foco en el primer input
    // La idea es que cargue esta view y ya al toque puedas ingresar caracteres
    useEffect(() => {
        if (inputRefs.length) {
            inputRefs[0].current?.focus()
        }
    }, [inputRefs])

    const getDeepCopy = (arr: any[]) => {
        return JSON.parse(JSON.stringify(arr))
    }

    const handleCharInput = (index: number) => {
        const currentValue = inputRefs[index].current!.value
        const regex = /^[a-z]*$/i // solo acepto caracteres y el string vacio.
        if (!regex.test(currentValue)) return

        setLetters((prev) => {
            const aux = getDeepCopy(prev)
            aux[index].letter =
                currentValue.length > 1
                    ? currentValue[currentValue.length - 1]
                    : currentValue
            // esto es para que quede solo el ultimo caracter ingresado en el input
            return [...aux]
        })
        // Cuando se detecta el ingreso de un caracter en un input, se pasa al siguiente en la lista
        inputRefs[(index + 1) % wordLength].current!.focus()
    }

    const handleLanguageChange = (e: SelectChangeEvent): void => {
        setLanguage(e.target.value)
    }

    const handleColourClick = (index: number) => {
        setLetters((prev) => {
            const aux = getDeepCopy(prev)
            const currentColor: COLOUR = aux[index].colour
            aux[index].colour = nextColor[currentColor]
            return [...aux]
        })
    }

    function styleForLetter(letter: ILetter) {
        if (letter.colour === COLOUR.GREEN) {
            return {
                backgroundColor: '#6aaa64',
                color: 'white'
            }
        }
        if (letter.colour === COLOUR.YELLOW) {
            return {
                backgroundColor: '#c9b458',
                color: 'white'
            }
        }
        if (letter.letter !== '') {
            return {
                backgroundColor: '#787c7e',
                color: 'white',
            }
        } else {
            return {
                borderColor: 'rgb(211, 214, 218)',
                borderWidth: '2px',
                borderStyle: 'solid',
            }
        }
    }

    const getLetterStyle = (index: number) => {
        const current = letters[index]
        return styleForLetter(current)
    }

    const handleAlertClose = () => {
        setAlertOpened(false)
    }

    const newTry = () => {
        setTries([])
        setLetters(
            Array(wordLength)
                .fill(0)
                .map((_) => {
                    return { letter: '', colour: COLOUR.GRAY }
                })
        )
        inputRefs[0].current?.focus()
        setPossibleWords([])
    }

    const emptyInputs = () => {
        setLetters(
            Array(wordLength)
                .fill(0)
                .map((_) => {
                    return { letter: '', colour: COLOUR.GRAY }
                })
        )
        inputRefs[0].current?.focus()
    }

    // fetch
    const getHelp = async () => {
        try {
            if (inputRefs.some((ref) => !ref.current!.value)) {
                setAlertOpened(true)
                return
            }
            setPossibleWords([])
            setLoading(true)
            const aux = getDeepCopy(tries)
            aux.push({ letters })

            console.log(aux)

            const response = await HttpClient.httpPost('/help', {
                tries: aux,
                language,
            })
            // actualizo la lista de intentos
            setTries((prev) => {
                const temp = getDeepCopy(prev)
                temp.push({ letters })
                return [...temp]
            })
            setPossibleWords(response!.data.possibleWords.slice(0, 10))

            // vacio los inputs y enfoco en el primero
            emptyInputs()
        } catch (error: any) {
            console.log('Error getting help', { error })
            if(error?.response?.status === 401 || error?.response?.status === 403){
                logout();
                navigate("/login");
                return;
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Typography align="center" variant="h2" marginTop="2rem">
                Wordle Helper
            </Typography>
            <Typography align="center" variant="subtitle1">
                Ingresá las 5 letras y asignales un color!
            </Typography>

            <div style={{ marginTop: '1rem' }} />

            {tries.length > 0 &&
                tries.map((_try: Try, index: number) => {
                    const word = _try.letters.map((current: ILetter, index: number) =>
                        <Container key={index} style={{ width: 'auto', margin: 0, padding:'3px' }}>
                            <Input
                                disableUnderline
                                value={current.letter}
                                style={{
                                    height: '62px',
                                    width: '62px',
                                    fontSize: '2rem',
                                    ...styleForLetter(current)
                                }}
                                sx={{
                                    '&>*': {
                                        textTransform: 'capitalize',
                                        textAlign: 'center',
                                        cursor: 'not-allowed',
                                    },
                                }}
                                readOnly={true}
                            />
                        </Container>
                    )
                    return (
                        <Container
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                '&>*': { margin: '1rem 1rem' },
                                width: '600px',
                            }}
                            key={index}
                        >
                            {word}
                        </Container>
                    )
                })}

            {/**Contenedor de los inputs*/}
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    '&>*': { margin: '1rem 1rem' },
                    width: '600px',
                }}
            >
                {inputRefs.length &&
                    colorRefs.length &&
                    letters.length &&
                    Array(wordLength)
                        .fill(0)
                        .map((_, index) => (
                            <Container key={index} style={{ width: 'auto', margin: 0, padding:'3px' }}>
                                <Input
                                    disableUnderline
                                    inputRef={inputRefs[index]}
                                    onChange={() => handleCharInput(index)}
                                    value={letters[index].letter}
                                    onClick={() => handleColourClick(index)}
                                    style={{
                                        height: '62px',
                                        width: '62px',
                                        fontSize: '2rem',
                                        ...getLetterStyle(index)
                                    }}
                                    sx={{
                                        '&>*': {
                                            textTransform: 'capitalize',
                                            textAlign: 'center',
                                            cursor: 'pointer'
                                        },
                                    }}
                                />
                            </Container>
                        ))}
            </Container>

            {/* Resultados del Helper */}
            <Container
                sx={{
                    '&>*': { margin: '1.1rem 0' },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <>
                    <Container
                        sx={{
                            display: 'flex',
                            margin: '1rem 0',
                            justifyContent: 'space-around',
                            width: '500px',
                        }}
                    >
                        <LanguageSelector
                            language={language}
                            handleChange={handleLanguageChange}
                        />
                        <Button variant="contained" onClick={getHelp}>
                            Buscar
                        </Button>
                        <Button variant="contained" onClick={newTry}>
                            Reiniciar
                        </Button>
                    </Container>
                    {loading && <Loading />}
                    {possibleWords.length > 0 && (
                        <>
                            {possibleWords.map((word, index) => (
                                <Typography key={index} paragraph>{`${
                                    index + 1
                                } : ${word}`}</Typography>
                            ))}
                        </>
                    )}
                </>
            </Container>
            <Snackbar
                open={alertOpened}
                autoHideDuration={6000}
                onClose={handleAlertClose}
            >
                <Alert
                    onClose={handleAlertClose}
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    Llena todas las letras
                </Alert>
            </Snackbar>
        </>
    )
}

export default Helper
