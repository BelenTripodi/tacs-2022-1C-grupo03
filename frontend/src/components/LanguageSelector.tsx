import { LANGUAGE } from '../Interfaces/Language'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { MenuItem } from '@mui/material'

const LanguageSelector = ({
    language,
    handleChange,
}: {
    language: string
    handleChange: (e: SelectChangeEvent) => void
}) => {
    return (
        <Select
            labelId="dictionary"
            id="dictionary"
            value={language.toString()}
            onChange={handleChange}
            label="language"
            displayEmpty
            sx={{ minWidth: '150px' }}
        >
            <MenuItem value={LANGUAGE.ES}>Español</MenuItem>
            <MenuItem value={LANGUAGE.EN}>Ingles</MenuItem>
        </Select>
    )
}

export default LanguageSelector
