import {  Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function  NeedToLogIn() {

return (
    <div>
        <Typography variant="h4">Log in or sign up to see this page</Typography>
        <Link to="/login/home"><Typography>Log In</Typography></Link>
        <Link to="/signup"><Typography>Sign Up</Typography></Link>
    </div>
)

}
