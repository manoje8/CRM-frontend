import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AuthContext } from "../../context/AuthContext"
import withUser from "../../context/withUser"
import { addPurchase } from "../../service/UserService"

const AddPurchase = () => {
    const {token} = useContext(AuthContext)
    const navigate = useNavigate()
    const [purchase, setPurchase] = useState({
        productName: "",
        amount: "",
        quantity: "",
    })

    const handleChange = ({ target: {name, value} }) => {
        setPurchase({
            ...purchase,
            [name]: value
        })
    }

    const ADDURL = `${process.env.REACT_APP_API_URL}/customer/purchase`

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await addPurchase(ADDURL, token, purchase)
            const {message} = response;

            if(message)
            {
                toast.success(message, {
                    position: "top-center",
                    autoClose: 3000,
                })
            }
            navigate("/profile")

        } 
        catch (error) 
        {
            const {data, status}  = error.response
            if(status === 400 || status === 204)
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
        <div className="container my-3 p-2 card" style={{width: "18rem"}}>
            <h1 className="lead">Add Purchase</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Product</label>
                    <input name="productName" className="form-control" onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label>Amount</label>
                    <input name="amount" className="form-control" onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <input name="quantity" className="form-control" onChange={handleChange} required/>
                </div>
                <button type="submit" className="btn btn-primary btn-block" >Add Purchase</button> 
                <a className="btn btn-link" href="/profile">Cancel</a>
            </form>
        </div>
    )
}

export default withUser(AddPurchase)