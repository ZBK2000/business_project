import { Box } from "@mui/system";
import { Button, Fab, Grid, IconButton, List, ListItem, ListItemText, MenuItem, Select, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { useState } from "react";

export default function  VerifyEmail(props) {

return (
<Box  onClick={()=>props.indicator(false)} sx={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin:'0px !important',
    bgcolor: 'rgba(0, 0, 0, 0.5)', // Background color with opacity
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999, // Higher z-index to make sure it's above everything else
    
    
  }}>
    <Box sx={{width:"300px", backgroundColor:"white", borderRadius:"10px", padding:"30px"}}
    >
  <Typography sx={{textAlign:"center"}} variant="h5">You have to verify your email to organize or participate in activites</Typography>
  
 
  </Box>
</Box>
)

}
