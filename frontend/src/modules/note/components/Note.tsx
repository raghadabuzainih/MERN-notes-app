import { Card, CardContent, Typography } from "@mui/material";
import { Note as NoteType } from "../../../types/Note";

type props = Pick<NoteType, 'title' | 'content'>

export const Note = ({title, content}: props) => {
    return(
        <Card>
            <CardContent>
                <Typography component={'h5'}>{title}</Typography>
                <Typography component={'span'}>{content}</Typography>
            </CardContent>
        </Card>
    )
}