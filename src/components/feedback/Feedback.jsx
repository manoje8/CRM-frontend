import { useCallback, useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { AuthContext } from "../../context/AuthContext"
import withAuth from "../../context/withAuth"
import { getQuery, getUserQuery, postQuery, putQuery, solutionQuery } from "../../service/UserService"
import dateFormat from "../../utils/DateFormater"
import "./Feedback.css"

const Feedback = () => {
    const { role, userEmail} = useContext(AuthContext);
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
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = ({target: {name, value}}) => {
        setQuery({
            ...query,
            [name]: value
        })
    }

    // Post query
    const POSTAPI = `${process.env.REACT_APP_API_URL}/service/add-query`
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try 
        {
            const response = await postQuery(POSTAPI, userEmail, query)
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
    
    const fetchQuery = useCallback(async () => {
        setIsLoading(true)
        try 
        {
            const fetchQueryURL = `${process.env.REACT_APP_API_URL}/service/queries`
            const fetchUserQuery = `${process.env.REACT_APP_API_URL}/service/get-user-query/${userEmail}`

            // Get the either employee or all queries
            if(role === "employee")
            {
                const response = await getUserQuery(fetchUserQuery)
                setAllUserQueries(response)
            }else 
            {
                const response = await getQuery(fetchQueryURL)
                setAllUserQueries(response)
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
        finally
        {
            setIsLoading(false)
        }
        
    },[userEmail, role])

    useEffect(() => {
        fetchQuery();
    },[fetchQuery])


    // Update status of the query
    const PUTAPI = `${process.env.REACT_APP_API_URL}/service/update-query`
    const updateStatus = async (id, status) => {
        try 
        {
            const response = await putQuery(PUTAPI, id, status)

            setAllUserQueries(response.queries)
            const {message} = response;
            await fetchQuery();
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

    // Set solution to their respective query
    const SOLUTIONAPI = `${process.env.REACT_APP_API_URL}/service/query-solution`
    const querySolution = async (e) => {
        e.preventDefault()
        try 
        {
            const response = await solutionQuery(SOLUTIONAPI, solution)
            const {message} = response;
            await fetchQuery();
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
        <section className="container card" style={{width: "20rem"}}>
            <h1 className="lead">Create Query</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Subject</label>
                    <input name="subject" type="text" value={query.subject} className="form-control" onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" type="text" value={query.description} className="form-control" onChange={handleChange} required/>
                </div>
                <button type="submit" className="btn btn-primary btn-block" >Create</button> 
            </form>
        </section>
    )

    // Solution log
    const querySolutionLog = (query) => (
        <div className="solution-log">
            <ol>
                {query.solution.map((message, id) => (
                        
                    <li key={id}>{message}</li>
                ))}
            </ol>
        </div>
    )

    return (
        <div className="container-fluid">
            {/* Employee only can create query to management */}
            {role === "employee" ? createQuery() : ""}
            <section>
                <h2>Queries</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Name</th>
                            <th scope="col">Role</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Description</th>
                            <th scope="col">Status</th>
                            {role === "employee" ? (
                                <th scope="col">Solution</th>
                                ): (
                                <>
                                    <th scope="col">Message</th>
                                    <th scope="col">Solution</th>
                                </>
                            )}
                            
                        </tr>
                    </thead>
                    <tbody className="animated fadeInLeft">
                    {
                        isLoading ? (
                            <tr className="load">
                                <td colSpan={8}>Loading...</td> 
                            </tr>
                        ) : allUserQueries.length === 0 ? (
                            <tr className="load">
                                <td colSpan={8}>No queries found</td>
                            </tr>
                        ) :
                            allUserQueries.map((query, id) => (
                                <tr key={id}>
                                    <td>{dateFormat(query.createdAt)}</td>
                                    <td>{query.userId.name}</td>
                                    <td>{query.userId.role}</td>
                                    <td>{query.subject}</td>
                                    <td>{query.description}</td>
                                    <td>
                                        <select className="btn btn-secondary btn-sm" value={query.status} onChange={(e) => updateStatus(query._id, e.target.value)}>
                                            <option value="Open">Open</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Resolved">Resolved</option>
                                        </select>
                                    </td>
                                    {/* Management can reply to the queries */}
                                    {role !== "employee"? 
                                    <>
                                        <td>
                                            <form onSubmit={querySolution} className="query-input">
                                                <input name="solution" onChange={(e) => setSolution({queryId: query._id, message: e.target.value})} required/>
                                                <button type="submit" className="btn btn-primary btn-sm" >
                                                    <i className="bi bi-send"></i>
                                                </button>
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