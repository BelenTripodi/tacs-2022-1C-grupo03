import { useEffect, useState, createRef, RefObject } from 'react'
import { Typography, Container, Input, Button, MenuItem } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Loading from '../../components/Loading'
import Snackbar from '@mui/material/Snackbar'
import Alert from '../../components/Alert'
import HttpClient from './../../services/client/index'
import { LANGUAGE } from '../../Interfaces/Language'
import LanguageSelector from '../../components/LanguageSelector'

enum COLOUR {
    YELLOW = 'YELLOW',
    GRAY = 'GRAY',
    GREEN = 'GREEN',
}

const colorToHex = {
    YELLOW: { hexValue: '#daee07', next: 'GRAY' },
    GRAY: { hexValue: '#96999b', next: 'GREEN' },
    GREEN: { hexValue: '#32b45f', next: 'YELLOW' },
}

interface ILetter {
    letter: string
    colour: COLOUR
}

interface Try {
    letters: ILetter[]
}

const Helper = () => {
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
            aux[index].colour = colorToHex[currentColor].next
            return [...aux]
        })
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
            setPossibleWords(response.data.possibleWords.slice(0, 10))

            // vacio los inputs y enfoco en el primero
            emptyInputs()
        } catch (error) {
            console.log('Error getting help', { error })
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

            {/**Contenedor de los inputs*/}
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    '&>*': { margin: '1rem 1rem' },
                    width: '600px',
                    marginTop: '4rem',
                }}
            >
                {inputRefs.length &&
                    colorRefs.length &&
                    letters.length &&
                    Array(wordLength)
                        .fill(0)
                        .map((_, index) => (
                            <Container key={index}>
                                <Input
                                    inputRef={inputRefs[index]}
                                    onChange={() => handleCharInput(index)}
                                    value={letters[index].letter}
                                />
                                <div
                                    ref={colorRefs[index]}
                                    onClick={() => handleColourClick(index)}
                                    style={{
                                        background: `${
                                            colorToHex[letters[index].colour]
                                                .hexValue
                                        }`,
                                        minWidth: 'inherit',
                                        minHeight: '30px',
                                        marginTop: '1rem',
                                    }}
                                ></div>
                            </Container>
                        ))}
            </Container>

            {/**Contenedor de los Intentos realizados previamente*/}
            <Container sx={{ textAlign: 'center' }}>
                <Typography variant="h5">
                    Últimos intentos: {tries.length === 0 && '-'}
                </Typography>
                {tries.length > 0 &&
                    tries.map((_try: Try, index) => {
                        const word = _try.letters.reduce(
                            (prev: string, current: ILetter) =>
                                prev + current.letter,
                            ''
                        )
                        return (
                            <Typography key={index} paragraph>{`${
                                index + 1
                            }: ${word}`}</Typography>
                        )
                    })}
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
