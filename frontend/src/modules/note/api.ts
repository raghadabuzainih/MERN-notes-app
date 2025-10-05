import { axiosClient } from "../../api/axiosClient";
import { Note } from "../../types/Note";

export const getAllNotes = async() : Promise<Note[]> => {
    const res = await axiosClient.get('/notes')
    return res.data
}

export const addNote = async(data: Pick<Note, 'content' | 'title'>) : Promise<Note> => {
    //user_id comes from backend -> see note.controller.ts file
    const res = await axiosClient.post('/notes', data)
    return res.data
}

export const updateNote = async(id: string, data: Pick<Note, 'content' | 'title'>) : Promise<Note> => {
    const res = await axiosClient.put(`/notes/${id}`, data)
    return res.data
}

export const deleteNote = async(id: string) : Promise<Note> => {
    const res = await axiosClient.delete(`/notes/${id}`)
    return res.data
}

export const getUserNotes = async() : Promise<Note[]> => {
    const res = await axiosClient.get(`/notes/my-notes`)
    return res.data
}

export const getNote = async(id: string): Promise<Note> => {
    const res = await axiosClient.get(`/notes/${id}`)
    return res.data
}