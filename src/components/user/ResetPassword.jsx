import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import Container from "../Container"

const ResetPassword = () => {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        otp: "",
        email: "",
        newPassword: "",
        confirmPassword: ""
    })

    const handleChange = ({target: {name, value}}) => {
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(values.newPassword !== values.confirmPassword)
        {
            toast.error("Password not matched")
            return;
        }
        try 
        {
            const response = await axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}/user/reset-password`,
                data: {
                    otp: values.otp,
                    email: values.email,
                    newPassword: values.newPassword
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
        }
    }
    return (
        <Container>
            <section>
                <h1 className="title">Account</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>OTP</label>
                        <input name="otp" className="form-control" onChange={handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input name="email" type="email" className="form-control" onChange={handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label>New Password</label>
                        <input name="newPassword" type="password" className="form-control" onChange={handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input name="confirmPassword" type="password" className="form-control" onChange={handleChange} required/>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" >Reset Password</button>
                </form>
            </section>
            <section>
                <img className="left-panel" src="https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=600" alt="404" />
            </section>
        </Container>
    )
}

export default ResetPassword