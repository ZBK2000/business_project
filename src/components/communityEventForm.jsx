import { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Switch from '@mui/material/Switch';
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { UserAuth } from "../context/AuthContext";
import SportsSelect from "./sportSelect";
import StaticDatePickerCollapsible from "./NextSevenDay copy";

export default function CommunityEvent(props) {
  //declaring states and consts
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [sportType, setSportType] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [slots, setSlots] = useState(0);
  const [img, setImg] = useState("");
  const [trackName, setTrackName] = useState([])
  const [trackCounter, setTrackCounter] = useState([""])
  const [isOpen, setIsOpen] = useState(false)
  const [isLimited, setIsLimited] = useState(true)
  const [timeLine, setTimeLine] = useState("0000-00-00 00")
  const [exactDate, setExactDate] = useState("0000-00-00 00")
  const { user } = UserAuth();
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const userName = user ? user.displayName : "";
 console.log(slots, trackName, isOpen)


  async function generateRandomLinkPath(trackName, slots, loc, time, user, subTrackName,description, isopen, city, sportType, exactDate, isLimited, organizer, img) {
    if (isLimited){
      slots = Array(slots).fill("")
    } else{
      slots = Array(1).fill("")
    }
    let formData = new FormData();
    for (let i = 0; i < img.length; i++) {
      formData.append("img_urls", img[i]);
    }
    console.log(slots)
    slots[slots.indexOf("")] = user
    console.log(subTrackName)
    const dataForLink = {trackName, slots, location: loc, time: `${exactDate} ${time}`,user, subTrackName, description, isopen, city, sportType, isLimited, organizer }
    console.log(dataForLink)
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/customLink`, {
      method: "POST",
      body: JSON.stringify(dataForLink),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const linkData = await response.json();
    formData.append("event", trackName);
    //we make another request to store the name of the images in the tracks database ( its only after the database for this track was created)
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/img`, {
      method: "POST",
      body: formData,
    });
    const imgupload = await res.json();
    if (linkData.msg === "success" && imgupload.msg ==="success"){

      navigate(`/tracks/${trackName}/${linkData.linkId}`)
    }
  }
 console.log(exactDate, description)
  return (
    <div>
      <Header
        title="new track registration"
        success={props.getDownData}
        name={props.getDownData2}
      />
      <Typography sx={{margin:"20px"}} variant="h5">Lets organize a cool event and have fun with others</Typography>
      <Grid width={"500px"} margin={"40px"}>
        
        <label htmlFor="name">
          <Typography>Name of the Activity:</Typography>
        </label>
        <input
          type="text"
          id="name"
          onChange={(e) => setName(e.target.value)}
        />

  <SportsSelect sportType={setSportType}/>
  <label htmlFor="location">
          <Typography>City:</Typography>
        </label>
        <input
          type="text"
          id="location"
          onChange={(e) => setCity(e.target.value)}
        />
        <label htmlFor="location">
          <Typography>Exact Address:</Typography>
        </label>
        <input
          type="text"
          id="location"
          onChange={(e) => setLocation(e.target.value)}
        />
         <Typography>Choose Date:</Typography>
        <StaticDatePickerCollapsible getUpData={setExactDate} />
       <label htmlFor="location">
          <Typography>time:</Typography>
        </label>
        <input
          type="text"
          id="location"
          onChange={(e) => setTimeLine(e.target.value)}
        />
         <label htmlFor="img">
          <Typography>Images [optional]:</Typography>
        </label>
        <input
          type="file"
          id="img"
          multiple
          onChange={(e) => setImg(e.target.files)}
        />
        <label htmlFor="desc">
          <Typography>Description:</Typography>
        </label>
        <textarea id="desc" onChange={(e) => setDescription(e.target.value)} />
        
        <Box display={"flex"} sx={{margin:"20px 0px"}}>

        <TextField disabled={!isLimited} type="Number"  onChange={(e)=>setSlots(Number(e.target.value))} fullWidth={"100%"} label="The maximum number of participants:"></TextField>
        <Button variant="outlined" sx={{color:"black", borderColor:"black"}} onClick={()=>setIsLimited(prev=>!prev)}>{isLimited?"Limited":"Unlimited"}</Button>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        <Typography sx={{color:"black"}}>Open it for the community [you can do this later as well]</Typography>
        <Switch {...label} onChange={()=>setIsOpen(prev=>!prev)} sx={{backgroundColor:"grey", borderRadius:"10px"}}/>
        </Box>
        <button onClick={()=>generateRandomLinkPath(name,slots,location, timeLine, user.displayName,"-", description, isOpen,city, sportType, exactDate, isLimited, userName, img)}>
          <Typography >Submit</Typography>
        </button>
        </Grid>
    </div>
  );
}
