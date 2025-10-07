import { Container, Typography } from "@mui/material"
import { Signup } from "../components/Signup"

export const SignupPage = () => {
    return(
        <Container>
            <Typography variant={'h5'}>Sign up page</Typography>
            <Signup />
        </Container>
    )
}