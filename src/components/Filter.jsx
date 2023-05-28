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
import PersonIcon from '@mui/icons-material/Person';

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
  const [free, setFree] = React.useState(false)
  const [limited, setLimited] = React.useState(false)
  const [paid, setPaid] = React.useState(false)
  const [unlimited, setUnlimited] = React.useState(false)

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
    
      props.getUpData([value, value2, location, name, sportType, exactDateFrom, exactDateTo, limited,unlimited,free, paid ]);
    
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
          
          
  /* Use transform instead of left for smooth sliding effect */
  zIndex: 999,
 
          }}
        >
          <Grid container marginLeft={{xs:"3px"}}  spacing={4} width={"100%"}  display={"flex"} justifyContent={{md:"left", xs:"center"}} alignItems={"center"} gap={3} >
            <Grid
              item
              
              padding={"0px !important"}
              xs={12}
              sm={6}
              md={4}
              display={"flex"}
              alignItems={{xs:"center",md:"end"}}
              justifyContent={"center"}
              gap={3}
              flexDirection={{xs:"column", md:"row"}}
              
              
            >
              <Box display={"flex"}
              alignItems={"center"} flexDirection={{md:"column"}} gap={1}
              >

             
              <Button
              onClick={()=>setUnlimited(prev=>!prev)}
                sx={{ backgroundColor: unlimited &&props.community?"#909090":"#d6d6d6", fontWeight: unlimited&&props.community&&"bold",width:'100%' }}
                disabled={!props.community}
                variant="fulfilled"
              >
                Unlimited <PersonIcon sx={{color: !unlimited&&"#aeaeae"}}/>
              </Button>
              <Button onClick={()=>setLimited(prev=>!prev)} variant="fulfilled" marginBottom={{xs:"50px", md:"5px"}}  sx={{ backgroundColor: limited?"#909090":"#d6d6d6", fontWeight: (limited)&&"bold", width:'100%'}}>limited {"  "}<PersonIcon sx={{color: !limited&&"#aeaeae"}} /></Button>
              </Box>
       
            
              <Slider
                 sx={{ margin: "0px", opacity:limited?"1":"0.3" }}
                disabled={!limited?true:false}
                min={0}
                max={20}
                getAriaLabel={() => "Temperature range"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="on"

                //getAriaValueText={valuetext}
              />
              
            </Grid>
            <Grid
             item
             
              padding={"0px !important"} xs={12} sm={6} md={4}    display={"flex"}
              gap={3}
              flexDirection={{xs:"column", md:"row"}}
              alignItems={{xs:"center",md:"end"}}
              >
              {" "}
              <Box marginLeft={"20px"} display={"flex"}
              alignItems={"center"}
              flexDirection={{md:"column"}} gap={1}
              
              >
             
              <Button
              
                sx={{ backgroundColor:(free)?"#909090": "#d6d6d6", fontWeight: (free)&&"bold" , width:"100%"}}
                
                variant="fulfilled"
                onClick={()=>setFree(prev=>!prev)}
              >
                Free
              </Button>
              <Button variant="fulfilled" onClick={()=>setPaid(prev=>!prev)} disabled={props.community?true:false} marginBottom={{xs:"25px", md:"5px"}} sx={{ backgroundColor: !paid||props.community? "#d6d6d6": "#909090", fontWeight:paid&&!props.community&&"bold", width:"100%"}}>Priced</Button>
              </Box>
              {" "}
              <Slider
               disabled={props.community || !paid?true:false}
                sx={{ margin: "0px", opacity:props.community||!paid?"0.3":"1" }}
                min={0}
                max={30000}
                step={100}
                getAriaLabel={() => "Temperature range"}
                value={value2}
                onChange={handleChange2}
                valueLabelDisplay="on"
                //getAriaValueText={valuetext}
              />
              
            </Grid>

            <Grid
              item
              padding={"0px !important"}
              xs={12}
              sm={2}
              md={3.5}
              
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-around"}
              gap={1}
            >
              <TextField
                sx={{
                  color: "#3c3c3c",
                  "& .input:focus !important": { color: "#3c3c3c" },
                  zIndex:999
                  ,width:{md:"48%"}
                }}
                id="outlined-basic"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                label="City"
                variant="filled"
              />
            
           
              <TextField
                sx={{
                  color: "#3c3c3c",
                  "& .input:focus !important": { color: "#3c3c3c" },
                  zIndex: 999
                }}
                id="outlined-basic"
                onChange={(e) => setName(e.target.value)}
                value={name}
                label="Name"
                variant="filled"
              />
           </Grid>
            <SportsSelect sportType={setSportType}/>
           <Grid
              item
              padding={"3px !important"}
              xs={12}
              sm={2}
              md={5}
              
              display={"flex"}
              flexDirection={{xs:"column", md:"row"}}
              gap={{md:3}}
              alignItems={"center"}
              justifyContent={"center"}
              sx={{border:"1px solid #d6d6d6", borderRadius:"10px", opacity:props.community?"1":"0.3"}}
              
            >
            
            <Typography width={"100%"}>DateRange:</Typography>
            
            <Typography   >From</Typography>
            <TextField
            disabled={props.community?false:true}
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
            disabled={props.community?false:true}
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
            </Grid>
            {/*<DateRangePickerValue/>*/}
            <Grid item padding={"0px !important  "} sx={{width:'px'}} xs={12} sm={1} md={3.5} >
            <Box  display={"flex"}
              alignItems={"center"}
              flexDirection={{xs:"column", md:"row"}}
              justifyContent={"space-around"}
              marginLeft={"0px"}>

            <Fab
                sx={{ backgroundColor: "#d6d6d6", width:"50%", zIndex:999 }}
                onClick={getUpData}
                variant="extended"
                
              >
               Apply Filter
              </Fab>
            
              <Typography
              variant="h6"
               
              >
               {props.community? "Events found": "Partners found"} : {props.community? props.communityLength: props.partnersLength}
              </Typography>
             
            </Box>
            </Grid>
          </Grid>
        </Box>
      </Collapse>
      {verifyEmail && <VerifyEmail indicator={setVerifyEmail}/>}
    </Box>
  );
}
