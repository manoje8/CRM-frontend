import { useCallback, useContext, useEffect, useState } from "react"
import Cards from "../../Cards"
import { AuthContext } from "../../../context/AuthContext"
import { toast } from "react-toastify"
import SalesPerformance from "../../report/SalesPerformance"
import { getCustomers } from "../../../service/AuthService"
import dateFormat from "../../../utils/DateFormater"
import "./Dashboard.css"
import withAuth from "../../../context/withAuth"
import Loader from "../../Loader"


const Dashboard = () => {
    const {userName, userEmail, role} = useContext(AuthContext);
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    // Fetch customer details
    const customerURI = `${process.env.REACT_APP_API_URL}/customer/get-customers`
    const fetchCustomer = useCallback(async() => {
        setIsLoading(true)
        try 
        {
            // Role based data 
            const response = await getCustomers(customerURI)
            const filteredCustomers = role === "employee"
            ? response.filter((customer) => customer.assignEmployee === userEmail)
            : role === "manager"
              ? response.filter((customer) => customer.assignManager === userEmail)
              : response;
    
          setCustomers(filteredCustomers);
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
            setIsLoading(false)
        }
    },[customerURI, role, userEmail])


    useEffect(() => {
        fetchCustomer()
    },[fetchCustomer])


    // Analysis the customer data
    const qualifiedUser = customers.length > 0 ? customers.filter((user) => user.status === "qualified") : [];
    const lostUser = customers.length > 0 ? customers.filter((user) => user.status === "lost") : [];
    const newlyAssigned = customers.length > 0
        ? customers.filter((user) => dateFormat(user.assignDate) === new Date().toLocaleDateString().split(",")[0])
        : [];
    

    return (
        <div className="container-fluid dashboard">
            <p className="lead text-center">Welcome {userName}</p>
            {isLoading ? (
                <Loader />
            ) : customers.length === 0 ? (
                <p >No data available. Data will appear once the customer is assigned</p>
            ) :
            <>
                <section>
                    <p className="lead">Conversion Rates</p>
                    <div className="stats animated fadeInLeft">
                        <Cards>
                            <p>Total customers: <span>{customers.length}</span></p>
                        </Cards>
                        <Cards>
                            <p>Qualified Customers: <span>{qualifiedUser.length}</span></p>
                        </Cards>
                        <Cards>
                            <p>Lost Customers: <span>{lostUser.length}</span></p>
                        </Cards>
    
                    </div>
                </section>
                <hr />
                {/* Management only see the conversion percentage */}
                <section className="animated fadeInLeft">
                    {role !== "employee" ? (
                        <Cards>
                            <p>conversion rate: <span className="lead">{((qualifiedUser.length / customers.length) * 100).toFixed(1)} %</span></p>
                        </Cards>
                        
                    ):(
                        <Cards>
                            <p>Today Assigned: <span className="lead">{newlyAssigned.length}</span></p>
                            <p>Date: <span>{dateFormat(newlyAssigned[0]?.assignDate)}</span></p>
                        </Cards>
                        ) 
                    }
                </section>
               
                <hr />
                <section className="animated fadeInUp">
                    <p className='lead'>Performance</p>
                    <SalesPerformance customers={customers}/>
                </section>
            </>}
        </div>
    )
}

export default withAuth(Dashboard)