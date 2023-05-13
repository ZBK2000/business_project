import { Box } from "@mui/system";
import { Button, Fab, Grid, IconButton, List, ListItem, ListItemText, MenuItem, Select, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";

export default function  ProvideUserName(props) {
const [userName, setUserName] = useState("");
const { update } = UserAuth();
const { user } = UserAuth();
console.log(props.h3s,props.id, "haha")
let players = []
for(let h3 in props.h3s){
    if(props.h3s[h3].id ===props.id){
        console.log("hello")
        players = props.h3s[h3].slots
    }
}
console.log(players)



 async function setUsernamefunc (){
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/GoogleSignInUserName`, {
        method: "POST",
        body: JSON.stringify({user: userName, password:user.email}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const accepted = await response.text();
      if (accepted=="success"){
        await update(user, userName)
        props.indicator(false)
      }
 }
return (
<Box   sx={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    bgcolor: 'rgba(0, 0, 0, 0.5)', // Background color with opacity
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999, // Higher z-index to make sure it's above everything else
    
    
  }}>
    <Box sx={{width:"300px", backgroundColor:"white", borderRadius:"10px", padding:"30px"}}
    >
  <Typography variant="h5">It seems like you are new here, please tell us a name that we can call you :)</Typography>
  <Typography marginTop={"30px"} variant="h6">UserName:</Typography>
 
        <input id="desc" onChange={(e) => setUserName(e.target.value)} />
        <Button onClick={setUsernamefunc} sx={{color:"black",backgroundColor:"#d6d6d6", width:'100%', marginTop:'10px'}}  variant="fulfilled">Cancel Event</Button>
  </Box>
</Box>
)

}
