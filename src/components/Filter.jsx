import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import {
  Button,
  Collapse,
  Fab,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { margin } from "@mui/system";
import TelegramIcon from '@mui/icons-material/Telegram';
import { UserAuth } from "../context/AuthContext";
import VerifyEmail from "./verifyEmail";
import Sports from "./sportIcons";
import SportsSelect from "./sportSelect";
import StaticDatePickerCollapsible from "./NextSevenDay copy";
import zIndex from "@mui/material/styles/zIndex";
import DateRangePickerValue from "./DateRange";

export default function Filter(props) {
  //declaring states and consts
  const [value, setValue] = React.useState([0, 20]);
  const [value2, setValue2] = React.useState([0, 30000]);
  const [location, setLocation] = React.useState("");
  const [name, setName] = React.useState("");
  const [expanded, setExpanded] = React.useState(false);
  const { user } = UserAuth();
  const [verifyEmail, setVerifyEmail] = React.useState(false)
  const [sportType,setSportType] = React.useState("")
  const [exactDateFrom, setExactDateFrom] = React.useState("")
  const [exactDateTo, setExactDateTo] = React.useState("")

  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 20,
      label: "20",
    },
  ];

  //declaring the statemanagers for the input fields
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const getUpData = () => {
    props.getUpData([value, value2, location, name, sportType, exactDateFrom, exactDateTo]);
  };

  return (
    <Box sx={{ margin: "8px", marginBottom:"25px", "& > :not(style)": { m: 1 } }}>
      <Button sx={{height:"80%", margin:"10px",marginLeft:"0px !important",backgroundColor:"#d6d6d6"}} onClick={handleExpandClick} variant="extended">
        {!expanded ? <FilterAltOffIcon /> : <FilterAltIcon />}
      </Button>
      <Button margin={"15px !important"} sx={{height:"80%", margin:"10px",backgroundColor:"#d6d6d6"}} variant="fullfilled" onClick={user?props.showFavourite:()=>props.setShowRegister(true)}>{props.favouriteData.length ===0 ?"show favourites only":"show all"}</Button>
      <Button margin={"15px !important"} sx={{height:"80%", margin:"10px",backgroundColor:"#d6d6d6"}} variant="fullfilled" onClick={props.mapViewFunc}>{!props.mapView?"Show map view":"Show detailed view"}</Button>
      <Button /*onClick={()=>navigate("/communityEvent")}*/ onClick={user?user.emailVerified?()=>props.setShowEventForm(true):()=>setVerifyEmail(true):()=>props.setShowRegister(true)} margin={"15px !important"} sx={{height:"80%", margin:"10px", backgroundColor:'green',color:"#0BF763", "&:hover":{backgroundColor:'#2f9b14'}}} variant="fullfilled">
      <TelegramIcon sx={{color:"#0BF763"}}/> Let's organize an event
      </Button>
      <Collapse sx={{ width: "100%" , marginTop:"0px !important"}} in={expanded} timeout="auto">
        <Box
          sx={{
            padding: 2,
            marginBottom: "10px",
            width: {md:"97%", xs:"85%"},
            display:"flex",
            
            justifyContent: "center",
            alignItems: "center",
            borderBottom:"1px solid #d6d6d6",
            borderRight:"1px solid #d6d6d6",
            borderLeft:"1px solid #d6d6d6",
            borderRadius:"10px",
            paddingTop:"40px",
            
          
            zIndex:9999
          }}
        >
          <Grid container marginLeft={{xs:"3px"}}  spacing={4} width={"100%"}  display={"flex"} justifyContent={{md:"left", xs:"center"}} alignItems={"center"} gap={3} >
            <Grid
              item
              style={{ width: "50%" }}
              padding={0}
              xs={12}
              sm={6}
              md={5}
              display={{md:"flex"}}
              alignItems={"center"}
              gap={3}
              sx={{backgroundColor:"#d6d6d6", borderRadius:"10px"}}
              
            >
              <Typography marginBottom={{xs:"25px"}}>Participants:</Typography>
       
            
              <Slider
                sx={{ padding: 0, margin: 0 }}
                min={0}
                max={20}
                getAriaLabel={() => "Temperature range"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="on"

                //getAriaValueText={valuetext}
              />
                <Button
                sx={{ backgroundColor: "#d6d6d6" }}
                onClick={getUpData}
                variant="fulfilled"
              >
                Unlimited
              </Button>
            </Grid>
            {!props.community?<Grid item padding={0} xs={12} sm={6} md={5}    display={{md:"flex"}}
              alignItems={"center"} gap={3} sx={{backgroundColor:"#d6d6d6", borderRadius:"10px"}}>
              {" "}
              <Typography marginBottom={{xs:"25px"}}>Price:</Typography>
         
              {" "}
              <Slider
              
                sx={{ margin: "0px" }}
                min={0}
                max={30000}
                step={100}
                getAriaLabel={() => "Temperature range"}
                value={value2}
                onChange={handleChange2}
                valueLabelDisplay="on"
                //getAriaValueText={valuetext}
              />
               <Button
                sx={{ backgroundColor: "#d6d6d6" }}
                onClick={getUpData}
                variant="fulfilled"
              >
                Free
              </Button>
            </Grid>:<Typography>Community activites are free</Typography>}

            <Grid
              item
              padding={0}
              xs={6}
              sm={2}
              md={1.5}
              paddingTop={"20px !important"}
            >
              <TextField
                sx={{
                  color: "#3c3c3c",
                  "& .input:focus !important": { color: "#3c3c3c" },
                  zIndex:9999
                }}
                id="outlined-basic"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                label="City"
                variant="filled"
              />
            </Grid>
            <Grid
              item
              padding={0}
              xs={6}
              sm={2}
              md={1.5}
              paddingTop={"20px !important"}
            >
              <TextField
                sx={{
                  color: "#3c3c3c",
                  "& .input:focus !important": { color: "#3c3c3c" },
                  zIndex: 9999
                }}
                id="outlined-basic"
                onChange={(e) => setName(e.target.value)}
                value={name}
                label="Name"
                variant="filled"
              />
            </Grid>
            <SportsSelect sportType={setSportType}/>
           {props.community?<Grid
              item
              padding={0}
              xs={12}
              sm={2}
              md={5}
              paddingTop={"20px !important"}
              display={{md:"flex"}}
              gap={3}
              alignItems={"center"}
              
            >
            
            <Typography  >DateRange:</Typography>
            <Typography   >From</Typography>
            <TextField
                sx={{
                  color: "#3c3c3c",
                  "& .input:focus !important": { color: "#3c3c3c" },
                  
                }}
                id="outlined-basic"
                onChange={(e) => setExactDateFrom(e.target.value)}
                value={exactDateFrom}
                label="yyyy-mm-dd"
                variant="filled"
              />
              <Typography   >until</Typography>
            <TextField
                sx={{
                  color: "#3c3c3c",
                  "& .input:focus !important": { color: "#3c3c3c" },
                 
                }}
                id="outlined-basic"
                onChange={(e) => setExactDateTo(e.target.value)}
                value={exactDateTo}
                label="yyyy-mm-dd"
                variant="filled"
              />
            </Grid>: <Typography>You cannot filter permanent partners based on date</Typography>}
            {/*<DateRangePickerValue/>*/}
            <Button
                sx={{ backgroundColor: "#d6d6d6" }}
                onClick={getUpData}
                variant="fulfilled"
                
              >
                Filter
              </Button>
            <Grid item padding={0} xs={12} sm={1} md={1}>
              <Typography
              
               
              >
               {props.community? "Events found": "Partners found"} : {props.community? props.communityLength: props.partnersLength}
              </Typography>

            </Grid>
          </Grid>
        </Box>
      </Collapse>
      {verifyEmail && <VerifyEmail indicator={setVerifyEmail}/>}
    </Box>
  );
}
