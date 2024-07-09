import { useContext} from "react";
import Container from "../Container"
import { AuthContext } from "../../context/AuthContext";
import AddCommunication from "./AddCommunication";
import LogCommunication from "./LogCommunication";
import withAuth from "../../context/withAuth";

const Communication = () => {
    const {userId} = useContext(AuthContext)

    return (
        <Container>
            <AddCommunication userId={userId}/>
            <LogCommunication userId={userId}/>
        </Container>
    )
}

export default withAuth(Communication)