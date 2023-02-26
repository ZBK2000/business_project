import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function  ProtectdRoute({children}) {
    const {user} = UserAuth()
   const navigate = useNavigate()

    if (!user){
        navigate("/needtologin")
    }
return children

}
