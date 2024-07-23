import axios from "axios";

// Customers component

// Get the all customers
export const getCustomers = async (url) => {
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

// Fetch the customer by Id
export const getCustomerById = async (url, token) => {
    try 
    {
        const response = await axios(url,
            {
                headers: {
                    Authorization: `Bearer ${token}`
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

// Update the customer status by Id
export const updateCustomerStatus = async (url, id, payload) => {
    try 
    {
        const response = await axios(
            {
                method: 'put',
                url: url,
                data: {
                    id: id,
                    status: payload
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

// Delete the customer (Admin)
export const deleteCustomer = async (url) => {
    try 
    {
        const response = await axios(
            {
                method: 'delete',
                url: url
            }
        )

        return response.data
    } 
    catch (error) 
    {
        throw error
    }
}



// communication Component

// Post the communication
export const addCommunication = async(url, id, type, subject, content) => {
    try 
    {
        const response = await axios(
            {
                method: 'post',
                url: url,
                data: {
                    customerId: id,
                    type,
                    subject,
                    content,
                },
            }
        )
        return response.data
    } 
    catch (error) 
    {
        throw error
    }
}

// Fetch the communication log
export const getCommunication = async (url) => {
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


