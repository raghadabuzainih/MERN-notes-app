import { Note } from "../components/Note";
import { Note as NoteType } from "../../../types/Note";
import { getAllNotes } from "../api";
import { GridLegacy as Grid, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

export const Notes = () => {
    const [notes, setNotes] = useState<NoteType[]>([])
    const [errMsg, setErrMsg] = useState<string | null>(null)
    useEffect(()=> {
        const fetchData = async() => {
            try{
                const data = await getAllNotes()
                setNotes(data)
            }catch(err){
                const error = err as AxiosError<{message: string}>
                setErrMsg(error.response?.data?.message || 'failed to fetch notes')
            }
        }
        fetchData()
    }, [])

    return(
        <Container>
            {
                errMsg ? 
                <Typography variant="h2" color="error">{errMsg}</Typography> :
                <Grid container spacing={2}>
                    {notes.map(note =>
                        <Note
                            key={`note-${note._id}`} 
                            title={note.title}
                            content={note.content}
                        />
                    )}
                </Grid>
            }
        </Container>
    )
}