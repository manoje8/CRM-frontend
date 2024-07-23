import axios from "axios"

// Fetch all the users (Admin)
export const getUsers = async (url) => {
    try 
    {
        const response = await axios(url)
        return response.data
    } 
    catch (error) 
    {
        throw error
    }
}



// Add service to the customer(Admin -> Manager -> Employee)
export const updateCustomerAssign = async (url, id, value, role) => {
    try 
    {
        const response = await axios(
            {
                method: 'put',
                url: url,
                data: {
                    id,
                    userMail: value,
                    role,
                }
            }
        )

        return response.data
    } 
    catch (error) 
    {
        throw error
    }
}


//  Feedback

// Add the query
export const postQuery = async(url, email, payload) => {
    try 
    {
        const response = await axios({
            method: 'post',
                url: url,
                data: {
                    userEmail: email,
                    subject: payload.subject,
                    description: payload.description
                }
        })
        return response.data
    } 
    catch (error) 
    {
        throw error
    }
}

// Fetch the queries
export const getQuery = async (url) => {
    try 
    {
        const response = await axios(url)
        return response.data
    } 
    catch (error) 
    {
        throw error
    }
}

// Update the status of the query
export const putQuery = async (url, id, payload) => {
    try 
    {
        const response = await axios(
        {
            method: 'put',
            url: url,
            data: {
                queryId: id,
                status: payload,
            }
        }
        )
        return response.data
    } 
    catch (error) 
    {
        throw error
    }
}

// Give solution to the query
export const solutionQuery = async (url, payload) => {
    try 
    {
        const response = await axios(
        {
            method: 'put',
            url: url,
            data: {
                queryId: payload.queryId,
                message: payload.message
            }
        }
        )
        return response.data
    } 
    catch (error) 
    {
        throw error
    }
}