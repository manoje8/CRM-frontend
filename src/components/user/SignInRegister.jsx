import { useContext, useState } from "react";
import Container from "../Container";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Spinner from "../Spinner";

const SignInRegister = () => {
    const navigate = useNavigate()
    const {setToken, setUserName, setRole, setUserEmail} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    const handleChange = ({target: {name, value}}) => {
        setValues({
            ...values,
            [name]: value
        })
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        try 
        {
            setLoading(true)
            const response = await axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}/user/login`,
                data: {
                  email: values.email,
                  password: values.password
                }
            })

            const {message, accessToken, userName, role, email} = response.data;
            // save the response date into local storage
            setUserName(userName)
            localStorage.setItem("name", userName)
            setUserEmail(email)
            localStorage.setItem("email", email)
            setRole("role", role)
            localStorage.setItem("role", role)
            setToken(accessToken);
            localStorage.setItem("token", accessToken)

            if(message)
            {
                toast.success(message, {
                    position: "top-center",
                    autoClose: 3000,
                })
            }
            navigate("/")
            navigate(0)
        } 
        catch (error) 
        {
            console.error("Authentication failed:", error);
            setToken(null);
            localStorage.removeItem("token");
            
            const {data, status}  = error.response
            if(status === 400)
            {
                toast.error(data.message, {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false
                })
            }
        }
        finally
        {
            setLoading(false)
        }
    }


    return (
    <Container>
        <section>
            <h1 className="title">Sign In</h1>
            <span className="sub-title">Sign in to access your account</span>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email address</label>
                    <input name="email" type="" className="form-control" onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input name="password" type="password" className="form-control" onChange={handleChange} required/>
                </div>
                {
                loading ? 
                ( <Spinner buttonName={"Login..."}/> ) 
                : 
                (
                    <button type="submit" className="btn btn-primary btn-block">Sign in</button>
                )
            }
                
                <p className="forgot-password mb-2">
                    <a href="/user/forgot-password">Forgotten your password?</a>
                </p>
                <select className="custom-select" id="sourceSelector" defaultValue="">
                    <option>Email: admin@gmail.com | Pass: admin</option>
                    <option>Manager: manager@gmail.com | Pass: 12345</option>
                    <option>Employee: employee@gmail.com | Pass: 12345</option>
                </select>
            </form>
        </section>
        <section id="register">
            <h1 className="title">New User?</h1>
            <span className="sub-title">Creating an account is easy. By registering, you will be able to:</span>
            <ul>
                <li>Check out faster with your saved details</li>
                <li>Discover our new features, receive news from the maison.</li>
                <li>Manage your profile and preferences</li>
            </ul>

            <a href="/user/create" className="btn btn-outline-dark btn-block">Create an account</a>
        </section>
    </Container>
)}

export default SignInRegister