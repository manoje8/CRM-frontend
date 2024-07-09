import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { toast } from "react-toastify"
import "../dashboard/Overview.css"
import LogPurchase from "../purchase/LogPurchase"
import withUser from "../../context/withUser"
import { getProfileUser } from "../../service/UserService"
import { putCustomer } from "../../service/CommonService"

const Profile = () => {

    const {token} = useContext(AuthContext)
    const [user, setUser] = useState([])
    const [editFlag, setEditFlag] = useState(false);
    const [updateValue, setUpdateValue] = useState({
        name: "",
        company: "",
        email: "",
        phone: "",
        source: "",
        address: "",
        communicationMethod: "",
        fabricTypes: "",
        colors: "",
        brand: "",
    })

    const GETURI = `${process.env.REACT_APP_API_URL}/customer/overview/token/${token}`
    const fetchUser = useCallback(async () => {
        try {
            const response = await getProfileUser(GETURI, token)
            setUser(response)
        } 
        catch (error) 
        {
            const {data, status}  = error.response
            if(status === 400 || status.error === 500)
            {
                toast.error(data.message, {
                    position: "bottom-center",
                    hideProgressBar: true
                })
            }
        }
    },[GETURI, token])

    useEffect(() => {
        fetchUser()
    },[fetchUser])

    // set userId
    localStorage.setItem("userId", user._id)
    
    // update customer
    const PUTURL = `${process.env.REACT_APP_API_URL}/customer/overview/update/${user._id}`

    const updateCustomer = async(e) => {
        e.preventDefault()
        setUser({ ...user, ...updateValue });
        try 
        {
            const response = await putCustomer(PUTURL,updateValue)
            const {message} = response;
            if(message)
            {
                toast.success(message, {
                    position: "top-center",
                    autoClose: 3000,
                })
            }
        } 
        catch (error) 
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
        finally
        {
            setEditFlag(false)
        }
    }

    // Edit handler
    const handleEdit = () => {
        setEditFlag(true);
        setUpdateValue({...user})
    }

    
    // Update handler
    const handleUpdate = ({ target:{ name, value }}) => {
        setUpdateValue({
            ...updateValue,
            [name]: value,
            preferences: {
                ...updateValue.preferences,
                [name]: value, // Update nested property based on name
            },
        })
    }

    return (
        <div className="modal-container">
            <div className="box">
                <div className="overview-title">
                    <h4>Profile</h4>
                </div>
                <div className="overview">
                    <section>
                        {user.length === 0? <a className="btn btn-secondary mb-2" href="/create-new">Create Profile</a>: ""}
                        
                        <h4>Personel Details</h4>
                        <div className="customer-details pr-3">
                            <ul>
                                <li><span><b>Name:  </b></span>{editFlag ? <input name = "name" className="form-control" value={updateValue.name} onChange={handleUpdate}/>:user.name}</li>
                                <li><span><b>Company:  </b></span>{editFlag ? <input name = "company" className="form-control" value={updateValue.company} onChange={handleUpdate}/>:user.company}</li>
                                <li><span><b>Email:  </b></span>{editFlag ? <input name = "email" className="form-control" value={updateValue.email} onChange={handleUpdate}/>:user.email}</li>
                                <li><span><b>Phone Number:  </b></span>{editFlag ? <input name = "phone" className="form-control" value={updateValue.phone} onChange={handleUpdate}/>:user.phone}</li>
                                <li><span><b>Source:  </b></span>{editFlag ? <input name = "source" className="form-control" value={updateValue.source} onChange={handleUpdate}/>:user.source}</li>
                                <li><span><b>Address:  </b></span>{editFlag ? <input name = "address" className="form-control" value={updateValue.address} onChange={handleUpdate}/>:user.address}</li>
                            </ul>
                            <p><u>Preferences</u></p>
                            <div>
                                <ul>
                                    <li><span><b>Communication Method:  </b></span>{editFlag ? <input name = "communicationMethod" className="form-control" value={updateValue.preferences.communicationMethod} onChange={handleUpdate}/>:user.preferences?.communicationMethod}</li>
                                    <li><span><b>Fabric Types:  </b></span>{editFlag ? <input name = "fabricTypes" className="form-control" value={updateValue.preferences.fabricTypes} onChange={handleUpdate}/>:user.preferences?.fabricTypes}</li>
                                    <li><span><b>Colors:  </b></span>{editFlag ? <input name = "colors" className="form-control" value={updateValue.preferences.colors} onChange={handleUpdate}/>:user.preferences?.colors}</li>
                                    <li><span><b>Brand:  </b></span>{editFlag ? <input name = "brand" className="form-control" value={updateValue.preferences.brand} onChange={handleUpdate}/>:user.preferences?.brand}</li>
                                </ul>
                            </div>
                            {editFlag ?
                                <div>
                                    <button onClick={(e) => {updateCustomer(e)}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                                        </svg>
                                    </button>
                                    <button  onClick={() => setEditFlag(false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                        </svg>
                                    </button>
                                </div>
                                        : 
                                <div>
                                    <button className="btn" onClick={() => handleEdit()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                        </svg>
                                    </button>
                                </div>
                            } 
                        </div>
                    </section>
                    <section>
                        <p className="lead mb-2">Details</p>
                        <div>
                            <a className="btn btn-success btn-block" href="/purchase">Buy</a>
                        </div>
                        <div>
                            <LogPurchase userId={user._id}/>
                        </div>
                    </section>
                </div>
            </div>
        </div>
        
    )
}

export default withUser(Profile)