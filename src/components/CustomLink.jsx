import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Typography, Button, Grid, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { Box } from '@mui/system';
import LoginWithFirebase from './loginWithFirebase';
import Header from './Header';
import CountdownTimer from './timerCountDown';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import CopyToClipboardButton from './CopyURL';
import { useLocation } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Conversation from './ratingSlider copy';
import CancelEvent from './CancelEvent';
import VerifyEmail from './verifyEmail';
import Skeleton from 'react-loading-skeleton'
import { Example } from './framerTest';
import { motion } from "framer-motion";
import UserRegisterWithFirebase from './UserRegisterWithFirebase';
import ProvideUserName from './ProvideUserName';

 export default function CustomLink() {
  const { pathname } = useLocation();
   const {id, hashcode} = useParams()
   const encodedString = encodeURIComponent(`${id}/${hashcode}`);
   const navigate = useNavigate()
    const [linkData, setLinkData] = useState({})
  const [cancelEvent, setCancelEvent] = useState(false)
  const [verifyEmail, setVerifyEmail] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [provideUserName, setProvideUserName] = useState(false)
  
   const {user} = UserAuth()
   const constraintsRef = useRef(null);
   
    console.log(id, hashcode, user)
 

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

   async function join(){
     const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/rightCustomLink`,
        {
        method: "POST",
        body: JSON.stringify({hashcode :hashcode}),
        headers: {
          "Content-Type": "application/json",
        },
    })
        console.log(response)
        const data = await response.json();
        if(!linkData.isLimited){
          if (!data.slots.includes(user.displayName)){
            data.slots.push(user.displayName) }
            else if(data.slots.includes(user.displayName)){
             
              data.slots = data.slots.filter((item) => item !== user.displayName)
            }
        }
        else{if (data.slots.includes("") && !data.slots.includes(user.displayName)){
          data.slots[data.slots.indexOf('')] = user.displayName}
          else if(data.slots.includes(user.displayName)){
            data.slots[data.slots.indexOf(user.displayName)] = ""
          }}

          console.log(data)
          const response2 = await fetch(`${import.meta.env.VITE_BACKEND_URL}/rightCustomLinkUpdate`,
          {
          method: "POST",
          body: JSON.stringify({data: data, user: user.displayName}),
          headers: {
            "Content-Type": "application/json",
          },
      })
        const newData = await response2.json()
        setLinkData(prev => {
          return {
            ...prev,
            slots: newData.slots
          };
        });
        } 

       
   

   async function leave(){
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/rightCustomLinkUpdate`,
          {
          method: "POST",
          body: JSON.stringify({data: data, user: user.displayName}),
          headers: {
            "Content-Type": "application/json",
          },
      })
        const newData = await response.json()
   }

 async function openActivity(){
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/openCustomLink`,
        {
        method: "POST",
        body: JSON.stringify({hashcode :hashcode}),
        headers: {
          "Content-Type": "application/json",
        },
    })
        console.log(response)
        const data = await response.json();
        setLinkData(data);
 }

   useEffect(()=>{
    async function getLink(){
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/rightCustomLink`,
        {
        method: "POST",
        body: JSON.stringify({hashcode :hashcode}),
        headers: {
          "Content-Type": "application/json",
        },
    })
        console.log(response)
        const data = await response.json();
        setLinkData(data)
    }
    getLink()
   }, [])
   console.log(linkData)
   const liSlotsList = linkData?.slots ? linkData.slots.map((slot, index) => (
    <ListItem key={index} className="slots-list-element" >
      <PersonIcon sx={{color:"#727272"}} />
      <ListItemText sx={{margin:"0px 10px"}}>{slot}</ListItemText>
    </ListItem>
  )): ""

  const liSlotsList2 = linkData?.slots ? linkData.slots.map((slot, index) => (
    <motion.div style={{height:"30px", display:"flex", justifyContent:"center", alignItems:"center", zIndex:9999, cursor:"pointer"}} drag dragConstraints={constraintsRef} >
   
      <PersonIcon sx={{color:"#727272"}} />
      <Typography sx={{margin:"0px 10px"}}>{slot}</Typography>
    </motion.div>
  )): ""

  console.log(liSlotsList)
  let dateObj
  let now
    if(linkData?.time){
     const baseDate = linkData.time.split(" ")[0] + " "+linkData.time.split(" ")[1].split("-")[0]
     const [date, time] = baseDate.split(' ');
     const [year, month, day] = date.split('-');
     const [hour] = time.split(':');
      dateObj = new Date(year, month - 1, day, hour);
       now = new Date();
      console.log(dateObj,now)
    
    } 
  

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




   
  return (<Grid>
    <Header title="Custom Group" startOfHeader={true}/>
    <Grid display={"flex"} justifyContent={"center"}>
    <Grid sx={{ 
        display: 'flex',
        flexDirection: 'column',
        width:{md:"1152px", xs:"100%"},
        gap: '16px',
        backgroundColor: 'white',
        borderRadius: '8px',
        margin: "10px"
      }}>
      
        <Typography variant="h4" component="h1" gutterBottom sx={{ marginBottom: '16px' }}>
         {linkData.description} 
        </Typography>

        <Box sx={{backgroundColor:"#dbdbdb", borderRadius:"10px", padding:"10px", display:"flex",justifyContent:"space-between", gap:6}}>
          <Box sx={{backgroundColor:"#dbdbdb", borderRadius:"10px", padding:"10px", display:"flex", gap:6}}>
          <Box>
        <Typography variant="h6" component="h1" gutterBottom >
          Name of location/activity: 
          <Typography variant="h6" component="h1" gutterBottom >
          Name of subTrack: 
          </Typography>
        </Typography>
        <Typography variant="h6" component="h1" gutterBottom >
          Date: 
        </Typography>
        <Typography variant="h6" component="h1" gutterBottom >
          Location: 
        </Typography>
        <Typography variant="h6" component="h1" gutterBottom >
          Event Type: 
        </Typography>
        <Typography variant="h6" component="h1" gutterBottom >
          Sport Type: 
        </Typography>
        </Box>
        <Box>
        <Typography variant="h6" component="h1" gutterBottom >
           {linkData.trackName}
          <Typography variant="h6" component="h1" gutterBottom >
           {linkData.subTrackName}
          </Typography>
        </Typography>
        <Typography variant="h6" component="h1" gutterBottom >
          {linkData.time}
        </Typography>
        <Typography variant="h6" component="h1" gutterBottom >
           {linkData.location}
        </Typography>
        <Typography variant="h6" component="h1" gutterBottom >
           {linkData.isopen? "Community":"Private"}
        </Typography>
        <Typography variant="h6" component="h1" gutterBottom >
           {linkData?.sportType? linkData?.sportType :"undefined"}
        </Typography>
        </Box>
        </Box>
        {user? user.displayName === linkData.user?<Box sx={{display:{md:"flex",xs:"none"}}}  flexDirection={"column"} ><Typography variant="h6" component="h1" gutterBottom sx={{ marginBottom: '16px' }}>
          You Are the organizer 
        </Typography><Button onClick={()=>setCancelEvent(true)} variant='outlined' sx={{color:"black", borderColor:"black"}}>Cancel event</Button> 
        <Button variant='outlined' sx={{color:"black", borderColor:"black",marginTop:"5px"}}>Finalize/Book event</Button></Box>:
        <Box display={"flex"} sx={{display:{md:"flex",xs:"none"}}} flexDirection={"column"}><Typography variant="h6" component="h1" gutterBottom sx={{ marginBottom: '16px',textAlign:"center" }}>
        Organizer:
      </Typography><Typography variant="h6" component="h1" gutterBottom sx={{ marginBottom: '16px', textAlign:"center"}}>
      {linkData.user}
      </Typography></Box>:  <Box display={"flex"} sx={{display:{md:"flex",xs:"none"}}} flexDirection={"column"}><Typography variant="h6" component="h1" gutterBottom sx={{ marginBottom: '16px',textAlign:"center" }}>
        Organizer:
      </Typography><Typography variant="h6" component="h1" gutterBottom sx={{ marginBottom: '16px', textAlign:"center"}}>
      {linkData.user}
      </Typography></Box>}
        </Box>
        {user? user.displayName === linkData.user?<Box sx={{display:{md:"none",xs:"flex"}}}  flexDirection={"column"} ><Typography variant="h6" component="h1" gutterBottom sx={{ marginBottom: '16px',textAlign:"center" }}>
          You Are the organizer 
        </Typography><Button onClick={()=>setCancelEvent(true)} variant='outlined' sx={{color:"black", borderColor:"black"}}>Cancel event</Button> 
        <Button variant='outlined' sx={{color:"black", borderColor:"black",marginTop:"5px"}}>Finalize/Book event</Button></Box>:
        <Box display={"flex"} sx={{display:{md:"none",xs:"flex"}}} flexDirection={"column"}><Typography variant="h6" component="h1" gutterBottom sx={{ marginBottom: '16px',textAlign:"center" }}>
        Organizer:
      </Typography><Typography variant="h6" component="h1" gutterBottom sx={{ marginBottom: '16px', textAlign:"center"}}>
      {linkData.user}
      </Typography></Box>: <Box display={"flex"} sx={{display:{md:"none",xs:"flex"}}} flexDirection={"column"}><Typography variant="h6" component="h1" gutterBottom sx={{ marginBottom: '16px',textAlign:"center" }}>
        Organizer:
      </Typography><Typography variant="h6" component="h1" gutterBottom sx={{ marginBottom: '16px', textAlign:"center"}}>
      {linkData.user}
      </Typography></Box>}
        
         
        {user? linkData?.slots? linkData.slots.includes(user.displayName)? <CopyToClipboardButton datetime={linkData.time}/> :"":"":""}
      {user? user.displayName === linkData.user ?  !linkData.isopen? <Button onClick={openActivity} variant='outlined' sx={{color:"black", borderColor:"black"}}>Open the activity for the community</Button>: 
      <Typography variant='h6' sx={{color:"green"}}>You opened this activity for the community</Typography>:"":""}
      
        {dateObj >= now ? (
  user ? (
    <Box display={"flex"} gap={3}>
      {user.displayName === linkData.user ?"":<Button onClick={user.emailVerified?join:()=>setVerifyEmail(true)} variant="outlined" color="primary" sx={{ width: '100px',color:"black",backgroundColor:"#d6d6d6" }}>
        {linkData?.slots ? (linkData.slots.includes(user.displayName) ? "Leave" : "Join") : "error"}
      </Button>}
      {linkData?.time && <CountdownTimer targetDateStr={linkData.time} />}
    </Box>
  ) : (
    <Box >
      <Box display={"flex"} justifyContent={"space-between"}>
      <Button variant="outlined" onClick={() => setShowLogin(true)} color="primary" sx={{ width: '48%',color:"black",backgroundColor:"#d6d6d6" }}>
        Log in
      </Button>
      <Button onClick={() => setShowRegister(true)} variant="outlined" color="primary" sx={{ width: '48%',color:"black",backgroundColor:"#d6d6d6" }}>
        sign up
      </Button>
      </Box>
      {linkData?.time && <CountdownTimer targetDateStr={linkData.time} />}
    </Box>
  )
) : (
  <Typography variant={"h5"}>
    Sorry, this activity already happened, so you cannot join anymore. If you participated in it, We hope it was fun!
  </Typography>
)}
<Box  justifyContent={"space-between"} sx={{display:"flex", flexDirection:{md:"row", xs:"column"}, alignItems:"center"}}>
        <Box className="element" sx={{border: '1px solid #dbdbdb', borderRadius:"10px", width:{md:"50%", xs:"80%"}, height:"300px", overflow:"auto", margin:"10px 10px 10px 0px"}}>
          <Typography variant='h5' sx={{margin:"20px"}}>Participants</Typography>
        <List sx={{ listStyle: 'none', margin: '0', padding: '0' }}>
          { liSlotsList }
        </List>
      {!linkData.isLimited && <Typography sx={{margin:"20px"}}><AddIcon/><PersonIcon/></Typography>}
        </Box>
        <div className="example-container">

   
     {/*<>
      <motion.div className="drag-area" ref={constraintsRef} style={{border:"1px solid #dbdbdb", borderRadius:"10px", boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.3)',}} >

      
      
          { liSlotsList2 }
      </motion.div>
        
</>*/}
     </div>

        <Grid
              minWidth={"50%"}
              maxWidth={"600px"}
              maxHeight={"300px"}
              height={"300px"}
              item
              xs={12}
              sm={10}
              md={8}
              lg={8}
              xl={4}
              className="slider"
              sx={{padding:"0px !important", margin:{md:"10px 0px 10px 10px",xs:"0px"}, minWidth:{md:"50%", xs:'100%'}, display:"flex", alignItems:"center"}}
              
            >
              {linkData?.img_urls ? <Box> {Array.from({ length: linkData.img_urls.length}, (_, i) => (
                <img
                  key={i}
                  
                  src={`${import.meta.env.VITE_BACKEND_URL}/img?user_id=${linkData._id}&number=${i}&event=${true}`}
                  onError={(e) => {
                    console.error(`Failed to load image: ${e.target.src}`);
            
                  }}
                  className="images slide"
                  alt="image"
                />
              ))}
                            <ArrowForwardIosIcon onClick={(e)=>changeSlide(e, 1)} sx={{position:"absolute",  left: "85%",
  bottom: "45%", fontSize:"45px", color:"#f5f5f5", "&:hover":{ fontSize:"50px", color:"#d1d1d1"}}} />
   <ArrowBackIosNewIcon onClick={(e)=>changeSlide(e,-1)} sx={{position:"absolute",  right: "85%",
  bottom: "45%", fontSize:"45px", color:"#f5f5f5", "&:hover":{ fontSize:"50px", color:"#d1d1d1"}}} />  </Box> :""}
            
  {(linkData?.img_urls ? linkData?.img_urls.length: 0) ==0 ? <Typography variant='h6' textAlign={"center"}>We couldn't retrieve the images or there isn't any provided</Typography>:''}
            </Grid>

            </Box>
          {user?linkData?.slots? linkData.slots.includes(user.displayName)?<Conversation _id={linkData._id}/> :"" : "":""}  
      </Grid>
      
      </Grid>
     {cancelEvent && <CancelEvent indicator={setCancelEvent}/>}
     {verifyEmail && <VerifyEmail indicator={setVerifyEmail}/>}
     {showLogin &&<LoginWithFirebase indicator={setShowLogin}/>} 
     {showRegister &&<UserRegisterWithFirebase indicator={setShowRegister} indicatorforLogin={setShowLogin} setProvideUserName={setProvideUserName}/>}
     {provideUserName && <ProvideUserName indicator={setProvideUserName}/>}
     
      </Grid>
  );
}

