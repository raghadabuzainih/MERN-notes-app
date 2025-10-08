import { signin } from "../api"
import { Formik,Form, FormikValues } from "formik"
import { initialLogin } from "../../../shared/initialValues"
import { LoginValidation } from "../../../shared/validationSchemas"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { AxiosError } from "axios"
import { User } from "../../../types/User"
import { AlertMessage } from "../../../components/AlertMessage"

const fields = [
    {label: 'Email', name: 'email'},
    {label: 'Password', name: 'password'},
]

export const Signin = () => {
    const navigate = useNavigate()
    const [errMsg, setErrMsg] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false)

    const handleSubmit = async(values: FormikValues) => {
        try{
            const user = await signin(values as Pick<User, "email" | "password">)
            setErrMsg(null)
            setSuccess(true)
            setTimeout(()=> { //to make success alert appear before moving to another page
                if(user.role === 'admin') navigate('/notes')
                else navigate('/notes/my-notes')
            }, 1000)
        }catch(err){
            const error = err as AxiosError<{message: string}>
            const message = error.response?.data?.message || "failed to sign in"
            setErrMsg(message)
            setSuccess(false)
        }
    }
    return(
        <>
            <Formik
                initialValues={initialLogin}
                validationSchema={LoginValidation}
                onSubmit={handleSubmit}
            >
                {({values, errors, touched, handleChange, handleBlur})=> (
                    <Form>
                        {
                            fields.map(field => {
                                const fieldValue: string = values[field.name as keyof typeof initialLogin]
                                const fieldError: string | undefined = errors[field.name as keyof typeof initialLogin]
                                const touchedField: boolean | undefined = touched[field.name as keyof typeof initialLogin]
                                //incorrect password this response come from back (see auth.service.ts)
                                //just appear when submit form because if we want to check every character we enterd from back (using onChange) than performance will decreased
                                const incorrectPassword: boolean = field.name === 'password' && errMsg === 'incorrect password'
                                return <Grid key={`signup-${field.name}-field`}>
                                    <Typography>{field.label}</Typography>
                                    <TextField
                                        name={field.name}
                                        onChange={(e)=> {
                                            handleChange(e)
                                            setErrMsg(null) //remove error message while typing because error message will appear only when click submit because it's come from back
                                        }}
                                        onBlur={handleBlur}
                                        value={fieldValue}
                                        error={touchedField && (Boolean(fieldError) || incorrectPassword)}
                                        helperText={touchedField && fieldError ? fieldError : incorrectPassword ? errMsg : ''}
                                        //property for validation schema then response come from back for email field
                                    />
                                </Grid>
                            })
                        }
                        <Button type="submit">Sign in</Button>
                    </Form>
                )}
            </Formik>
            <AlertMessage 
                severity="error"
                message="Signin operation failed"
                open={errMsg !== null}
                onClose={()=> setErrMsg(null)}
            />
            <AlertMessage 
                severity="success"
                message="Welcome back!"
                open={success}
                onClose={()=> setSuccess(false)}
            />
        </>
    )
}