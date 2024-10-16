import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { AuthContext } from "../../../context/AuthContext"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getCustomers } from "../../../service/AuthService";
import "./Customer.css"
import withAuth from "../../../context/withAuth";

const Customer = () => {
    const {token, setUserId, role, userEmail} = useContext(AuthContext);

    const navigate = useNavigate()
    const [customerData, setCustomerData] = useState([])
    const [searchValue, setSearchValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    // Fetch customer details
    const customerURI = `${process.env.REACT_APP_API_URL}/customer/get-customers`
    const fetchData = useCallback(async() => {
        setIsLoading(true);
        try 
        {
            const response = await getCustomers(customerURI,token)
            switch (role) {
                case "employee":
                    const employees = response.filter(data => data.assignEmployee === userEmail)
                    setCustomerData(employees)
                    break;
                case "manager":
                    const managers = response.filter(data => data.assignManager === userEmail)
                    setCustomerData(managers)
                    break;
            
                default:
                    setCustomerData(response)
                    break;
            }
            setUserId(null)
            localStorage.removeItem("userId")
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
    },[customerURI, token, setUserId, role, userEmail])


    useEffect(() => {
        fetchData()
    },[fetchData])

    // Overview handler
    const handleClick = (id) => {
        // get the customer by ID for saving the customer Id to storage
        setUserId(id)
        localStorage.setItem("userId", id)
        navigate('/overview')
    }

    // Search handle
    const filterValue = useMemo(() => {
        return customerData.filter(data =>data.name.toLowerCase().includes(searchValue.toLowerCase()))
    }, [customerData, searchValue])


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
            <tbody className="animated fadeInUp">
                {
                    isLoading ? (
                        <tr className="load">
                          <td colSpan={8}>Loading...</td> 
                        </tr>
                      ) : customerData.length === 0 ? (
                        <tr className="load">
                          <td colSpan={8}>No customers found</td>
                        </tr>
                      ) :
                        (filterValue.map((data, id) => (
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
        <div className="container customer-container">
            <div className="customer-nav">
                <div className="search">
                    <form className="form-inline my-2 my-lg-0" role="search">
                        <i className="bi bi-search mx-2"></i>
                        <input className="form-control form-control-sm" value={searchValue}  type="search" aria-label="Search"
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Search by name" 
                        />
                        
                    </form>
                </div>

                <div className="d-flex">
                    {role === "admin" ?
                        <a className="btn btn-secondary" href="/create-new">Create New</a>
                    : ""}
                    
                </div>
            </div>
            <div className="container">
            {customerTable()}
            </div>
        </div>
    )
}

export default withAuth(Customer)