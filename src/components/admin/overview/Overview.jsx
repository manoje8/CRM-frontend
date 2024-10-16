import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../context/AuthContext"
import LogCommunication from "../../communication/LogCommunication"
import { putCustomer } from "../../../service/CommonService"
import { deleteCustomer, getCustomerById, updateCustomerStatus } from "../../../service/AuthService"
import { getUsers, updateCustomerAssign } from "../../../service/UserService"
import withAuth from "../../../context/withAuth"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "./Overview.css"


const Overview = () => {

    const {token, userId, role} = useContext(AuthContext)
    const navigate = useNavigate()

    const [customerView, setCustomerView] = useState([])
    const [users, setUsers] = useState([])
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


    // update customer by id
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

    // Update Status of the customer
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

    // Fetch users and assign service

    const fetchUsers = useCallback (async () => {
        const ALLUSERSAPI = `${process.env.REACT_APP_API_URL}/user/all-users`
        const response = await getUsers(ALLUSERSAPI);
        switch(role)
        {
            // if role is admin, he can assign manager to customer
            case 'admin':
                const managers = response.filter(value => value.role === 'manager')
                setUsers(managers)
                break;
            // if role is manager, he can assign employee to customer
            case 'manager':
                const employees = response.filter(value => value.role === 'employee')
                setUsers(employees)
                break;
            default: 
                break;
        }
    },[role])


    // Assigning users to customer Handler
    const handleAssign = async (id, value, roles) => {
        try 
        {
            const ASSIGNAPI = `${process.env.REACT_APP_API_URL}/customer/overview/update/assign`
            const response = await updateCustomerAssign(ASSIGNAPI, id, value, roles);
            const {message} = response;
            await fetchData(userId)
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

    // Handlers

    useEffect(() => {
        if(!userId) return
        fetchData(userId)
        fetchUsers()
    },[fetchData, userId, fetchUsers])

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
                    <h2>Overview</h2>
                    <div>
                        {/* <a className="btn btn-info btn-sm" href="/">Convert</a> */}
                        <button className="btn btn-warning btn-sm" onClick={() => navigate("/customer")}>Back</button>
                    </div>
                    
                </div>
                
                <div className="overview">
                    <section className="col-md-6 ">
                        <p className="lead">Personel Details</p>
                        <hr />
                        <div className="customer-details animated fadeInLeft">
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
                            <div className="action-toggle">
                                {editFlag ?
                                    <div>
                                        <button onClick={(e) => {updateCustomer(e)}}>
                                            <h4 className="update"><i className="bi bi-check-lg"></i></h4>
                                        </button>
                                        <button  onClick={() => setEditFlag(false)}>
                                            <h4 className="cancel"><i className="bi bi-x-circle"></i></h4>
                                        </button>
                                    </div>
                                            : 
                                    <div>
                                        {role !== "employee" ? 
                                        <>
                                            <button onClick={() => handleEdit()}>
                                                <h4 className="edit"><i className="bi bi-pencil-square"></i></h4>
                                            </button>
                                            {role === "admin"?
                                            <button onClick={() => handleDelete(userId)} >
                                                <h4 className="delete"><i className="bi bi-trash"></i></h4>
                                            </button>
                                            : "" }
                                        </>
                                        : ""}
                                    </div>
                                }
                                    
                            </div> 
                        </div>
                        <hr />
                        <div>
                            <LogCommunication userId={userId}/>
                        </div>
                        
                    </section>
                    <section className="user-info">
                        <p className="lead">Status</p>
                        <div className="status animated fadeInDown">
                            <div className="input-group col-md-6">
                                <select name="status" value = {customerView.status} className="custom-select" id="statusSelector" onChange={(e) => updateStatus(customerView._id, e.target.value)}>
                                    <option value="none">None</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="not contacted">Not contacted</option>
                                    <option value="contact in future">Contact in future</option>
                                    <option value="qualified"> Qualified</option>
                                    <option value="not qualified">Not qualified</option>
                                    <option value="lost">Lost</option>
                                </select>
                            </div>
                            <a className="btn btn-success" href="/communication">Connect to client</a> 
                            {/* <a className="btn btn-info" href="/feedback">Feedback</a>  */}
                        </div>
                        <hr />
                        <div className="user-description animated fadeInUp">
                            <p className="lead">Description:</p>
                            <div className="card">
                                <div><span><b>Title:  </b></span>{customerView.title}</div>
                                <div><span><b>Description:  </b></span>{customerView.description}</div>
                            </div>
                        </div>
                        <hr />
                        {role === "manager" ? 
                            <div className="input-group assign-client">
                                <label htmlFor="employeeSelector">Assign To:</label>
                                <select name="employee" className="custom-select" id="employeeSelector" value={customerView.assignEmployee || ""} onChange={(e) => handleAssign(customerView._id, e.target.value, 'employee')}>
                                    <option value="" >Select an employee</option>
                                    {users.map((user, id) => (
                                        <option key={id} value={user.email}>{user.name}</option>
                                    ))}
                                    
                                </select>
                            </div>
                            : role === "admin" ?
                                <div className="input-group assign-client">
                                    <label htmlFor="managerSelector">Assign To:</label>
                                    <select name="manager" className="custom-select" id="managerSelector" value={customerView.assignManager || ""} onChange={(e) => handleAssign(customerView._id, e.target.value, 'manager')}>
                                        <option value="" >Select a Manager</option>
                                        {users.map((user, id) => (
                                            <option  key={id} value={user.email}>{user.name}</option>
                                        ))}
                                    </select>
                                </div> : ""}
                    </section>
                </div>
            </div>
        </div>
    )
}

export default withAuth(Overview)