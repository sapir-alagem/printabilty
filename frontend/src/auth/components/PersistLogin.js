import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refreshToken = useRefreshToken();
    const {auth, persist} = useAuth();

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try{
                await refreshToken();
            }
            catch(error){
                console.error('Error verifying refresh token:', error);
            }
            finally{
                isMounted && setIsLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => {isMounted = false;}
    },[])

    return(
        <>
            {!persist
                ? <Outlet /> 
                :isLoading 
                    ? <div>Loading...</div> 
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin;