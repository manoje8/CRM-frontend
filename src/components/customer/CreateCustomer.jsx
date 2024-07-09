import { useNavigate } from "react-router-dom"
import Spinner from "../Spinner"
import { useContext, useState } from "react"
import { toast } from "react-toastify"
import "./Customer.css"
import { AuthContext } from "../../context/AuthContext"
import withAuth from "../../context/withAuth"
import { createCustomerApi } from "../../service/CommonService"

const CreateCustomer = () => {
    const {token} = useContext(AuthContext)
    const navigate = useNavigate()
    // For spinner
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        company: "",
        name:"",
        email: "",
        phone: "",
        title: "",
        address: "",
        source: "",
        description: "",
        communicationMethod: "",
        fabricTypes: "",
        colors: "",
        brand: "",
    })

    const handleChange = ({target: {name, value}}) => {
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const CREATEAPI = `${process.env.REACT_APP_API_URL}/customer/create-customer`
        try 
        {
            const response = await createCustomerApi(CREATEAPI, values, token)
            const {message} = response;

            if(message)
            {
                toast.success(message, {
                    position: "top-center",
                    autoClose: 3000,
                })
            }
            navigate("/")
        } catch (error) 
        {
            setLoading(false)
            const {data, status}  = error.response
            if(status === 400 || status === 204)
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
        <div className="container customer-form my-5">
            <h4>Create</h4>
            <form onSubmit={handleSubmit}>
                <p><b>Customer Information</b></p>
                <div className="row px-5 py-2">
                    <div className="col">
                        <div className="form-group">
                            <label>Company</label>
                            <input name="company" type="text" className="form-control" onChange={handleChange} required/>
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input name="name" className="form-control" onChange={handleChange} required/>
                        </div>
                        <div className="form-group">
                            <label>Title</label>
                            <input name="title" type="text" className="form-control" onChange={handleChange} required/>
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input name="address" type="text" className="form-control" onChange={handleChange} required/>
                        </div>
                    </div>

                    <div className="col">
                        <div className="form-group">
                            <label>Email address</label>
                            <input name="email" type="email" className="form-control" onChange={handleChange} required/>
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input name="phone" type="number" className="form-control" onChange={handleChange} required/>
                        </div>
                        <div className="form-group">
                            <label>Source</label>
                            <div className="input-group mb-3">
                                <select name="source" className="custom-select" id="sourceSelector" onChange={handleChange}>
                                    <option selected defaultValue="none">None...</option>
                                    <option value="website form">website form</option>
                                    <option value="social media">Social media</option>
                                    <option value="referral">Referrral</option>
                                    <option value="marketing campign">Marketing campaign</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input name="description" type="text" className="form-control" onChange={handleChange} required/>
                        </div>
                    </div>
                </div>

                <p><b>Preferences</b></p>
                
                <div className="row px-5 py-2">
                    <div className="col">
                        <div className="form-group">
                            <label>Communication Method</label>
                            <div className="input-group mb-3">
                                <select name="communicationMethod" className="custom-select" id="communicationSelector" onChange={handleChange}>
                                    <option selected defaultValue="email">Email</option>
                                    <option value="metting">Meeting</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Fabric Types</label>
                            <input name="fabricTypes" type="text" className="form-control" onChange={handleChange} required/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label>Brand</label>
                            <input name="brand" type="text" className="form-control" onChange={handleChange} required/>
                        </div>
                        <div className="form-group">
                            <label>Colors</label>
                            <input name="colors" type="text" className="form-control" onChange={handleChange} required/>
                        </div>
                    </div>
                </div>

                
                <div className="d-flex justify-content-center">
                    {!loading ? 
                    <button type="submit" className="btn btn-primary" >Add</button> 
                    :
                    <Spinner buttonName={"Adding"}/>
                    }
                    <a className="btn btn-link" href="/customer">Cancel</a>
                </div>
            </form>
        </div>
    )
}

export default withAuth(CreateCustomer)