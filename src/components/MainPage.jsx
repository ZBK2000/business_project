import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "./FooterNOTUSED";

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import { height } from "@mui/system";
import Filter from "./Filter";
import { useEffect } from "react";
import { useTheme } from "@emotion/react";
import { UserAuth } from "../context/AuthContext";
import { Box, Container, Grid } from "@mui/material";
import SimpleMap from "./GoogleMapNOTUSED";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useMemo } from "react";
import Sports from "./sportIcons";
import MapContainer from "./GoogleMapNOTUSED";
import { Password } from "@mui/icons-material";
import LoginWithFirebase from "./loginWithFirebase";
import CommunityEvent from "./communityEventForm";
import TelegramIcon from '@mui/icons-material/Telegram';
import UserRegisterWithFirebase from "./UserRegisterWithFirebase";
import ProvideUserName from './ProvideUserName';
import SkeletonComponent from "./skeleton";


export default function MainPage(props) {
  //declaring states and consts
  const { user } = UserAuth();
  const nameOfUser = user ? user.displayName : "";
  const theme = useTheme();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [filterItems, setFilterItems] = useState("");
  const [heart, setHeart] = useState()
  //let heartList= useMemo(()=>[], [])
  const [heartList, setHeartList] = useState([])
  const [favouriteData, setfavouriteData] = useState([]) 
  const [locations, setLocations] = useState([])
  const [mapView, setMapView] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [provideUserName, setProvideUserName] = useState(false)
  const [showEventForm, setShowEventForm] = useState(false)
  const [currentSport, setCurrentSport] = useState("")
  const [community, setCommunity] = useState(false)
  
  useEffect(()=>{
    async function fetchFavourites(){
      const fav = await fetch(`${import.meta.env.VITE_BACKEND_URL}/favourites`, {
        method: "POST",
        body: JSON.stringify({user: nameOfUser, change: false}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const favData = await fav.json()
      
      setHeartList(favData)
    }
    if(nameOfUser){
    fetchFavourites()}
    
  }, [nameOfUser])
  
  
   async function changeHeart (event, name){
    event.stopPropagation();
    if (user) {
      if (heartList.includes(name)){
        let indexToRemove = heartList.indexOf(name);
        if (indexToRemove !== -1) {
          heartList.splice(indexToRemove, 1);
        }
      } else {
      heartList.push(name)}
      setHeart(!heart)
      
    
    const fav = await fetch(`${import.meta.env.VITE_BACKEND_URL}/favourites`, {
      method: "POST",
      body: JSON.stringify({user: nameOfUser, change: true, trackName: name}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const favData = await fav.json()
    setHeartList(favData)
    } else {
      setShowRegister(true);
    }
    
}

  //to navigate to the track if loggid in otherwise to login page
  function reNavigate(item) {
    if (user) {
      navigate(`/tracks/${item.name}/2`);
    } else {
      //navigate(`/login/${item.name}`);
      setShowRegister(true)
    }
  }

  function mapViewFunc() {
   setMapView(prev => !prev)
  }

  //this section for the filtering based on the uplifted data from the filter component
  
  //let filteredData = useMemo(()=>[], []);
  let filteredData =[]
 let favOrAll=useMemo(()=>[], [])
 

  function showFavourite(){
    if (favouriteData.length !== 0) {setfavouriteData([])}
    else{
      let tempList = []
    props.allTrack.forEach((item)=>{
      if(heartList.includes(item.name)){
        tempList.push(item)
        
      }})
      
      setfavouriteData(tempList)
    }
  }
  

  if (filterItems) {
    favOrAll = (favouriteData.length === 0 ? props.allTrack: favouriteData)
    favOrAll.forEach((item) => {
      const shouldFilterLocation = filterItems[2] !== "";
      const shouldFilterName = filterItems[3] !== "";

      if (
        (!shouldFilterLocation || item.location.toLowerCase().includes(filterItems[2].toLowerCase())) &&
        (!shouldFilterName || item.name.toLowerCase().includes(filterItems[3].toLowerCase())) &&
        item.slot_number <= filterItems[0][1] &&
        item.slot_number >= filterItems[0][0] &&
        item.price <= filterItems[1][1] &&
        item.price >= filterItems[1][0]
      ) {
        filteredData.push(item);
      } else if (
        !shouldFilterLocation &&
        !shouldFilterName &&
        item.slot_number <= filterItems[0][1] &&
        item.slot_number >= filterItems[0][0] &&
        item.price <= filterItems[1][1] &&
        item.price >= filterItems[1][0]
      ) {
        // if both filter criteria are empty, include the item in the filtered data
        filteredData.push(item);
      }
    });
  } else {
    
    favOrAll = (favouriteData.length === 0 ? props.allTrack: favouriteData)
    
    filteredData = favOrAll;
  }
  let allLocation = []
  for (let location in filteredData){
    try {
      allLocation.push([filteredData[location].latAndLong, filteredData[location].name])
    } catch (error) {
      console.log(error)
    }
    
  }
  const newTracks = filteredData.map(function (item) {
    if(currentSport== item.activity | !currentSport){
    return (
      <Grid
      
        item
        padding={"8px !important"}
        xs={12}
        sm={6}
        md={4}
        lg={3}
        xl={2.4}
      >
        <Card
          className="tracks"
          sx={{ backgroundColor: theme.palette.secondary.main, margin: "auto", position:"relative"}}
         onClick={() => reNavigate(item)}
         //onClick={() => setShowLogin(true)}
          key={item.name}
        >
          {heartList.includes(item.name) ?<FavoriteIcon  onClick={(e)=>changeHeart(e, item.name)} sx={{position:"absolute", color:"#fb7b7b", left:"85%", top:"5%"}}/>:
          <FavoriteBorderIcon onClick={(e)=>changeHeart(e, item.name)} sx={{position:"absolute",color:"#fb7b7b", left:"85%", top:"5%"}}/>}
          
          <CardMedia
            component="img"
            sx={{ height: 140 }}
            src={`${import.meta.env.VITE_BACKEND_URL}/img?user_id=${item.name}&number=${0}`}
           
            title=""
          />
          <CardContent>
          
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item?.city? item.city : item.location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.price}FT
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {item.slot_number.join('P, ')}P
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item?.activity?item?.activity:"-"}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  }});

  console.log(props.allLinks)
  const liveActivities =props?.allLinks? props.allLinks.map(function (item) {
    if (item.isopen){
      const date_components = item.time.split(" ");
      const date = date_components[0];
      const time_interval = date_components[1];

      // Extract the start time and end time from the time interval
      let [start_time, end_time] = time_interval.split("-").map(Number);
      start_time = String(start_time).padStart(2, '0');
      const current_datetime = new Date();
      // Convert the date and time components to Date objects
      const activity_start_datetime = new Date(`${date}T${start_time}:00:00`)
      if (activity_start_datetime >= current_datetime) {
        if(currentSport== item.sportType | !currentSport){
      const count = item.slots.reduce((acc, curr) => {
        if (curr === "") {
          return acc + 1;
        } else {
          return acc;
        }
      }, 0);
      
    return (
      <Grid
      
        item
        padding={"8px !important"}
        xs={12}
        sm={6}
        md={4}
        lg={3}
        xl={2.4}
      >
        <Card
          className="tracks"
          sx={{ backgroundColor: theme.palette.secondary.main, margin: "auto", position:"relative"}}
          onClick={user?() => navigate(`/tracks/${item.name}/${item._id}`):()=>setShowRegister(true)}
          key={item.name}
        >
          
          
          <CardMedia
            component="img"
            sx={{ height: 140 }}
            src={`${import.meta.env.VITE_BACKEND_URL}/img?user_id=${item._id}&number=${0}&event=${true}`}
            title={`community activity - ${item.sportType}`}
            
          />
          <CardContent>
          
            <Typography gutterBottom variant="h5" component="div">
              {item.trackName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item?.city? item.city:"-"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.time}
            </Typography>
           
            <Typography variant="body2" color="text.secondary">
              {item.isLimited? `${item.slots.length}P (remaining ${count}P)`: "unlimited"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.sportType?item.sportType:"-"}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  }}}}) : []

  console.log(props.allTrack)
  return (
    <Grid display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
      
      <Header
        title="Fantastic business"
        success={props.getDownData}
        name={props.getDownData2}
        setShowRegister={setShowRegister}
        setShowLogin={setShowLogin}
      />
      <Grid width={'95%'}>
      <Sports setCurrentSport={setCurrentSport} sport={currentSport}/> 
      
      <Grid display={"flex"} alignItems={"center"} >
     {/* <Button margin={"15px !important"} sx={{height:"80%", margin:"10px"}} variant="contained" onClick={showFavourite}>{favouriteData.length ===0 ?"show favourites only":"show all"}</Button>
      <Button margin={"15px !important"} sx={{height:"80%", margin:"10px"}} variant="contained" onClick={mapViewFunc}>{!mapView?"Show map view":"Show detailed view"}</Button>
      <Button /*onClick={()=>navigate("/communityEvent")} onClick={()=>setShowEventForm(true)} margin={"15px !important"} sx={{height:"80%", margin:"10px", backgroundColor:'green',color:"#0BF763"}} variant="contained">
        <TelegramIcon sx={{color:"#0BF763"}}/> Let's organize an event</Button>  */} 
       
      </Grid>
      <Filter getUpData={setFilterItems} showFavourite={showFavourite} mapViewFunc={mapViewFunc} setShowEventForm={setShowEventForm} setShowRegister={setShowRegister} favouriteData={favouriteData} mapView={mapView}/>
      <Box display={"flex"}><Typography onClick={()=>setCommunity(false)} variant="h5" sx={{color:community?"grey":"black",margin:"-10px 8px 20px",width:"108px", borderRight:"1px solid black", cursor:"pointer"}}>Partners</Typography>
      <Typography onClick={()=>setCommunity(true)} variant="h5" sx={{color:community?"black":"grey",margin:"-10px 8px 20px", cursor:"pointer"}}>Community events</Typography></Box>
      {!mapView? <Grid
        sx={{ marginLeft: "0px", marginRight: "0px", width: "100%", marginBottom:"30px"}}
        container
        
        spacing={2}
        className="container"
      >
        {community? liveActivities?liveActivities:<SkeletonComponent/> : filteredData!=[]? newTracks: <SkeletonComponent/>}
      </Grid> : <MapContainer locations={allLocation} tracks={filteredData} center={filterItems? filterItems[2]: "Budapest"}/>}
     {/*  <Typography variant="h5" sx={{margin:"-10px 8px 20px"}}>Community events</Typography>
      <Grid
        sx={{ margin:"0px",marginTop:"-16px" ,width: "100%" }}
        container
        justify="center !important" alignItems="center !important"
        spacing={2}
        className="container"
      >

      {liveActivities}
      </Grid>
      
            <SimpleMap locations={ [
    { lat: 47.497912, lng: 19.040235 }, // Budapest Parliament
    
    { lat: 47.5142, lng: 19.0373 }, // St. Stephen's Basilica
    { lat: 47.4984, lng: 19.0408 }, // Chain Bridge
    { lat: 47.4849, lng: 19.0402 }, // Gellért Hill
  ]
  }/> 
        */}
        
      {showLogin &&<LoginWithFirebase indicator={setShowLogin}/>} 
     {showRegister &&<UserRegisterWithFirebase indicator={setShowRegister} indicatorforLogin={setShowLogin} setProvideUserName={setProvideUserName}/>}
      {showEventForm &&<CommunityEvent indicator={setShowEventForm}/>} 
      {provideUserName && <ProvideUserName indicator={setProvideUserName}/>}
      </Grid>
      
    </Grid>
  );
}
