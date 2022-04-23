import { useContext } from "react"
import { Navigate, Route , useLocation, Outlet} from "react-router-dom"
import { GlobalContext } from "../context/GlobalState"

function ProtectedRoute() {
    let location = useLocation();

    var {token} = useContext(GlobalContext)
    console.log(token)
    if(token!=null)
        return <Outlet />
    return <Navigate to="/" state={{ from: location }} />
}
export default ProtectedRoute