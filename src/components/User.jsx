import { Button, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Header from "./Header";
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsRunOutlinedIcon from '@mui/icons-material/DirectionsRunOutlined';
import EditIcon from '@mui/icons-material/Edit';
import {sendEmailVerification} from "firebase/auth"

export default function User(props) {
  //declaring const and states
  const navigate = useNavigate();
  const { user } = UserAuth();
  const id = user ? user.displayName : "";
  const [userData, setUserData] = useState(null);
  const [render, setRender] = useState("ha");
  const [emailAndUser, setEmailAndUser] = useState(null)
  const [links, setLinks] = useState([])
  console.log(user)
  console.log(user.emailVerified)
  //this is the function for cancelling boooked times on the userpage
  async function cancel(item) {
    const nameOfTrack = item.split(": ")[0];
    //const timeline = item.split(": ")[1].split(" ").slice(1).join(" ");
    const timeline = item.split(": ")[1].split(" ")[1];
    const rightDay = item.split(": ")[1].split(" ")[0];
    const subTrack = item.split(": ")[1].split(" ").slice(2).join(" ");
    console.log( item,subTrack)
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cancel`, {
      method: "POST",
      body: JSON.stringify({ nameOfTrack, timeline, id, rightDay, subTrack }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    props.getUpData(item);

    setRender(item);
  }
 
  //this is the function for navigating to a certain tracks page after pressing see button on the user page
  function see(item) {
    navigate(`/tracks/${item.split(":")[0]}`);
  }

  //this is for deleting tracks (which this user created)
  async function deleteTrack(item) {
    const dataToDelete = { id, track: item.split(":")[0] };

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/delete`, {
      method: "POST",
      body: JSON.stringify(dataToDelete),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deleted = await response.text();
    if (deleted == "deleted") {
      props.getUpData([item, "deleted"]);

      setRender([item, "deleted"]);
    }
  }

  //this retrieves the appropriate data from database on rerender
  useEffect(() => {
    async function fetching_user() {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user`, {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
    
      setUserData({
        booked_tracks: data.booked_tracks.map(function (item, index) {
          console.log(item)
          const date_string = item.slice(1,3).join(" ");
          console.log(date_string)
          // Extract the date and time components from the date string
          const date_components = date_string.split(" ");
          const date = date_components[0];
          const time_interval = date_components[1];

          // Extract the start time and end time from the time interval
          let [start_time, end_time] = time_interval.split("-").map(Number);
          start_time = String(start_time).padStart(2, '0');
          // Convert the date and time components to Date objects
          const activity_start_datetime = new Date(`${date}T${start_time}:00:00`);
          const activity_end_datetime = new Date(`${date}T${end_time}:00:00`);
          const current_datetime = new Date();
          console.log(activity_start_datetime,current_datetime)
          // Compare the activity start time with the current time
          if (activity_start_datetime >= current_datetime) {
            console.log(true); // Activity has started
          
          return (
            <Paper
            key={index}
              sx={{ margin: "10px"}}
              className="booked-times"
              elevation={6}
            >
             <Box  sx={{padding:"10px", borderRight:"1px solid #7B8FA1", width:"200px", marginRight:"10px"}}>
              <Typography variant="h6" className="booked-times-h2">
                {item[0]}
              </Typography>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
               <Box display={"flex"} gap={3} width={"70%"} alignItems={"center"} justifyContent={"space-around"}>
              <Box sx={{display:"flex", alignItems:"center", gap:1,width:"30%"}}>
               <DateRangeIcon/>
              <Typography> {`${item[1]} `}{item[2]}</Typography>
              </Box>
              <Typography sx={{color:"#7B8FA1 "}}  ><li></li></Typography>
              <Box sx={{display:"flex", alignItems:"center", gap:1, width:"30%"}}>
              <LocationOnIcon/> 
              <Typography> {item[3]}</Typography>
              </Box>
              <Typography sx={{color:"#7B8FA1 "}}><li></li></Typography>
              <Box sx={{display:"flex", alignItems:"center", gap:1, width:"30%"}}>
              <DirectionsRunOutlinedIcon/> 
              <Typography> {item[4]}{` - ${item[5]}`}</Typography>
              </Box></Box>
<Box display={"flex"} alignItems={"center"}>
              <Button
                className="cancel-see"
                /* onClick={() => deleteTrack(item)} */
                variant="text"
              >
                X
              </Button>
              <Button
                onClick={() => navigate(`/tracks/${link[1]}/${link[0]}`)} 
                className="cancel-see"
                variant="text"
              >
                See
              </Button>
              </Box>
              </Box>
            </Paper>);
        }}),
        tracks: data.tracks.map(function (item) {
          return (
            <Paper
            key={item}
              sx={{ margin: "10px" }}
              className="booked-times"
              elevation={6}
            >
              <h2 className="booked-times-h2">
                <li>{item}</li>
              </h2>
              <Button
                className="cancel-see"
                onClick={() => deleteTrack(item)}
                variant="text"
              >
                X
              </Button>
              <Button
                onClick={() => see(item)}
                className="cancel-see"
                variant="text"
              >
                See
              </Button>
            </Paper>
          );
        }),
      });
      setEmailAndUser([data.password, data.user])
      try {
        setLinks(data.customLinks)
      } catch (error) {
        console.log(error)
      }
      
    }
    fetching_user();
  }, [render]);

  if (!userData){
    async function fetching_user() {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user`, {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
     
      setUserData({
        booked_tracks: data.booked_tracks.map(function (item, index) {
          console.log(item)
          const date_string = item.slice(1,3).join(" ");
          console.log(date_string)
          // Extract the date and time components from the date string
          const date_components = date_string.split(" ");
          const date = date_components[0];
          const time_interval = date_components[1];

          // Extract the start time and end time from the time interval
          let [start_time, end_time] = time_interval.split("-").map(Number);
          start_time = String(start_time).padStart(2, '0');
          // Convert the date and time components to Date objects
          const activity_start_datetime = new Date(`${date}T${start_time}:00:00`);
          const activity_end_datetime = new Date(`${date}T${end_time}:00:00`);
          const current_datetime = new Date();
          console.log(activity_start_datetime,current_datetime)
          // Compare the activity start time with the current time
          if (activity_start_datetime >= current_datetime) {
            console.log(true); // Activity has started
          return (
            <Paper
            key={index}
              sx={{ margin: "10px"}}
              className="booked-times"
              elevation={6}
            >
             <Box  sx={{padding:"10px", borderRight:"1px solid #7B8FA1", width:"200px", marginRight:"10px"}}>
              <Typography variant="h6" className="booked-times-h2">
                {item.split(": ")[0]}
              </Typography>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
               <Box display={"flex"} gap={3} width={"70%"} alignItems={"center"} justifyContent={"space-around"}>
              <Box sx={{display:"flex", alignItems:"center", gap:1,width:"30%"}}>
               <DateRangeIcon/>
              <Typography> {date_string}</Typography>
              </Box>
              <Typography sx={{color:"#7B8FA1 "}}  ><li></li></Typography>
              <Box sx={{display:"flex", alignItems:"center", gap:1, width:"30%"}}>
              <LocationOnIcon/> 
              <Typography>  -</Typography>
              </Box>
              <Typography sx={{color:"#7B8FA1 "}}><li></li></Typography>
              <Box sx={{display:"flex", alignItems:"center", gap:1, width:"30%"}}>
              <DirectionsRunOutlinedIcon/> 
              <Typography> -</Typography>
              </Box></Box>
<Box display={"flex"} alignItems={"center"}>
              <Button
                className="cancel-see"
                /* onClick={() => deleteTrack(item)} */
                variant="text"
              >
                X
              </Button>
              <Button
                onClick={() => navigate(`/tracks/${link[1]}/${link[0]}`)} 
                className="cancel-see"
                variant="text"
              >
                See
              </Button>
              </Box>
              </Box>
            </Paper>);
        }}),
        tracks: data.tracks.map(function (item) {
          return (
            <Paper
            key={item}
              sx={{ margin: "10px" }}
              className="booked-times"
              elevation={6}
            >
              <h2 className="booked-times-h2">
                <li>{item}</li>
              </h2>
              <Button
                className="cancel-see"
                onClick={() => deleteTrack(item)}
                variant="text"
              >
                X
              </Button>
              <Button
                onClick={() => see(item)}
                className="cancel-see"
                variant="text"
              >
                See
              </Button>
            </Paper>
          );
        }),
      });
      setEmailAndUser([data.password, data.user])
      try {
        setLinks(data.customLinks)
      } catch (error) {
        console.log(error)
      }
    }
    fetching_user();
  }
   console.log(links)






  return (
    <div>
     
      <Header
        title="account info"
        success={props.getDownData}
        name={props.getDownData2}
        startOfHeader={true}
      ></Header>
      <Grid display={"flex"} justifyContent={"center"}>
      
      <Grid
        container
        margin={"15px"}
        width={"1152px"}
        display={"flex"}
        flexDirection={"row"}
        gap={3}
      >
        <Typography variant="h4"> Hi {id} </Typography>
      <Grid sx={{
            backgroundColor: "#ebebeb",
            borderRadius: "10px",
            padding: "10px",
            paddingLeft:"0px"
            
          }}
          item
          xs={12}
       

          maxWidth={"500px"} >
          <Box display={"flex"}>

        <Typography variant="h5" margin={"10px"} width={"200px"}>Your email:</Typography>
        <Typography variant="h5" margin={"10px"} width={"300px"}> {emailAndUser? emailAndUser[0]: "cannot get"}</Typography>
        <EditIcon/>
          </Box>
         {!user.emailVerified && <Box display={"flex"} alignItems={"center"}><Typography sx={{color:"red"}}>your email is not verified! You have to verify it to be able to join or organize activites:</Typography>
       <Button onClick={()=>sendEmailVerification(user)} variant="outlined" sx={{color:"Red"}}>resend verification email</Button>  </Box>}
          <Box display={"flex"}>

<Typography variant="h5" margin={"10px"} width={"200px"}>Your username:</Typography>
<Typography variant="h5" margin={"10px"} width={"300px"}> {emailAndUser? emailAndUser[1]: "cannot get"}</Typography>
<EditIcon/>
  </Box>
  <Box display={"flex"}>

<Typography variant="h5" margin={"10px"} width={"200px"}>Password:</Typography>
<Typography variant="h5" margin={"10px"} width={"300px"}>**********</Typography>
<EditIcon/>
  </Box>
      </Grid>
        <Grid
          sx={{
            backgroundColor: "#ebebeb",
            borderRadius: "10px",
            padding: "10px",
            
          }}
          item
          xs={12}
  
          maxWidth={"500px"}
        >

          {userData ? (
            <>
              {/*<Typography variant="h5">your tracks:</Typography>
              {userData.tracks} */}
              <Box display={"flex"} justifyContent={"space-between"}>

              <Typography variant="h5" >
                Upcomming activites which you are interested in:
              </Typography>
              <Button size="small" variant="outlined" sx={{color:"black", borderColor:"black"}}>previous activities</Button>
              </Box>
              {userData.booked_tracks}
              <div></div>
            </>
          ) : (
            <div>
              <Typography variant="h4">Loading...</Typography>
            </div>
          )}
          
        </Grid>

        <Grid
          sx={{
            backgroundColor: "#ebebeb",
            borderRadius: "10px",
            padding: "10px",
            
          }}
          item
          xs={12}
       
          maxWidth={"500px"}
        >
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h5">
              Upcomming activities which your are joined:
            </Typography>
            <Button size="small" variant="outlined" sx={{color:"black", borderColor:"black"}}>previous Activites</Button>
          </Box>
          {links ? (
            <>
              {links.map((link, index)=>{
                if(link.slice(-3,-2) != user.displayName){
                 const date_string = link[2].slice(0,-1);
          console.log(date_string, "ha")
          // Extract the date and time components from the date string
          const date_components = date_string.split(" ");
          const date = date_components[0];
          const time_interval = date_components[1];

          // Extract the start time and end time from the time interval
          let [start_time, end_time] = time_interval.split("-").map(Number);
           start_time = String(start_time).padStart(2, '0');
          // Convert the date and time components to Date objects
          const activity_start_datetime = new Date(`${date}T${start_time}:00:00`);
          const activity_end_datetime = new Date(`${date}T${end_time}:00:00`);
          const current_datetime = new Date();
          console.log(activity_start_datetime,current_datetime, start_time)
          // Compare the activity start time with the current time
          if (activity_start_datetime >= current_datetime) {
            console.log(true); // Activity has started
                return(
                 <Paper
                 key={index}
                   sx={{ margin: "10px"}}
                   className="booked-times"
                   elevation={6}
                 >
                  <Box  sx={{padding:"10px", borderRight:"1px solid #7B8FA1", width:"200px", marginRight:"10px"}}>
                   <Typography variant="h6" className="booked-times-h2">
                     {link[1]}
                   </Typography>
                   </Box>
                   <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
                    <Box display={"flex"} gap={3} width={"70%"} alignItems={"center"} justifyContent={"space-around"}>
                   <Box sx={{display:"flex", alignItems:"center", gap:1,width:"30%"}}>
                    <DateRangeIcon/>
                   <Typography> {link[2]}</Typography>
                   </Box>
                   <Typography sx={{color:"#7B8FA1 "}}  ><li></li></Typography>
                   <Box sx={{display:"flex", alignItems:"center", gap:1, width:"30%"}}>
                   <LocationOnIcon/> 
                   <Typography>  {link.slice(-2,-1)}</Typography>
                   </Box>
                   <Typography sx={{color:"#7B8FA1 "}}><li></li></Typography>
                   <Box sx={{display:"flex", alignItems:"center", gap:1, width:"30%"}}>
                   <DirectionsRunOutlinedIcon/> 
                   <Typography> {link.slice(-1)}</Typography>
                   </Box></Box>
<Box>
                   <Button
                     className="cancel-see"
                     /* onClick={() => deleteTrack(item)} */
                     variant="text"
                   >
                     X
                   </Button>
                   <Button
                     onClick={() => navigate(`/tracks/${link[1]}/${link[0]}`)} 
                     className="cancel-see"
                     variant="text"
                   >
                     See
                   </Button>
                   </Box>
                   </Box>
                 </Paper>)
              }}})}
             
            </>
            
          ) : (
            <div>
              <Typography variant="h4">Loading...</Typography>
            </div>
          )}
         
        </Grid>
        <Grid
          sx={{
            backgroundColor: "#ebebeb",
            borderRadius: "10px",
            padding: "10px",
            
          }}
          item
          xs={12}
       
          maxWidth={"500px"}
        >
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h5">
              Upcomming activities which your are organizing:
            </Typography>
            <Button size="small" variant="outlined" sx={{color:"black", borderColor:"black"}}>previous Activites</Button>
          </Box>
          {links ? (
            <>
              {links.map((link, index)=>{
                console.log(link.slice(-3,-2), user.displayName)
                if (link.slice(-3,-2) == user.displayName){
                 const date_string = link[2].slice(0,-1);
          console.log(date_string, "ha")
          // Extract the date and time components from the date string
          const date_components = date_string.split(" ");
          const date = date_components[0];
          const time_interval = date_components[1];

          // Extract the start time and end time from the time interval
          let [start_time, end_time] = time_interval.split("-").map(Number);
           start_time = String(start_time).padStart(2, '0');
          // Convert the date and time components to Date objects
          const activity_start_datetime = new Date(`${date}T${start_time}:00:00`);
          const activity_end_datetime = new Date(`${date}T${end_time}:00:00`);
          const current_datetime = new Date();
          console.log(activity_start_datetime,current_datetime, start_time)
          // Compare the activity start time with the current time
          if (activity_start_datetime >= current_datetime) {
            console.log(true); // Activity has started
            return(
              <Paper
              key={index}
                sx={{ margin: "10px"}}
                className="booked-times"
                elevation={6}
              >
               <Box  sx={{padding:"10px", borderRight:"1px solid #7B8FA1", width:"200px", marginRight:"10px"}}>
                <Typography variant="h6" className="booked-times-h2">
                  {link[1]}
                </Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
                 <Box display={"flex"} gap={3} width={"70%"} alignItems={"center"} justifyContent={"space-around"}>
                <Box sx={{display:"flex", alignItems:"center", gap:1,width:"30%"}}>
                 <DateRangeIcon/>
                <Typography> {link[2]}</Typography>
                </Box>
                <Typography sx={{color:"#7B8FA1 "}}  ><li></li></Typography>
                <Box sx={{display:"flex", alignItems:"center", gap:1, width:"30%"}}>
                <LocationOnIcon/> 
                <Typography>  {link.slice(-2,-1)}</Typography>
                </Box>
                <Typography sx={{color:"#7B8FA1 "}}><li></li></Typography>
                <Box sx={{display:"flex", alignItems:"center", gap:1, width:"30%"}}>
                <DirectionsRunOutlinedIcon/> 
                <Typography> {link.slice(-1)}</Typography>
                </Box></Box>
<Box>
                <Button
                  className="cancel-see"
                  /* onClick={() => deleteTrack(item)} */
                  variant="text"
                >
                  X
                </Button>
                <Button
                  onClick={() => navigate(`/tracks/${link[1]}/${link[0]}`)} 
                  className="cancel-see"
                  variant="text"
                >
                  See
                </Button>
                </Box>
                </Box>
              </Paper>)}
              }})}
             
            </>
            
          ) : (
            <div>
              <Typography variant="h4">Loading...</Typography>
            </div>
          )}
         
        </Grid>
      </Grid>
      </Grid>
    </div>
  );
}
