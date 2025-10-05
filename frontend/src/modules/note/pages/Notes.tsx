import { Note } from "../components/Note";
import { Note as NoteType } from "../../../types/Note";
import { getAllNotes } from "../api";
import { GridLegacy as Grid, Container } from "@mui/material";
import { useEffect, useState } from "react";

export const Notes = () => {
    const [notes, setNotes] = useState<NoteType[]>([])
    useEffect(()=> {
        const fetchData = async() => {
            const data = await getAllNotes()
            setNotes(data)
        }
        fetchData()
    }, [])

    return(
        <Container>
            <Grid container spacing={2}>
                {notes.map(note =>
                    <Note
                        key={`note-${note._id}`} 
                        title={note.title}
                        content={note.content}
                    />
                )}
            </Grid>
        </Container>
    )
}