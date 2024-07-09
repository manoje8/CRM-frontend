import axios from "axios";

export const createCustomerApi = async(url, payload, token) => {
    try 
    {
        const response = await axios({
            method: 'post',
            url:url,
            data: {
                name: payload.name,
                email: payload.email,
                phone: payload.phone,
                company: payload.company,
                title: payload.title,
                source: payload.source === ""? "none" : payload.source,
                status: payload.status === ""? "lead" : payload.status,
                description: payload.description,
                address: payload.address,
                communicationMethod: payload.communicationMethod === ""? "email" : payload.communicationMethod,
                fabricTypes: payload.fabricTypes,
                colors: payload.colors,
                brand: payload.brand,
                quantity: payload.quantity
            }, 
            headers: {
                    Authorization: `Bearer ${token}`
                }
        })

        return response.data;
    } catch (error) 
    {
        throw error;
    }
}

// update 
export const putCustomer = async (url, payload) => {
    try 
    {
        const response = await axios.put(url, payload)
        return response.data
    } 
    catch (error) 
    {
        throw error
    }
}

