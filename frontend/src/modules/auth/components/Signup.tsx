import { useState } from "react"
import { Formik, Form, FormikValues } from "formik"
import { initialRegister } from "../../../shared/initialValues"
import { registerValidation } from "../../../shared/validationSchemas"
import { signup } from "../api"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { AxiosError } from "axios"
import { User } from "../../../types/User"
import { excludedTypes } from "../../../types/shared"
import { useNavigate } from "react-router-dom"
import { AlertMessage } from "../../user/components/AlertMessage"

const fields = [
    {label: 'Full Name', name: 'fullName'},
    {label: 'Email', name: 'email'},
    {label: 'Password', name: 'password'},
    {label: 'Role', name: 'role'}
]

export const Signup = () => {
    const navigate = useNavigate()
    const [errMsg, setErrMsg] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false)
    const handleSubmit = async(values: FormikValues) => {
        try{
            const user = await signup(values as Omit<User, excludedTypes>)
            setErrMsg(null)
            setSuccess(true)
            setTimeout(()=> { //to make success alert appear before moving to another page
                if(user.role === 'admin') navigate('/notes')
                else navigate('/notes/my-notes')
            }, 1000)
        }catch(err){
            const error = err as AxiosError<{message: string}>
            const message = error.response?.data?.message || 'failed to signup'
            setErrMsg(message)
            setSuccess(false)
        }
    }
    return(
        <>
            <Formik
                initialValues={initialRegister}
                validationSchema={registerValidation}
                onSubmit={handleSubmit}
            >
                {({values, errors, touched, handleChange, handleBlur})=> (
                        <Form>
                            {
                                fields.map(field => {
                                    const fieldValue: string = values[field.name as keyof typeof initialRegister]
                                    const fieldError: string | undefined = errors[field.name as keyof typeof initialRegister]
                                    const touchedField: boolean | undefined = touched[field.name as keyof typeof initialRegister]
                                    return <Grid key={`signup-${field.name}-field`}>
                                        <Typography>{field.label}</Typography>
                                        <TextField
                                            name={field.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={fieldValue}
                                            error={touchedField && (Boolean(fieldError))}
                                            helperText={touchedField && fieldError ? fieldError : ''}
                                            //property for validation schema then response come from back for email field
                                        />
                                    </Grid>
                                })
                            }
                            <Button type="submit">Sign up</Button>
                        </Form>
                )}
            </Formik>
            <AlertMessage 
                severity="error"
                message="Signup operation failed"
                open={errMsg !== null}
                onClose={()=> setErrMsg(null)}
            />
            <AlertMessage 
                severity="success"
                message="Welcome to Notes app!"
                open={success}
                onClose={()=> setSuccess(false)}
            />
        </>
    )
}