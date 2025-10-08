import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    Grid, 
    TextField, 
    Typography 
} from "@mui/material"
import { FormikValues, useFormik } from "formik"
import { NoteValidation } from "../../../shared/validationSchemas"
import { Dispatch, SetStateAction, useState } from "react"
import { AxiosError } from "axios"
import { updateNote } from "../api"
import { Note } from "../../../types/Note"

type props = {
    title: string,
    content: string,
    _id: string,
    isEditClicked: boolean,
    setIsEditClicked: Dispatch<SetStateAction<boolean>>,
    onEditNote: () => void
}

export const EditNote = ({title, content, _id, isEditClicked, setIsEditClicked, onEditNote}: props) => {
    const handleSave = async(values: FormikValues) => {
        try{
            await updateNote(_id, values as Pick<Note, 'title' | 'content'>)
            onEditNote() //to refresh notes
            setIsEditClicked(false)
        }catch(err){
            const error = err as AxiosError<{message: string}>
            setErrMsg(error.response?.data?.message || 'failed to save note')
        }
    }
    const [errMsg, setErrMsg] = useState<string | null>(null)
    const formik = useFormik({
        initialValues: {
            title: title,
            content: content
        },
        validationSchema: NoteValidation,
        onSubmit: handleSave
    })
    const fields = [
        {label: 'Title', name: 'title'},
        {label: 'Content', name: 'content'},
    ]
    return(
        <>
            {errMsg ? 
                <Typography variant="h2" color="error">{errMsg}</Typography> :
                <Dialog open={isEditClicked} onClose={()=> setIsEditClicked(false)}>
                    <DialogTitle>Edit Note</DialogTitle>
                    <DialogContent>
                        <form onSubmit={formik.handleSubmit}>
                            {fields.map(field => {
                                    const fieldError: string | undefined = formik.errors[field.name as keyof typeof formik.initialValues]
                                    const touchedField: boolean | undefined = formik.touched[field.name as keyof typeof formik.initialValues]
                                    return <Grid key={`editNote-${field.name}-field`}>
                                        <Typography>{field.label}</Typography>
                                        <TextField
                                            name={field.name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values[field.name as keyof typeof formik.initialValues]}
                                            error={touchedField && (Boolean(fieldError))}
                                            helperText={touchedField && fieldError ? fieldError : ''}
                                        />
                                    </Grid>
                            })}
                            <DialogActions>
                                <Button type="submit" color="success" variant="contained">Save Changes</Button>
                                <Button variant="outlined" onClick={()=> setIsEditClicked(false)}>Cancel</Button>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Dialog>
            }
        </>
    )
}