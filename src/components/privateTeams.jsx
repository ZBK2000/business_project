import { Box } from "@mui/system";
import { Button, Grid, Paper, Typography } from "@mui/material";
export default function  PrivateTeams(props) {

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
    <Box sx={{width:"300px", height:"300px", backgroundColor:"white", borderRadius:"10px", padding:"10px"}}>
  <Typography variant="h4">Private Teams</Typography>
  {['1',"2"].map((item)=>{
    return( <Paper sx={{margin:"15px"}}>
        <Typography>private team {item}</Typography>
        <Button variant="contained">Request join</Button>
    </Paper>

    )
  })}
  </Box>
</Box>
)

}
