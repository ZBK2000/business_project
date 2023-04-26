import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Next7DaysDropdown from "./NextSevenDay";
import Footer from "./FooterNOTUSED";
import Paper from "@mui/material/Paper";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { Fab, Grid, IconButton, List, ListItem, ListItemText, MenuItem, Select, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { UserAuth } from "../context/AuthContext";
import SimpleMap from "./GoogleMapNOTUSED";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import RatingSlide from "./ratingSlider";
import PersonIcon from '@mui/icons-material/Person';
import Button from "@mui/material/Button";
import PrivateTeams from "./privateTeams";
import NoFreePlace from "./NoFreePlace";

export default function CertainTrack(props) {
  //declaring states and consts
  const navigate = useNavigate()
  const today = new Date();
  const nextDay = new Date(today.getTime());
  nextDay.setDate(today.getDate());
  const year = nextDay.getFullYear();
  const month = nextDay.getMonth() + 1;
  const day = nextDay.getDate();
  const { user } = UserAuth();
  const nameOfUser = user ? user.displayName : "";
  const today_time = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
  const [rightDay, setRightDay] = useState(today_time);
  const [h3s, setH3s] = useState([
    { id: 1, text: "8-10 ", color: "black", slots: ["", "", "", ""] },
    { id: 2, text: "10-12 ", color: "black", slots: ["", "", "", ""] },
    { id: 3, text: "12-14 ", color: "black", slots: ["", "", "", ""] },
    { id: 4, text: "14-16 ", color: "black", slots: ["", "", "", ""] },
    { id: 5, text: "16-18 ", color: "black", slots: ["", "", "", ""] },
    { id: 6, text: "18-20 ", color: "black", slots: ["", "", "", ""] },
    { id: 7, text: "20-22 ", color: "black", slots: ["", "", "", ""] },
  ]);
  const [lastClickedId, setLastClickedId] = useState(null);
  const [errorhandler, setErrorHandler] = useState("");
  const [expanded, setExpanded] = useState("");
  const [subTrack, setSubTrack] = useState("")
  const [privateTeamIndicator, setPrivateTeamIndicator] = useState(false)
  const [isFreePlace, setIsFreePlace] = useState(true)
 
  //declaring the function, which will be activated when someone join to a timeline
  const handleClick = async (id, subTrackName) => {
    //for checking if the user already in it
    let ifNotSameName = true;

    //making a new array and filling up one empty slot with the usersname in that particular timeline if there is space still
    const newh3s = h3s.map((h3) => {
      if (h3.id === id) {
        if (h3.slots.includes(nameOfUser)) {
          ifNotSameName = false;
          return h3;
        }
        let place = h3.slots;
        let last;
        for (let slot in h3.slots) {
          if (h3.slots[slot] == "") {
            place[slot] = nameOfUser;
            if (slot == h3.slots.length - 1) {
              last = true;
            }
            break;
          }
        }
        setLastClickedId([id, place]);
        return {
          ...h3,
          slots: place,
          color: last ? "red" : "black",
          text: last ? `${h3.text} FULL` : h3.text,
        };
      }
      return h3;
    });

    //if the user wasnt already there we fetch the join data to the users database
    if (ifNotSameName) {
      const data = {
        rightDay: rightDay,
        subTrackName,
        h3s: newh3s,
        id: nameOfTrack,
        user: nameOfUser,
        time_id: id,
      };

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tracks`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const trackData = await response.json();
      if (response.status ===403){
          setIsFreePlace(false)
      }
      try {
        setH3s(trackData.booked[subTrackName][rightDay]);
        props.getUpData(newh3s);
      } catch (error) {}
    }
  };

  const { id } = useParams();

  //we descruture the track object which contains all sport location and its data and only taking the appropriate data for this particular field
  let desc;
  let nameOfTrack;
  let trackNumber;
  let img_number;
  let slot_number;
  let location
  let subtrackNames = []
  let subTrackName
  try { 
    for (let track in props.allTrack) {
      if (props.allTrack[track].name == id) {
        desc = props.allTrack[track].description;
        nameOfTrack = props.allTrack[track].name;
        img_number = props.allTrack[track].img_urls.length;
        slot_number = props.allTrack[track].slot_number;
        location = props.allTrack[track].location
        subtrackNames = props.allTrack[track].trackName
        trackNumber = track;
        console.log(slot_number, subtrackNames)
        break;
      }
    }
    subTrackName = subTrack? subtrackNames[subTrack]: subtrackNames[0]
    console.log(slot_number, subTrack)
    let new_slots = Array(Number(4)).fill("")
    if (slot_number){

      new_slots = Array(Number(slot_number[0])).fill("");
    }
    if (subTrack){
      new_slots = Array(Number(slot_number[subTrack])).fill("");
    }
    console.log(new_slots)

    
    useEffect(() => {
      
      try {
        if(props.allTrack && trackNumber){
          console.log(subTrack)
        if (
          //if its a new day which wasnt declared before we will initialize it here otherwise just retrive the specified date data
          
          typeof props.allTrack[trackNumber].booked[subTrackName][rightDay] === "undefined"
        ) {
          
          fetch(`${import.meta.env.VITE_BACKEND_URL}/newDay`, {
            method: "POST",
            body: JSON.stringify({
              id: nameOfTrack,
              rightDay: rightDay,
              subTrackName,
              h3s: [
                { id: 1, text: "8-10 ", color: "black", slots: [...new_slots] },
                {
                  id: 2,
                  text: "10-12 ",
                  color: "black",
                  slots: [...new_slots],
                },
                {
                  id: 3,
                  text: "12-14 ",
                  color: "black",
                  slots: [...new_slots],
                },
                {
                  id: 4,
                  text: "14-16 ",
                  color: "black",
                  slots: [...new_slots],
                },
                {
                  id: 5,
                  text: "16-18 ",
                  color: "black",
                  slots: [...new_slots],
                },
                {
                  id: 6,
                  text: "18-20 ",
                  color: "black",
                  slots: [...new_slots],
                },
                {
                  id: 7,
                  text: "20-22 ",
                  color: "black",
                  slots: [...new_slots],
                },
              ],
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => setH3s(data.booked[subTrackName][rightDay]));
        } else {
          setH3s(props.allTrack[trackNumber].booked[subTrackName][rightDay]);
        }
      }} catch (error) {
        setErrorHandler("x");
        console.log(error);
      }
    }, [rightDay, props.allTrack[trackNumber], subTrack]);}
    catch (error) {
      console.log(error);
    }
  

  //here we make the image slider which can be activated by clicking
  let currentSlide = 0;
  const slides = document.querySelectorAll(".images");

  function changeSlide(plusMinus) {
    let count = 0
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      count ++
    }
    if (currentSlide + plusMinus == -1 ){
      currentSlide = count-1;
      slides[currentSlide].style.display = "block";
    } else if (currentSlide + plusMinus == slides.length ){
      currentSlide = 0;
      slides[currentSlide].style.display = "block";
    }
     else{
      currentSlide = currentSlide + plusMinus;
    slides[currentSlide].style.display = "block";
    }
    
  }

  //here we declare the iconbutton for expanding or collapsing certain timelines
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClick = (id) => {
    if (id == expanded) {
      setExpanded("");
    } else {
      setExpanded(id);
    }
  };
  // generating link numbers for custom path
   async function generateRandomLinkPath(trackName, slots, loc, time, date, user, subTrackName) {
    slots = Array(Number(slots[subtrackNames.indexOf(subTrackName)])).fill("")
    console.log(slots)
    slots[slots.indexOf("")] = user
    console.log(subTrackName)
    const dataForLink = {trackName, slots, location: loc, time: `${date} ${time}`,user, subTrackName }
    console.log(dataForLink)
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/customLink`, {
      method: "POST",
      body: JSON.stringify(dataForLink),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const linkData = await response.json();
    if (linkData.msg === "success"){

      navigate(`/tracks/${trackName}/${linkData.linkId}`)
    }
  }

  //selecting rigth subtrack
  function subTrackFunc (e){
    setSubTrack(e.target.value)
    console.log(e.target.value, subTrack, subtrackNames)
  }
  return (
    <div>
      <Header title={id} success={props.getDownData} name={nameOfUser} />

      {errorhandler ? (
        <h1>Please log in to see the page of this track</h1>
      ) : (
        <div>
          <Grid
            container
            sx={{ margin: "0", marginTop: "20px", marginBottom: "20px" }}
            spacing={2}
            className="images-and-descr"
            
            justifyContent={"center"}
          >
            <Grid
              minWidth={"300px"}
              maxWidth={"400px"}
              item
              xs={12}
              sm={10}
              md={8}
              lg={8}
              xl={4}
              className="slider"
              sx={{padding:"0px !important", margin:"10px"}}
              
            >

              {Array.from({ length: img_number }, (_, i) => (
                <img
                  key={i}
                  
                  src={`${import.meta.env.VITE_BACKEND_URL}/img?user_id=${id}&number=${i}`}
                  className="images slide"
                  alt="image"
                />
              ))}
                            <ArrowForwardIosIcon onClick={()=>changeSlide(1)} sx={{position:"absolute",  left: "85%",
  bottom: "45%", fontSize:"45px", color:"#f5f5f5", "&:hover":{ fontSize:"50px", color:"#d1d1d1"}}} />
   <ArrowBackIosNewIcon onClick={()=>changeSlide(-1)} sx={{position:"absolute",  right: "85%",
  bottom: "45%", fontSize:"45px", color:"#f5f5f5", "&:hover":{ fontSize:"50px", color:"#d1d1d1"}}} />
            </Grid>{" "}
            <Grid
              flexDirection={"column"}
              display={"flex"}
              className="desc-and-rating"
              minWidth={"300px"}
              maxWidth={"350px"}
              item
              xs={12}
              sm={10}
              md={8}
              lg={5}
              xl={4}
            >
              <Typography
                variant="h5"
                sx={{
                  margin: "10px",
                  marginTop: "25px",
                  whiteSpace: "pre-line",
                  overflowWrap: "anywhere",
                }}
              >
                {desc}
              </Typography>{" "}
              <Box>
                <hr />
                <Typography
                    variant="h6"
                    sx={{
                      margin: "10px",
                      whiteSpace: "pre-line",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {location}
                  </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Next7DaysDropdown getUpData={setRightDay} />
                  <Box sx={{ minWidth: 120 }}>
      
        {subtrackNames !=[] ?
        <Select sx={{border:"none"}}
           labelId="demo-simple-select-label" id="demo-simple-select" label="Date" onChange={(e)=>subTrackFunc(e)} value={subTrack? subTrack: 0}>
        {subtrackNames.map((date, index) => (
          <MenuItem key={date} value={index}>
            {date}
          </MenuItem>
        ))}
      </Select>:""}
     
    </Box> 
               
                  
                </Box>
         
              </Box>
            </Grid>
               
              <RatingSlide title={id}/>
              
          </Grid>

          <Grid container spacing={2} justifyContent={"center"} className=" contanier booking-timelines">
            {h3s.map((h3) => (
              <Grid
                item
                minWidth={"250px"}
                padding={0}
                xs={12}
                sm={6}
                md={3}
                lg={2}
                xl={1.4}
                alignItems={"start"}
                display={"flex"}
                justifyContent={"center"}
              
              >
                <Paper elevation={3} className="timeline-div">
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <h3
                      className="timeline"
                      key={h3.id}
                      style={{ color: h3.color }}
                    >
                      {h3.text}
                    </h3>
                    <Fab
                      style={{ width: "36px", height: "20px", margin: "3px" }}
                      color="primary"
                      aria-label="add"
                      onClick={
                        h3.color === "red" ? () => {} : () => handleClick(h3.id, subTrackName)
                      }
                    >
                      
                      <AddIcon />
                    </Fab>
                    <Fab
                      style={{ width: "36px", height: "20px", margin: "3px" }}
                      color="primary"
                      aria-label="add"
                      onClick={()=>generateRandomLinkPath(id, slot_number, location, h3.text, rightDay, nameOfUser, subTrackName)}
                      
                      
                    >link</Fab>
                  </Box>
                  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                  <ExpandMore
                   style={{margin: "3px" }}
                    expand={expanded == h3.id ? true : false}
                    onClick={() => handleExpandClick(h3.id)}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                    
                  </ExpandMore>
                  <Button variant="contained" style={{ width: "150px", height: "20px", margin: "3px" }} onClick={()=>setPrivateTeamIndicator(prev=>!prev)}>Private teams</Button>
                  </Box>
                  <Collapse
                    in={expanded == h3.id ? true : false}
                    timeout="auto"
                  >
                    <List>
                    {h3.slots.map((slot) => (
                      <ListItem sx={{margin:"0px"}}  className="slots-list-element">
                        <PersonIcon/>
                        <ListItemText sx={{margin:"0px 10px"}}>{slot}</ListItemText>
                        </ListItem>
                    ))}
                    </List>
                  </Collapse>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>
      )}

      {privateTeamIndicator&&<PrivateTeams indicator={setPrivateTeamIndicator}></PrivateTeams>}
      {!isFreePlace&&<NoFreePlace indicator={setIsFreePlace}></NoFreePlace>}
    </div>
  );
}
