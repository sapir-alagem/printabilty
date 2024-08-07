import { useRef, useState, useEffect} from "react"
import {Link, useNavigate, useLocation} from "react-router-dom"
import './login.css';
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const LOGIN_URL = 'http://localhost:5000/auth'

const Login = () => {
    const {setAuth} = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from.pathname || '/'


    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState("")
    const [pwd , setPwd] = useState("")
    const [errMsg, setErrMsg] = useState("")

    useEffect(() => {
        userRef.current.focus()
    },[])

    useEffect(() => {
        setErrMsg()
    },[user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                LOGIN_URL, JSON.stringify({email: user, password: pwd}), 
                {headers: {'Content-Type': 'application/json'}, withCredentials: true}
            )

            const accessToken = response?.data?.accessToken
            const role = response?.data?.role

            setAuth({user, pwd, role, accessToken})
            setUser("")
            setPwd("")
            navigate(from, {replace: true})
            

        } catch (error) {
            if (!error?.response) 
            {
                setErrMsg("No response from server")
            }
            else if (error.response?.status === 404) 
            {
                setErrMsg("User not found")
            } 
            else if (error.response?.status === 401) 
            {
                setErrMsg("Invalid username or password")
            }
            else 
            {
                setErrMsg("An error occurred")
            }   
            errRef.current.focus() 
        } 
}

    return (
            <>
                <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
                <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
                <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
                {/* Include the above in your HEAD tag */}
                <div class="wrapper fadeInDown">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                  <div id="formContent">
                    {/* Tabs Titles */}
    
                    {/* Icon */}
                    <div class="fadeIn first">
                      <img src="/printer-svgrepo-com.svg" id="icon" alt="User Icon" />
                    </div>
    
                    {/* Login Form */}
                    <form onSubmit={handleSubmit}>
                      <input 
                        type="text" 
                        id="username" 
                        class="fadeIn second" 
                        name="login" 
                        placeholder="company email" 
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                        />
                      <input 
                        type="password" 
                        id="password" 
                        class="fadeIn third" 
                        name="login" 
                        placeholder="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        />
                      <input type="submit" class="fadeIn fourth" value="Log In" />
                    </form>
    
                    {/* Join Us */}
                    <div id="formFooter">
                      <a class="underlineHover" href="#">Want To Join Us?</a>
                    </div>
    
                  </div>
                </div> 
            </>
        )
}

export default Login