import { useContext } from "react";
import AuthContext from "../auth/components/authProvider";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;