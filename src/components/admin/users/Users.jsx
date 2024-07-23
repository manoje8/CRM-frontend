import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import withAdmin from "../../../context/withAdmin";

const Users = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [userList, setUserlist] = useState([])

    const allUsersAPI = `${process.env.REACT_APP_API_URL}/user/all-users`
    const fetchUsers = useCallback( async () => {
        const response = await axios(allUsersAPI)
        setUserlist(response.data)
    },[allUsersAPI])

    useEffect(() => {
        fetchUsers()
    },[fetchUsers])

    const handleDelete = async (email) => {
        if (window.confirm('Are you sure you want to delete this user?'))
        {
            setIsLoading(true)
            const userDeleteAPI = `${process.env.REACT_APP_API_URL}/user/${email}`
            try 
            {
                const response = await axios.delete(userDeleteAPI);
                const {message} = response.data;

                if(message)
                {
                    toast.success(message, {
                        position: "top-center",
                        autoClose: 3000,
                    })
                }
                await fetchUsers();
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
                setIsLoading(false)
            }
        }
        
    }

    const handleUpdateRole = async (id, role) => {
        try 
        {
            const response = await axios({
                method: 'put',
                url: `${process.env.REACT_APP_API_URL}/user/update-role`,
                data: {
                    id: id,
                    role: role
                }
            })

            const {message} = response.data;

            if(message)
            {
                toast.success(message, {
                    position: "top-center",
                    autoClose: 3000,
                })
            }
            await fetchUsers()
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
    }

    return (
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Active</th>
                        <th scope="col">Created</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        isLoading ? (
                            <tr>
                            <td colSpan={8}>Loading...</td> 
                            </tr>
                        ) : userList.length === 0 ? (
                            <tr>
                            <td colSpan={8}>No Users found</td>
                            </tr>
                        ) :
                            (userList.map((data, id) => (
                            <tr key={id} className="table-body">
                                <th scope="row">{id+1}</th>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>
                                    <div className="input-group">
                                        <select name="source" defaultValue = {data.role} className="custom-select" id="sourceSelector" onChange={(e) => handleUpdateRole(data._id, e.target.value)}>
                                            <option value="" disabled>Select the Role</option>
                                            <option value="new">New</option>
                                            <option value="admin">admin</option>
                                            <option value="manager">manager</option>
                                            <option value="employee">employee</option>
                                        </select>
                                    </div>
                                </td>
                                <td>{data.isActivated ? "Activated" : "Not Activated"}</td>
                                <td>{new Date(data.createdAt).toLocaleString().split(',')[0]}</td>
                                <td><button className="btn btn-danger btn-sm" onClick={() => handleDelete(data.email)}>Delete</button></td>
                            </tr>)
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default withAdmin(Users)