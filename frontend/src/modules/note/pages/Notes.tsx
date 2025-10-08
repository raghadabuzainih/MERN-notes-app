import { Card, CardContent, Container, Typography } from "@mui/material"
import { getAllNotes } from "../api"
import { useEffect, useState } from "react"
import { Note } from "../../../types/Note"
import { AxiosError } from "axios"

export const Notes = () => {
    const [allNotes, setAllNotes] = useState<Note[]>([])
    const [errMsg, setErrMsg] = useState<string | null>(null)
    useEffect(()=> {
        const fetchData = async() => {
            try{
                const data = await getAllNotes()
                setAllNotes(data)
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
                    {allNotes.map(note=>
                        <Card key={`note-${note._id}`} sx={{m: 1}}>
                            <CardContent>
                                <Typography>Title: {note.title}</Typography>
                                <Typography>Content: {note.content}</Typography>
                                <Typography>Created By: {note.user_id}</Typography>
                                <Typography>Created At: {note.createdAt}</Typography>
                                <Typography>Updated At: {note.updatedAt}</Typography>
                            </CardContent>
                        </Card>
                    )}
                    {allNotes.length === 0 && <Typography>There is no notes.</Typography>}
                </>
            }
        </Container>
    )
}