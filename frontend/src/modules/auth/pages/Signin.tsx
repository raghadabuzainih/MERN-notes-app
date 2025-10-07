import { Signin } from "../components/Signin"
import { Typography, Container } from "@mui/material"

export const SigninPage = () => {
    return(
        <Container>
            <Typography variant={'h5'}>Sign up page</Typography>
            <Signin />
        </Container>
    )
}