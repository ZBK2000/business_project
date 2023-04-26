import { Box } from "@mui/system";
import { Button, Grid, Paper, Typography } from "@mui/material";
export default function  NoFreePlace(props) {

return (
<Box  onClick={()=>props.indicator(true)} sx={{
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
    <Box sx={{width:"300px", height:"370px", backgroundColor:"white", borderRadius:"10px", padding:"10px"}}>
  <Typography variant="h4">Sorry someone was faster than you, and grab your place :(, we hope you find another appropriate time or check back later in case a place got freed up</Typography>

  </Box>
</Box>
)

}