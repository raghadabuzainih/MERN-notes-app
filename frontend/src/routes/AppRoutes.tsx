import { Route, Routes } from "react-router-dom"
import { SignupPage } from "../modules/auth/pages/Signup"
import { Notes } from "../modules/note/pages/Notes"
import { SigninPage } from "../modules/auth/pages/Signin"
import { NotFoundPage } from "../pages/NotFound"

export const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/notes" element={<Notes />}/>
            <Route path="/auth/signup" element={<SignupPage />} />
            <Route path="/auth/signin" element={<SigninPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}