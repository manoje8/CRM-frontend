import { Route, Routes } from "react-router-dom"
import App from "./App"
import Home from "./components/home/Home"
import SignInRegister from "./components/user/SignInRegister"
import ForgotPassword from "./components/user/ForgotPassword"
import CreateAccount from "./components/user/CreateAccount"
import ResetPassword from "./components/user/ResetPassword"
import Error404 from "./components/Error404"
import Dashboard from "./components/admin/dashboard/Dashboard"
import Customer from "./components/admin/customer/Customer"
import Feedback from "./components/feedback/Feedback"
import CreateCustomer from "./components/admin/customer/CreateCustomer"
import Overview from "./components/admin/overview/Overview"
import Communication from "./components/communication/Communication"
import Users from "./components/admin/users/Users"

const AppRoutes = () => (
    <App>
        <Routes>
            <Route path="/" element= {<Home />} />
            <Route path="/user/login" element= {<SignInRegister />} />
            <Route path="/user/create" element= {<CreateAccount />}/>
            <Route path="/user/forgot-password" element= {<ForgotPassword />}/>
            <Route path="/user/reset-password" element= {<ResetPassword />}/>
            <Route path="/dashboard" element= {<Dashboard />} />
            <Route path="/create-new" element= {<CreateCustomer />} />
            <Route path="/customer" element= {<Customer />} />
            <Route path="/overview" element= {<Overview />} />
            <Route path="/users" element={<Users />} />
            <Route path="/communication" element= {<Communication />} />
            <Route path="/feedback" element= {<Feedback />} />
            <Route path="*" element={<Error404 />}/>
        </Routes>
    </App>
)
export default AppRoutes