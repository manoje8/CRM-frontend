import { useState } from "react"
import Container from "../Container"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../Spinner";

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    // For spinner
    const [loading, setLoading] = useState(false)

    const handleChange = ({target: {value}}) => {
        setEmail(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try 
        {
            const response = await axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}/user/forgot-password`,
                data: {
                  email: email
                }
            })

            const {message} = response.data;

            if(message)
            {
                toast.success(message, {
                    position: "top-center",
                    autoClose: 3000,
                })
            }
            navigate("/user/login")
        } catch (error) 
        {
            const {data, status}  = error.response
            if(status === 400)
            {
                toast.error(data.message, {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: true
                })
            }
        } finally 
        {
            setLoading(false)
        }
    }

    return (
        <Container>
            <section>
            <img className="left-panel" src="https://images.pexels.com/photos/1723637/pexels-photo-1723637.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            </section>
            <section>
                <form onSubmit={handleSubmit}>
                    <h3 className="title">Reset Password</h3>
                    <span className="sub-title">Enter your email and we will send details on how to reset your password.</span>
                    <input type="email" className="form-control email" placeholder="Registered email address" onChange={handleChange} required/>
                    
                    {!loading ? 
                    <button type="submit" id="reset-button" className="btn btn-info btn-block">Send password reset link</button> 
                    :
                    <Spinner buttonName={"Send password reset link"}/>
                    }
                    
                    <a className="btn btn-link" href="/user/login">Back to Login</a>
                </form>
            </section>
        </Container>
)}

export default ForgotPassword