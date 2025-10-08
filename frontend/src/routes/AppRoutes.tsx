import { Route, Routes } from "react-router-dom"
import { SignupPage } from "../modules/auth/pages/Signup"
import { UserNotes } from "../modules/note/pages/UserNotes"
import { SigninPage } from "../modules/auth/pages/Signin"
import { NotFoundPage } from "../pages/NotFound"
import { Notes } from "../modules/note/pages/Notes"
import { Users } from "../modules/user/pages/Users"

export const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/auth/signup" element={<SignupPage />} />
            <Route path="/auth/signin" element={<SigninPage />} />
            <Route path="/users" element={<Users />}/>
            {/* for admin only */}
            <Route path="/notes" element={<Notes />} />
            {/* for current user */}
            <Route path="/notes/my-notes" element={<UserNotes />}/>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}