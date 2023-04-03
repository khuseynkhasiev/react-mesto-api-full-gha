import {Navigate} from "react-router-dom";

function ProtectedRoute({component: Component, ...props}) {
    return props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-up"/>;
}

export default ProtectedRoute;