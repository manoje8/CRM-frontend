import { useState } from "react";
import { toast } from "react-toastify";
import { addCommunication } from "../../service/AuthService"
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";

const AddCommunication  = ({userId}) => {
    const navigate = useNavigate()
    const [type, setType] = useState('');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false)


    const ADDURL = `${process.env.REACT_APP_API_URL}/communication/send-email`
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await addCommunication(ADDURL, userId, type, subject, content)
            const {message} = response;

            if(message)
            {
                toast.success(message, {
                    position: "top-center",
                    autoClose: 3000,
                })
            }
            setType('');
            setSubject('')
            setContent('');
            navigate("/overview")
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
        finally
        {
            setLoading(false)
        }
      };

    return (
        <section>
                <h3>Add Communication</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Select Type</label>
                        <select className="form-control" value={type} onChange={(e) => setType((e.target.value))} required>
                            <option value="" disabled>Select Type</option>
                            <option value="email">Email</option>
                            <option value="meeting">Meeting</option>
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label>Subject</label>
                        <input name="company" type="text" className="form-control" onChange={(e) => setSubject(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="validationTextarea">Content</label>
                        <textarea className="form-control" id="validationTextarea" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Required example textarea" required></textarea>
                        <div className="invalid-feedback">
                        Please enter a message in the textarea.
                        </div>
                    </div>
                    {!loading ? 
                    <button type="submit" className="btn btn-primary btn-block" >Add</button> 
                    :
                    <Spinner buttonName={"Sending"}/>
                    }
                    <a className="btn btn-link" href="/overview">Back</a>
                </form>
            </section>
    )
}

export default AddCommunication