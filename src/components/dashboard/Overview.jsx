import { useCallback, useContext, useEffect, useState } from "react"
import "./Overview.css"
import { AuthContext } from "../../context/AuthContext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import LogCommunication from "../communication/LogCommunication"
import LogPurchase from "../purchase/LogPurchase"
import withAdmin from "../../context/withAdmin"
import { putCustomer } from "../../service/CommonService"
import { deleteCustomer, getCustomerById, updateCustomerStatus } from "../../service/AuthService"
const Overview = () => {

    const {token, userId} = useContext(AuthContext)
    const navigate = useNavigate()

    const [customerView, setCustomerView] = useState([])
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


    // To Fetch customer data
    const customerURI = `${process.env.REACT_APP_API_URL}/customer/overview/${userId}`
    const fetchData = useCallback(async() => {
        try 
        {
            const response = await getCustomerById(customerURI, token)
            setCustomerView(response)
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
    },[customerURI, token])

    useEffect(() => {
        fetchData(userId)
    },[fetchData, userId])


    // update customer
    const PUTURL = `${process.env.REACT_APP_API_URL}/customer/overview/update/${userId}`
    const updateCustomer = async(e) => {
        e.preventDefault()
        setCustomerView({...customerView, ...updateValue})
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

    // Update Status
    const STATUSURL = `${process.env.REACT_APP_API_URL}/customer/overview/update/status`
    const updateStatus = async (id, value) => {
        try 
        {
            const response = await updateCustomerStatus(STATUSURL, id, value)
            setCustomerView(response.updatedStatus)
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
            if(status === 400 || status.error === 500)
            {
                toast.error(data.message, {
                    position: "bottom-center",
                    hideProgressBar: true
                })
            }
        }
    }

    // Handle Delete
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) 
        {
            const DELETEURL = `${process.env.REACT_APP_API_URL}/customer/overview/delete/${id}`
            try 
            {
                const response = await deleteCustomer(DELETEURL)
                const {message} = response;

                if(message)
                {
                    toast.success(message, {
                        position: "top-center",
                        autoClose: 3000,
                    })
                }
                navigate("/customer")
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
    };

    // Edit handler
    const handleEdit = () => {
        setEditFlag(true);
        setUpdateValue({...customerView})
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
                    <h4>Overview</h4>
                    <button className="btn btn-warning" onClick={() => navigate("/customer")}>Back</button>
                </div>
                
                <div className="overview">
                    <section>
                        <h4>Personel Details</h4>
                        <div className="customer-details pr-3">
                            <ul>
                                <li><span><b>Name:  </b></span>{editFlag ? <input name = "name" className="form-control" value={updateValue.name} onChange={handleUpdate}/>:customerView.name}</li>
                                <li><span><b>Company:  </b></span>{editFlag ? <input name = "company" className="form-control" value={updateValue.company} onChange={handleUpdate}/>:customerView.company}</li>
                                <li><span><b>Email:  </b></span>{editFlag ? <input name = "email" className="form-control" value={updateValue.email} onChange={handleUpdate}/>:customerView.email}</li>
                                <li><span><b>Phone Number:  </b></span>{editFlag ? <input name = "phone" className="form-control" value={updateValue.phone} onChange={handleUpdate}/>:customerView.phone}</li>
                                <li><span><b>Source:  </b></span>{editFlag ? <input name = "source" className="form-control" value={updateValue.source} onChange={handleUpdate}/>:customerView.source}</li>
                                <li><span><b>Address:  </b></span>{editFlag ? <input name = "address" className="form-control" value={updateValue.address} onChange={handleUpdate}/>:customerView.address}</li>
                            </ul>
                            <p><u>Preferences</u></p>
                            <div>
                                <ul>
                                    <li><span><b>Communication Method:  </b></span>{editFlag ? <input name = "communicationMethod" className="form-control" value={updateValue.preferences.communicationMethod} onChange={handleUpdate}/>:customerView.preferences?.communicationMethod}</li>
                                    <li><span><b>Fabric Types:  </b></span>{editFlag ? <input name = "fabricTypes" className="form-control" value={updateValue.preferences.fabricTypes} onChange={handleUpdate}/>:customerView.preferences?.fabricTypes}</li>
                                    <li><span><b>Colors:  </b></span>{editFlag ? <input name = "colors" className="form-control" value={updateValue.preferences.colors} onChange={handleUpdate}/>:customerView.preferences?.colors}</li>
                                    <li><span><b>Brand:  </b></span>{editFlag ? <input name = "brand" className="form-control" value={updateValue.preferences.brand} onChange={handleUpdate}/>:customerView.preferences?.brand}</li>
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
                                            <button onClick={() => handleEdit()}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                                </svg>
                                            </button>
                                            <button>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" onClick={() => handleDelete(userId)} className="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    } 
                        </div>

                        <hr />

                        <div className="card col-md-8 mt-3">
                            <p><i>Information: </i></p>
                            <div><span><b>Title:  </b></span>{customerView.title}</div>
                            <div><span><b>Description:  </b></span>{customerView.description}</div>
                        </div>
                    </section>
                    <section className="ml-4">
                        <h4>Activity</h4>
                        <div className="d-flex justify-content-around my-3">
                            <div className="input-group col-md-3">
                                <select name="source" value = {customerView.status} className="custom-select" id="sourceSelector"onChange={(e) => updateStatus(customerView._id, e.target.value)}>
                                    <option value="new">New</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <a className="btn btn-success" href="/communication">Connect</a> 
                            <a className="btn btn-info" href="/feedback">Feedback</a> 
                        </div>
                        <div>
                            <LogCommunication userId={userId}/>
                            <hr />
                            <LogPurchase userId={userId} />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default withAdmin(Overview)