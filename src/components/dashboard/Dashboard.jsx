import { useCallback, useContext, useEffect, useState } from "react"
import Cards from "../Cards"
import "./Dashboard.css"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"
import { toast } from "react-toastify"
import SalesPerformance from "../report/SalesPerformance"
import withAdmin from "../../context/withAdmin"
const Dashboard = () => {
    const {token, userName} = useContext(AuthContext);
    const [customerData, setCustomerData] = useState([])


    // Fetch customer details
    const reportURI = `${process.env.REACT_APP_API_URL}/reports/conversion`
    const fetchData = useCallback(async() => {
        try 
        {
            const response = await axios(reportURI,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setCustomerData(response.data)
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
    },[reportURI, token])


    useEffect(() => {
        fetchData()
    },[fetchData])

    return (
        <div className="container dashboard p-2">
            <p className="lead text-center">Welcome {userName}</p>
            <section>
                <p className="lead">Conversion Rates</p>
                <div className="stats">
                    <Cards>
                        <p>Total customers: <span className="lead">{customerData.totalCustomers}</span></p>
                    </Cards>
                    <Cards>
                        <p>New Customers: <span className="lead">{customerData.activeCustomers}</span></p>
                    </Cards>
                    <Cards>
                        <p>conversion rate: <span className="lead">{customerData.conversionRate} %</span></p>
                    </Cards>
                </div>
            </section>
            <hr />
            <section>
                <p className='lead'>Sales Performance</p>
                <SalesPerformance />
            </section>
        </div>
    )
}

export default withAdmin(Dashboard)