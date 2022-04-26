import { Container, CircularProgress } from "@mui/material"

const Loading = () => {
    return (
        <Container sx={{textAlign:'center', marginTop: '4rem'}}>
            <CircularProgress />
        </Container>
    )

}

export default Loading