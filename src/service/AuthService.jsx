import axios from "axios";

// customers

export const getCustomers = async (url, token) => {
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

// Overview
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



// communication
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


