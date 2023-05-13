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

export default function Filter(props) {
  //declaring states and consts
  const [value, setValue] = React.useState([0, 20]);
  const [value2, setValue2] = React.useState([0, 30000]);
  const [location, setLocation] = React.useState("");
  const [name, setName] = React.useState("");
  const [expanded, setExpanded] = React.useState(false);
  const { user } = UserAuth();
  const [verifyEmail, setVerifyEmail] = React.useState(false)

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
    props.getUpData([value, value2, location, name]);
  };

  return (
    <Box sx={{ margin: "8px", "& > :not(style)": { m: 1 } }}>
      <Button sx={{height:"80%", margin:"10px",marginLeft:"0px !important",backgroundColor:"#d6d6d6"}} onClick={handleExpandClick} variant="extended">
        {!expanded ? <FilterAltOffIcon /> : <FilterAltIcon />}
      </Button>
      <Button margin={"15px !important"} sx={{height:"80%", margin:"10px",backgroundColor:"#d6d6d6"}} variant="fullfilled" onClick={user?props.showFavourite:()=>props.setShowRegister(true)}>{props.favouriteData.length ===0 ?"show favourites only":"show all"}</Button>
      <Button margin={"15px !important"} sx={{height:"80%", margin:"10px",backgroundColor:"#d6d6d6"}} variant="fullfilled" onClick={props.mapViewFunc}>{!props.mapView?"Show map view":"Show detailed view"}</Button>
      <Button /*onClick={()=>navigate("/communityEvent")}*/ onClick={user?user.emailVerified?()=>props.setShowEventForm(true):()=>setVerifyEmail(true):()=>props.setShowRegister(true)} margin={"15px !important"} sx={{height:"80%", margin:"10px", backgroundColor:'green',color:"#0BF763", "&:hover":{backgroundColor:'#2f9b14'}}} variant="fullfilled">
      <TelegramIcon sx={{color:"#0BF763"}}/> Let's organize an event
      </Button>
      <Collapse sx={{ width: "100%" , marginTop:"45px !important"}} in={expanded} timeout="auto">
        <Box
          sx={{
            padding: 0,
            marginBottom: "10px",
            width: "100%",
            display: "flex",
            gap: "40px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container spacing={4} width={"100%"} className="container">
            <Grid
              item
              style={{ width: "50%" }}
              padding={0}
              xs={2}
              sm={1}
              md={0.5}
            >
              <Typography>Slots</Typography>
            </Grid>
            <Grid
              item
              paddingRight={"15px !important"}
              alignContent={"center"}
              padding={0}
              xs={9}
              sm={4.5}
              md={3}
            >
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
            </Grid>
            <Grid item padding={0} xs={2} sm={1} md={0.5}>
              {" "}
              <Typography htmlFor="">Price</Typography>
            </Grid>
            <Grid
              item
              paddingRight={"15px !important"}
              padding={0}
              xs={9}
              sm={4.5}
              md={3}
            >
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
                  zIndex:9999
                }}
                id="outlined-basic"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                label="Location"
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
            <Grid item padding={0} xs={12} sm={2} md={1.5}>
              <Button
                sx={{ backgroundColor: "#d6d6d6" }}
                onClick={getUpData}
                variant="fulfilled"
              >
                Filter
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Collapse>
      {verifyEmail && <VerifyEmail indicator={setVerifyEmail}/>}
    </Box>
  );
}
