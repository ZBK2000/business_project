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
import { Grid } from "@mui/material";
import SimpleMap from "./GoogleMapNOTUSED";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useMemo } from "react";
import Sports from "./sportIcons";
import MapContainer from "./GoogleMapNOTUSED";
import { Password } from "@mui/icons-material";

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
      navigate(`/login/favourite`);
    }
    
}

  //to navigate to the track if loggid in otherwise to login page
  function reNavigate(item) {
    if (user) {
      navigate(`/tracks/${item.name}`);
    } else {
      navigate(`/login/${item.name}`);
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
    return (
      <Grid
      
        item
        padding={"8px !important"}
        xs={12}
        sm={6}
        md={4}
        lg={3}
        xl={2.2}
      >
        <Card
          className="tracks"
          sx={{ backgroundColor: theme.palette.secondary.main, margin: "auto", position:"relative"}}
          onClick={() => reNavigate(item)}
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
          </CardContent>
        </Card>
      </Grid>
    );
  });

  
  return (
    <div>
      <Header
        title="Fantastic business"
        success={props.getDownData}
        name={props.getDownData2}
      />
      <Grid display={"flex"} alignItems={"center"}>
      <Button margin={"15px !important"} sx={{height:"80%", margin:"10px"}} variant="contained" onClick={showFavourite}>{favouriteData.length ===0 ?"show favourites only":"show all"}</Button>
      <Button margin={"15px !important"} sx={{height:"80%", margin:"10px"}} variant="contained" onClick={mapViewFunc}>{!mapView?"Show map view":"Show detailed view"}</Button>
       {/*<Sports/> */}
      </Grid>
      <Filter getUpData={setFilterItems} />
      {!mapView? <Grid
        sx={{ marginLeft: "0px", marginRight: "10px", width: 1 }}
        container
        spacing={2}
        className="container"
      >
        {newTracks}
      </Grid> : <MapContainer locations={allLocation} tracks={filteredData} center={filterItems? filterItems[2]: "Budapest"}/>}
      {/* 
            <SimpleMap locations={ [
    { lat: 47.497912, lng: 19.040235 }, // Budapest Parliament
    
    { lat: 47.5142, lng: 19.0373 }, // St. Stephen's Basilica
    { lat: 47.4984, lng: 19.0408 }, // Chain Bridge
    { lat: 47.4849, lng: 19.0402 }, // Gellért Hill
  ]
  }/> 
        */}
    </div>
  );
}
