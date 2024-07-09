import axios from "axios"

// Profile
export const getProfileUser = async (url, token) => {
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



// purchase

export const addPurchase = async (url, token, payload) => {
    try 
    {
        const response = await axios(
        {
            method: 'post',
            url: url,
            data: {
                productName: payload.productName,
                amount: parseFloat(payload.amount),
                quantity: parseFloat(payload.quantity),
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } 
    catch (error) 
    {
        throw error
    }
}

export const getPurchases = async (url) => {
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

// Feedback

export const postQuery = async(url, id, payload) => {
    try 
    {
        const response = await axios({
            method: 'post',
                url: url,
                data: {
                    customerId: id,
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

export const putQuery = async (url, id, payload) => {
    try 
    {
        const response = await axios(
        {
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}/service/update-query`,
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