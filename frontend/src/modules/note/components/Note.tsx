import { Card, CardContent, Typography } from "@mui/material";
import { Note as NoteType } from "../../../types/Note";

type props = Pick<NoteType, 'title' | 'content'>

export const Note = ({title, content}: props) => {
    return(
        <Card sx={{m:1}}>
            <CardContent>
                <Typography variant={'h5'}><b>{title}</b></Typography>
                <Typography component={'span'}>{content}</Typography>
            </CardContent>
        </Card>
    )
}