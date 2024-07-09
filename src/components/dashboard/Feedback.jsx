import { useCallback, useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { AuthContext } from "../../context/AuthContext"
import withAuth from "../../context/withAuth"
import { getQuery, postQuery, putQuery, solutionQuery } from "../../service/UserService"

const Feedback = () => {
    const { role, userId} = useContext(AuthContext);
    const [solution, setSolution] = useState(
        {
            queryId: "",
            message: "",
        }
    )
    const [query, setQuery] = useState({
        subject: "",
        description: ""
    })

    const [allUserQueries, setAllUserQueries] = useState([])

    const handleChange = ({target: {name, value}}) => {
        setQuery({
            ...query,
            [name]: value
        })
    }

    // Add query
    const POSTAPI = `${process.env.REACT_APP_API_URL}/service/add-query`
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try 
        {
            const response = await postQuery(POSTAPI, userId, query)
            const {message} = response;

            if(message)
            {
                toast.success(message, {
                    position: "top-center",
                    autoClose: 3000,
                })
            }

            setQuery({
                ...query,
                subject: "",
                description: ""
            });
            fetchQuery()
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

    // Retrieve queries
    const fetchQueryURL = `${process.env.REACT_APP_API_URL}/service/get-queries-byId/${userId}`
    const fetchQuery = useCallback(async () => {
        try 
        {
            const response = await getQuery( fetchQueryURL)
            setAllUserQueries(response)
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
        
    },[fetchQueryURL])

    useEffect(() => {
        if(!userId) return
        fetchQuery();
    },[fetchQuery, userId])


    // Update status of the query
    const PUTAPI = `${process.env.REACT_APP_API_URL}/service/update-query`
    const updateStatus = async (id, status) => {
        try 
        {
            const response = await putQuery(PUTAPI, id, status)

            setAllUserQueries(response.queries)
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

    // Set query solution
    const SOLUTIONAPI = `${process.env.REACT_APP_API_URL}/service/query-solution`
    const querySolution = async () => {
        try 
        {
            const response = await solutionQuery(SOLUTIONAPI, solution)
            
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

    // Query form
    const createQuery = () => (
        <section className="container my-2 p-3 card" style={{width: "20rem"}}>
                <h1 className="lead">Create Query</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Subject</label>
                        <input name="subject" type="text" value={query.subject} className="form-control" onChange={handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input name="description" type="text" value={query.description} className="form-control" onChange={handleChange} required/>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" >Create</button> 
                </form>
            </section>
    )

    // Solution log
    const querySolutionLog = (query) => (
        <td>
            {query.solution.map((message,id) => (
                <div key={id}>
                    <p>{message}</p>
                    <hr />
                </div>
            ))}
        </td>
    )

    return (
        <div className="container">
            {role === "user" ? createQuery() : ""}
            <section>
                <p className="lead mb-2">Queries</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Description</th>
                            <th scope="col">Status</th>
                            {role === "user" ? <th scope="col">Solution</th> : 
                            <>
                                <th scope="col">Message</th>
                                <th scope="col">Solution</th>
                            </>
                            }
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUserQueries.map((query, id) => (
                                <tr key={id}>
                                    <td>{new Date(query.createdAt).toLocaleString()}</td>
                                    <td>{query.subject}</td>
                                    <td>{query.description}</td>
                                    <td>
                                        <select className="btn btn-secondary btn-sm" value={query.status} onChange={(e) => updateStatus(query._id, e.target.value)}>
                                            <option value="Open">Open</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Resolved">Resolved</option>
                                        </select>
                                    </td>
                                    {role === "admin"? 
                                    <>
                                        <td>
                                            <form onSubmit={querySolution} className="d-flex m-0">
                                                <div className="p-1">
                                                    <input name="solution" className="" onChange={(e) => setSolution({queryId: query._id, message: e.target.value})} required/>
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-sm" >Send</button>
                                            </form>
                                        </td>
                                        <td>
                                            {querySolutionLog(query)}
                                        </td>
                                    </>
                                    : 
                                    <td>
                                        {querySolutionLog(query)}
                                    </td>
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default withAuth(Feedback)