import { 
    Button, 
    Card, 
    CardActions, 
    CardContent, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle,
    Typography 
} from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { EditNote } from "./EditNote";
import { deleteNote } from "../api";
import { AxiosError } from "axios";

type props = {
    title: string,
    content: string,
    _id: string,
    onNotesUpdated: ()=> void
}

export const Note = ({title, content, _id, onNotesUpdated}: props) => {
    const [isEditClicked, setIsEditClicked] = useState<boolean>(false)
    const [isDeleteClicked, setIsDeleteClicked] = useState<boolean>(false)
    const [errMsg, setErrMsg] = useState<string | null>(null)
    const handleDelete = async() => {
        try{
            await deleteNote(_id)
            setIsDeleteClicked(false)
            onNotesUpdated()
        }catch(err){
            const error = err as AxiosError<{message: string}>
            setErrMsg(error.response?.data?.message || 'failed to delete note')
        }
    }
    return(
        <>
            {errMsg ? 
            <Typography variant="h2" color="error">{errMsg}</Typography> :
            <>
                <Card sx={{m:1}}>
                    <CardContent>
                        <Typography variant={'h5'}><b>{title}</b></Typography>
                        <Typography component={'span'}>{content}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            color="success"
                            variant="contained"
                            onClick={()=> setIsEditClicked(true)}
                        >
                            <ModeEditIcon />
                        </Button>
                        <Button
                            color="error"
                            variant="contained"
                            onClick={()=> setIsDeleteClicked(true)}
                        >
                            <DeleteIcon />
                        </Button>
                    </CardActions>
                </Card>
                {/* edit button & dialog */}
                <EditNote
                    title={title}
                    content={content}
                    _id={_id}
                    isEditClicked={isEditClicked}
                    setIsEditClicked={setIsEditClicked}
                    //to edit notes state
                    onEditNote={onNotesUpdated}
                />
                {/* delete dialog */}
                <Dialog open={isDeleteClicked} onClose={()=> setIsDeleteClicked(false)}>
                    <DialogTitle>Delete Note</DialogTitle>
                    <DialogContent>Are you sure that you want to delete it?</DialogContent>
                    <DialogActions>
                        <Button color="error" variant="contained" onClick={handleDelete}>Yes</Button>
                        <Button variant="outlined" onClick={()=> setIsDeleteClicked(false)}>No</Button>
                    </DialogActions>
                </Dialog>
            </>
            }
        </>
    )
}