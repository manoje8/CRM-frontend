import { Route, Routes } from "react-router-dom"
import App from "./App"
import Home from "./components/home/Home"
import SignInRegister from "./components/user/SignInRegister"
import ForgotPassword from "./components/user/ForgotPassword"
import CreateAccount from "./components/user/CreateAccount"
import ResetPassword from "./components/user/ResetPassword"
import Error404 from "./components/Error404"
import Dashboard from "./components/dashboard/Dashboard"
import Customer from "./components/customer/Customer"
import Profile from "./components/customer/Profile"
import Feedback from "./components/dashboard/Feedback"
import CreateCustomer from "./components/customer/CreateCustomer"
import Overview from "./components/dashboard/Overview"
import Communication from "./components/communication/Communication"
import AddPurchase from "./components/purchase/AddPurchase"

const AppRoutes = () => (
    <App>
        <Routes>
            {/* Open Route */}
            <Route path="/" element= {<Home />} />
            <Route path="/user/login" element= {<SignInRegister />} />
            <Route path="/user/create" element= {<CreateAccount />}/>
            <Route path="/user/forgot-password" element= {<ForgotPassword />}/>
            <Route path="/user/reset-password" element= {<ResetPassword />}/>
            
            {/* user */}
            <Route path="/profile" element= {<Profile />} />
            <Route path="/purchase" element={<AddPurchase/>}/>

            {/* user and Admin */}
            <Route path="/create-new" element= {<CreateCustomer />} />
            <Route path="/communication" element= {<Communication />} />
            <Route path="/feedback" element= {<Feedback />} />

            {/* Admin */}
            <Route path="/dashboard" element= {<Dashboard />} />
            <Route path="/customer" element= {<Customer />} />
            <Route path="/overview" element= {<Overview />} />

            <Route path="*" element={<Error404 />}/>
        </Routes>
    </App>
)
export default AppRoutes