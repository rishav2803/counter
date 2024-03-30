import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {selectCurrentUser} from "../redux/userSlice";


//This is done to route the intial user directly to the login page
const ProtectedRoute = ({children}) => {
    const currentUser=useSelector(selectCurrentUser);
    if (!currentUser) {
        return <Navigate to='/login' replace></Navigate>
    }
    return children;

}

export default ProtectedRoute;
