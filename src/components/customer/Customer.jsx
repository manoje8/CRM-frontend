import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { toast } from "react-toastify";
import "./Customer.css"
import { useNavigate } from "react-router-dom";
import withAdmin from "../../context/withAdmin";
import { getCustomers } from "../../service/AuthService";


const Customer = () => {
    const {token, setUserId} = useContext(AuthContext);

    const navigate = useNavigate()
    const [customerData, setCustomerData] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    // Fetch customer details
    const customerURI = `${process.env.REACT_APP_API_URL}/customer/get-customers`
    const fetchData = useCallback(async() => {
        setIsLoading(true);
        try 
        {
            const response = await getCustomers(customerURI,token)

            setCustomerData(response)
            setUserId(null)
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
        finally 
        {
            setIsLoading(false);
          }
    },[customerURI, token, setUserId])


    useEffect(() => {
        fetchData()
    },[fetchData])

    // Overview handler
    const handleClick = (id) => {
        setUserId(id)
        localStorage.setItem("userId", id)
        navigate('/overview')
    }


    const customerTable = () => (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Company</th>
                    <th scope="col">Email Address</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Title</th>
                </tr>
            </thead>
            <tbody>
                {
                    isLoading ? (
                        <tr>
                          <td colSpan={8}>Loading...</td> 
                        </tr>
                      ) : customerData.length === 0 ? (
                        <tr>
                          <td colSpan={8}>No customers found</td>
                        </tr>
                      ) :
                        (customerData.map((data, id) => (
                        <tr key={id} className="table-body" onClick={() => handleClick(data._id)}>
                            <th scope="row">{id+1}</th>
                            <td>{data.name}</td>
                            <td>{data.status}</td>
                            <td>{data.company}</td>
                            <td>{data.email}</td>
                            <td>{data.phone}</td>
                            <td>{data.title}</td> 
                            
                        </tr>)
                    ))
                }
            </tbody>
        </table>
    )

    return (
        <div className="container-fluid customer-container">
            <div className="customer-nav">
                
                

                <div className="d-flex">
                    <a className="btn btn-secondary" href="/create-new">Create New</a>
                    
                </div>
            </div>
            <div className="container p-4">
            {customerTable()}
            </div>
        </div>
    )
}

export default withAdmin(Customer)