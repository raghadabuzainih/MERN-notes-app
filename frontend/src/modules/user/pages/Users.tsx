import { useEffect, useState } from "react"
import { getUsers } from "../api"
import { User } from "../../../types/User"
import { Card, CardContent, Container, Typography } from "@mui/material"
import { AxiosError } from "axios"

export const Users = () => {
    const [users, setUsers] = useState<User[]>([])
    const [errMsg, setErrMsg] = useState<string | null>(null)
    useEffect(()=> {
        const fetchData = async() => {
            try{
                const data = await getUsers()
                setUsers(data)
            }catch(err){
                const error = err as AxiosError<{message: string}>
                setErrMsg(error.response?.data?.message || 'failed to fetch notes')
            }
        }
        fetchData()
    }, [])
    return(
        <Container>
            {errMsg ? 
                <Typography variant="h2" color="error">{errMsg}</Typography> :
                <>
                    {users.map(user =>
                        <Card key={`user-${user._id}`} sx={{m: 1}}>
                            <CardContent>
                                <Typography>ID: {user._id}</Typography>
                                <Typography>Full Name: {user.fullName}</Typography>
                                <Typography>Email: {user.email}</Typography>
                                <Typography>Role: {user.role}</Typography>
                                <Typography>Account Created At: {user.createdAt}</Typography>
                            </CardContent>
                        </Card>
                    )}
                    {users.length === 0 && <Typography>You still not create any notes.</Typography>}
                </>
            }
        </Container>
    )
}