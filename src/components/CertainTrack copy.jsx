import Header from "./Header";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import Players from "./players";
import Next7DaysDropdown2 from "./NextSevenDay copy";
import StaticDatePickerLandscape from "./NextSevenDay copy";

export default function CertainTrack2(props) {
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
  const [timeInterval, setTimeInterval] = useState(0)
  const [players, setPlayers] = useState(false)
  const [imageIndicator, setImageIndicator] = useState(false)
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  //declaring the function, which will be activated when someone join to a timeline
  const handleClick = async (id, subTrackName, city, sportType) => {
    console.log(id, subTrackName)
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
        city,
        sportType
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
  let city
  let img_urls
  let sportType
  try { 
    for (let track in props.allTrack) {
      if (props.allTrack[track].name == id) {
        desc = props.allTrack[track].description;
        nameOfTrack = props.allTrack[track].name;
        img_number = props.allTrack[track].img_urls.length;
        img_urls = props.allTrack[track].img_urls;
        slot_number = props.allTrack[track].slot_number;
        location = props.allTrack[track].location
        subtrackNames = props.allTrack[track].trackName
        city = props.allTrack[track].city
        sportType = props.allTrack[track].activity
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
  

  function changeSlide(event, plusMinus) {
    event.stopPropagation();
    const slides = document.querySelectorAll(".images");
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
   async function generateRandomLinkPath(trackName, slots, loc, time, date, user, subTrackName, city, organizer, img_urls, sportType) {
    slots = Array(Number(slots[subtrackNames.indexOf(subTrackName)])).fill("")
    console.log(slots)
    slots[slots.indexOf("")] = user
    console.log(subTrackName)
    const dataForLink = {trackName, slots, location: loc, time: `${date} ${time}`,user, subTrackName, description: "", isopen: false, city, isLimited: true, organizer, img_urls, sportType}
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
    setSubTrack(e)
    console.log(e, subTrack, subtrackNames)
  }


console.log(timeInterval)



//-----------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div>
      <Header title={id} success={props.getDownData} name={nameOfUser} startOfHeader={true}/>
      
      <Grid width={"1152px"} height={"450px"} margin={"30px auto"}>
      <Typography variant="h4" sx={{margin:"20px 0px", }}>{id} </Typography>
      <Box sx={{backgroundColor:"#dbdbdb", borderRadius:"10px", padding:"10px 15px"}}>
      <Typography variant="h5" sx={{marginBottom:"10px", }}>{desc} </Typography>
      <Typography variant="h5" sx={{margin:"0px", }}> Activity Type: {sportType} </Typography>
      </Box>
      <Grid width={"1152px"} height={"450px"} margin={"30px auto"} display={"flex"} justifyContent={"space-between"} onClick={()=>setImageIndicator(true)} >
        <Box sx={{width:"49.5%"}} >
      <img
                  
                  src={`${import.meta.env.VITE_BACKEND_URL}/img?user_id=${id}&number=0`}
                 
                  className="images2 slide left"
                  alt="image"
                />
                </Box>
                <Box sx={{width:"49.5%", margin:"0px 0px 0px 10px"}} display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
                  <Box sx={{ height:"48.5%"}}>
      <img
                  
                  src={`${import.meta.env.VITE_BACKEND_URL}/img?user_id=${id}&number=1`}
                 
                  className="images2 slide righttop"
                  alt="image"
                />
                </Box>
                <Box sx={{ height:"48.5%"}}>
      <img
                  
                  src={`${import.meta.env.VITE_BACKEND_URL}/img?user_id=${id}&number=2`}
                  
                  className="images2 slide rightbottom"
                  alt="image"
                />
                </Box>
                </Box>

      </Grid>
      <Box display={"flex"}>

      <Typography variant="h5" sx={{margin:"10px 0px 10px", width:"300px"}}>Choose a Date </Typography>
      {subtrackNames.map((date, index) => (
          <Button onClick={()=>subTrackFunc(index)} sx={{color:"black", marginLeft:"59.25px", backgroundColor:subTrack==index?"#dbdbdb":"white"}} key={date} value={index}>
            {date}
          </Button>
        ))}
      </Box>
     {/* <Next7DaysDropdown getUpData={setRightDay} />*/} 
      <StaticDatePickerLandscape getUpData={setRightDay} />
      <Box display={"flex"}  sx={{height:"60%"}} justifyContent={"space-between"} >
      <Box sx={{ overflow:"auto"}}>
      {h3s.map((h3) => (
              <Grid
                key={(h3.text)}
               
                minWidth={"250px"}
                padding={0}
                xs={12}
                sm={6}
                md={3}
                lg={2}
                xl={1.4}
               
                display={"flex"}
                
                
                
              
              >
                <Paper elevation={3} 
                
                onClick={()=>setTimeInterval(h3.id)}
                sx={{height:"50px",width:"300px", margin:"10px 0px 0px", padding:"10px" ,
                 position:"relative", borderRadius:"5px",backgroundColor:timeInterval==h3.id? "#dbdbdb":"#ffffff", cursor:"pointer",'&:hover': {
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                }}}>
                <Typography position={"absolute"} sx={{left:"1%", top:"5%"}}>Start:</Typography>
                <Typography position={"absolute"} sx={{left:"51%", top:"5%"}}>End:</Typography>
                  <Box display={"flex"} sx={{height:"100%",width:"100%"}}>
                 
                  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} sx={{position:"relative", height:"100%",width:"100%"}}>
                    
                    <Typography
                    sx={{margin:"30px"}}
                      key={h3.id}
                      style={{ color: h3.color }}

                    >
                      {h3.text.split("-")[0]}:00
                    </Typography>
                  
                  </Box>
                  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} sx={{height:"100%",width:"100%"}}>
                    <Typography
                    sx={{margin:"30px"}}
                      key={h3.id}
                      style={{ color: h3.color }}

                    >
                      {h3.text.split("-")[1].slice(0,-1)}:00
                    </Typography>
                  </Box>
                  </Box>
                  
                </Paper>
              </Grid>
            ))}
            </Box>
            <Box sx={{borderRadius:"10px", backgroundColor:"#dbdbdb", height:"100%", display:"flex", flexDirection:"column", justifyContent:"center"}}>
              <Box display={"flex"} justifyContent={"space-around"} sx={{padding:"10px"}}>
                {/*<Box sx={{borderRadius:"10px",backgroundColor:"#ffffff", width:"40%",padding:"10px",display:"flex" ,alignItems:"center", justifyContent:"center"}}><Typography>CHECK THE PLAYERS WHO ARE INTERESTED</Typography> </Box>
                <Box sx={{borderRadius:"10px",backgroundColor:"#ffffff",width:"40%",padding:"10px",display:"flex" ,alignItems:"center", justifyContent:"center"}}><Typography>I'M INTERESTED TO PLAY AT THAT TIME</Typography></Box>*/}
                <Button  onClick={()=>setPlayers(true)} sx={{borderRadius:"10px", width:"40%",padding:"10px",display:"flex" ,alignItems:"center", justifyContent:"center", color:"black",backgroundColor:"#ffffff","&:hover": {
          backgroundColor: "white"}}}>CHECK THE PLAYERS WHO ARE INTERESTED</Button>
                <Button    onClick={() => handleClick(timeInterval, subTrackName, city, sportType) }
                sx={{borderRadius:"10px", width:"40%",padding:"10px",display:"flex" ,alignItems:"center", justifyContent:"center", backgroundColor:"#ffffff", color:"black", borderColor:"#e0e0e0", "&:hover": {
          backgroundColor: "white"}}}>I'M INTERESTED TO PLAY AT THAT TIME</Button>
              </Box>
           
             
              <hr style={{  backgroundColor: "#d4d4d4", boxShadow:"none" }}/>
              <Box display={"flex"} justifyContent={"space-around"} sx={{padding:"10px"}}>
                <Box sx={{borderRadius:"10px",width:"40%",padding:"10px 0px", display:"flex" ,alignItems:"center", justifyContent:"center"}}><Typography>Do you want to organize a match with your friends in a closed event?</Typography> </Box> 
                {/*<Box sx={{borderRadius:"10px",backgroundColor:"#ffffff",width:"40%",padding:"10px",display:"flex" ,alignItems:"center", justifyContent:"center"}}><Typography>ORGANIZE A MATCH IN THIS TIMESLOT</Typography></Box>*/}
                <Button  onClick={()=>generateRandomLinkPath(id, slot_number, location,h3s.find((obj) => obj.id === timeInterval)?.text, rightDay, nameOfUser, subTrackName, city, nameOfUser, img_urls, sportType)} sx={{borderRadius:"10px", width:"40%",padding:"10px",display:"flex" ,alignItems:"center", justifyContent:"center", backgroundColor:"#ffffff", color:"black", "&:hover": {
          backgroundColor: "white"}}}>ORGANIZE A MATCH IN THIS TIMESLOT</Button>
              </Box>
            </Box>
            </Box>
            <Box>
            <RatingSlide title={id}/>
            </Box>
      </Grid>
     {imageIndicator&& <Box  onClick={()=>setImageIndicator(false)} sx={{
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
      <Grid
              minWidth={"50%"}
              maxWidth={"600px"}
              height={"600px"}
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
                            <ArrowForwardIosIcon onClick={(e)=>changeSlide(e, 1)} sx={{position:"absolute",  left: "85%",
  bottom: "45%", fontSize:"45px", color:"#f5f5f5", "&:hover":{ fontSize:"50px", color:"#d1d1d1"}}} />
   <ArrowBackIosNewIcon onClick={(e)=>changeSlide(e,-1)} sx={{position:"absolute",  right: "85%",
  bottom: "45%", fontSize:"45px", color:"#f5f5f5", "&:hover":{ fontSize:"50px", color:"#d1d1d1"}}} />
            </Grid>
            </Box>}{" "}
      {players && <Players indicator={setPlayers} h3s={h3s} id={timeInterval}/>}
      
      </div>)}
















      {/*{errorhandler ? (
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
*/}