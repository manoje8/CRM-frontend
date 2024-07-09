import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getPurchases } from "../../service/UserService";

const LogPurchase = ({userId}) => {

    const [purchases, setpurchases] = useState([]);

    const GETURI = `${process.env.REACT_APP_API_URL}/customer/getPurchases/${userId}`
    const fetchData = useCallback(async () => {
        try 
        {
            const response = await getPurchases(GETURI)
            setpurchases(response)
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
    },[GETURI])

    useEffect(() => {
        if(!userId) return;
        fetchData()
    },[fetchData, userId])

    return (
<section>
            <p className="lead my-2">Purchase History</p>
            <ul>
                {purchases.length === 0 ? <p className="my-5"><strong>Empty</strong></p> :
                purchases.map(purchase => (
                <div className="card" key={purchase._id}>
                    <div className="card-body">
                        <p><strong>Product Name:</strong> {purchase.productName}</p>
                        <p><strong>Amount:</strong> {purchase.amount}</p>
                        <p><strong>Quantity:</strong> {purchase.quantity}</p>
                        <p><strong>Price:</strong> {purchase.totalPrice}</p>
                    </div>
                </div>
                ))}
            </ul>
        </section>
    )
}

export default LogPurchase