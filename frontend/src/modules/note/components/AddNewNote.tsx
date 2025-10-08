import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, DialogContent, DialogActions, DialogTitle, TextField, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useFormik } from 'formik';
import { initialNote } from '../../../shared/initialValues';
import { NoteValidation } from '../../../shared/validationSchemas';
import { addNote } from '../api';

type props = {
    onNoteAdded: ()=> void
}

export const AddNewNote = ({onNoteAdded}: props) => {
    const [isClicked, setIsClicked] = useState<boolean>(false)
    const formik = useFormik({
        initialValues: initialNote,
        validationSchema: NoteValidation,
        onSubmit: async(values) => {
            setIsClicked(false)
            await addNote(values)
            onNoteAdded()
        }
    })
    const fields = [
        {label: 'Title', name: 'title'},
        {label: 'Content', name: 'content'},
    ]
    return(
        <>
            <Button 
                startIcon={<AddIcon />} 
                onClick={()=> setIsClicked(true)}
                variant='contained'
                sx={{textTransform: 'none'}}
            >
                Add New Note
            </Button>
            <Dialog open={isClicked} onClose={()=> setIsClicked(false)}>
                <DialogTitle>Add New Note</DialogTitle>
                <DialogContent>
                    <form onSubmit={formik.handleSubmit}>
                        {fields.map(field => {
                                const fieldError: string | undefined = formik.errors[field.name as keyof typeof initialNote]
                                const touchedField: boolean | undefined = formik.touched[field.name as keyof typeof initialNote]
                                return <Grid key={`addNewNote-${field.name}-field`}>
                                    <Typography>{field.label}</Typography>
                                    <TextField
                                        name={field.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values[field.name as keyof typeof initialNote]}
                                        error={touchedField && (Boolean(fieldError))}
                                        helperText={touchedField && fieldError ? fieldError : ''}
                                    />
                                </Grid>
                        })}
                        <DialogActions>
                            <Button 
                                type='submit' 
                                variant='contained' 
                                color='success' 
                                sx={{textTransform: 'none'}}
                            >
                                Add
                            </Button>
                            <Button 
                                onClick={()=> setIsClicked(false)} 
                                variant='contained' 
                                sx={{textTransform: 'none'}} 
                                color='error'
                            >
                                Close
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}