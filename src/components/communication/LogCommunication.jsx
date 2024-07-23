import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../home/Home.css"
import { getCommunication } from "../../service/AuthService";

const LogCommunication = ({userId}) => {
    const [communications, setCommunications] = useState([]);

    const GETURL = `${process.env.REACT_APP_API_URL}/communication/${userId}/communications`
    const fetchData = useCallback(async () => {
        try 
        {
            const response = await getCommunication(GETURL)
            setCommunications(response)
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
    },[GETURL])

    useEffect(() => {
        if (!userId) return; 
        fetchData(userId)
    },[fetchData,userId])

    return (
        <section>
            <p className="lead my-2">Communication Log</p>
            <ul>
                {communications.length === 0 ? <p className="my-5"><strong>Empty</strong></p> :
                communications.map(comm => (
                <div className="card" key={comm._id}>
                    <div className="card-body">
                        <p><strong>Type:</strong> {comm.type}</p>
                        <p><strong>Date:</strong> {new Date(comm.createdAt).toLocaleString()}</p>
                        <p><strong>Content:</strong> {comm.subject}</p>
                        <p><strong>Content:</strong> {comm.content}</p>
                    </div>
                </div>
                ))}
            </ul>
        </section>
    )
}

export default LogCommunication