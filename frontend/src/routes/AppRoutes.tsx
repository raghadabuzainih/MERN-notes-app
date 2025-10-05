import { Route, Routes } from "react-router-dom"
import { Notes } from "../modules/note/pages/Notes"

export const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/notes" element={<Notes />}/>
        </Routes>
    )
}