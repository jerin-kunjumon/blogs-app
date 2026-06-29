import {Navigate, Outlet} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = () => {
    const {user, loading} = useAuth()

    if(loading) {
        return(
            <div className="flex justify-center items-center h-screen">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"></div>
            </div>
        )
    }
    if(!user) {
        return <Navigate to="/login" replace/>

    }
        return <Outlet />
}

export default ProtectedRoute