import { Note } from "../components/Note";
import { Note as NoteType } from "../../../types/Note";
import { getUserNotes } from "../api";
import { GridLegacy as Grid, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { AddNewNote } from "../components/AddNewNote";

export const UserNotes = () => {
    const [notes, setNotes] = useState<NoteType[]>([])
    const [errMsg, setErrMsg] = useState<string | null>(null)
    const fetchData = async() => {
        try{
            const data = await getUserNotes()
            setNotes(data)
        }catch(err){
            const error = err as AxiosError<{message: string}>
            setErrMsg(error.response?.data?.message || 'failed to fetch notes')
        }
    }
    useEffect(()=> {
        fetchData()
    }, [])

    return(
        <Container>
            {
                errMsg ? 
                <Typography variant="h2" color="error">{errMsg}</Typography> :
                <>
                    <AddNewNote onNoteAdded={fetchData}/>
                    <Grid container spacing={2} mt={2}>
                        {notes.map(note =>
                            <Note
                                key={`note-${note._id}`}
                                title={note.title}
                                content={note.content}
                            />
                        )}
                        {notes.length === 0 && <Typography>You still not create any notes.</Typography>}
                    </Grid>
                </>
            }
        </Container>
    )
}