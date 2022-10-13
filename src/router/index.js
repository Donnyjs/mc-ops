
import { Navigate } from "react-router-dom";
import Login from "../components/Login"
import SandBox from "../components/SandBox"
import NoPermission from "../components/NoPermission";
import TxRecord from "../components/TxRecord";
import WalletBalance from "../components/WalletBalance";
import PriceControl from "../components/PriceControl";
import Home from "../components/Home";
import DiversifyFunds from "../components/Diversifyfunds"
import RecoveryFunds from "../components/RecoverFunds"



export const routerTable =  [
    {
        path: "login", 
        element: <Login/>,
    },
    {
        path: "sandBox", 
        element: localStorage.getItem("token")===""?<Login/> :<SandBox/>,
        children: [
            {
                path: "home",
                element: <Home/>
            },
            {
                path: "txRecord", 
                element: <TxRecord/>,
            },
            {
                path: "walletBalance", 
                element: <WalletBalance/>,
            },
            {
                path: "priceControl",
                element: <PriceControl/>,
            },
            {
                path: "diversifyFunds",
                element: <DiversifyFunds/>,
            },
            {
                path: "recoveryFunds",
                element: <RecoveryFunds/>,
            }
        ]
    },
    {
        path: "/", 
        element: <Navigate to={localStorage.getItem("token")===""?"login" : "sandBox"}/>
    },
    {
        path: "*",
        element: <NoPermission/>
    }
]