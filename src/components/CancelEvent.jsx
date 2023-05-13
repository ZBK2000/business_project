import { Box } from "@mui/system";
import { Button, Fab, Grid, IconButton, List, ListItem, ListItemText, MenuItem, Select, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { useState } from "react";

export default function  CancelEvent(props) {
const [description, setDescription] = useState("");
console.log(props.h3s,props.id, "haha")
let players = []
for(let h3 in props.h3s){
    if(props.h3s[h3].id ===props.id){
        console.log("hello")
        players = props.h3s[h3].slots
    }
}
console.log(players)
return (
<Box  onClick={()=>props.indicator(false)} sx={{
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
  <Typography variant="h5">Are you sure you want to cancel this event?</Typography>
  <Typography marginTop={"30px"} variant="h6">The participants will get an email about the cancellation, you can send a message with that email: (optional)</Typography>
 
        <textarea id="desc" onChange={(e) => setDescription(e.target.value)} />
        <Button sx={{color:"black",backgroundColor:"#d6d6d6", width:'100%', marginTop:'10px'}}  variant="fulfilled">Cancel Event</Button>
  </Box>
</Box>
)

}
