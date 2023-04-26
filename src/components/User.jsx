import { Button, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Header from "./Header";

export default function User(props) {
  //declaring const and states
  const navigate = useNavigate();
  const { user } = UserAuth();
  const id = user ? user.displayName : "";
  const [userData, setUserData] = useState(null);
  const [render, setRender] = useState("ha");
  const [emailAndUser, setEmailAndUser] = useState(null)
  const [links, setLinks] = useState([])

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
        booked_tracks: data.booked_tracks.map(function (item) {
          const date_string = item.split(": ")[1].split(" ").slice(0,2).join(" ");
          console.log(date_string)
          // Extract the date and time components from the date string
          const date_components = date_string.split(" ");
          const date = date_components[0];
          const time_interval = date_components[1];

          // Extract the start time and end time from the time interval
          const [start_time, end_time] = time_interval.split("-").map(Number);

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
                onClick={() => cancel(item)}
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
        booked_tracks: data.booked_tracks.map(function (item) {
          const date_string = item.split(": ")[1].split(" ").slice(0,2).join(" ");
          console.log(date_string)
          // Extract the date and time components from the date string
          const date_components = date_string.split(" ");
          const date = date_components[0];
          const time_interval = date_components[1];

          // Extract the start time and end time from the time interval
          const [start_time, end_time] = time_interval.split("-").map(Number);

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
                onClick={() => cancel(item)}
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
      ></Header>
      <Grid
        container
        margin={"15px"}
        width={"90%"}
        display={"flex"}
        flexDirection={"row"}
        gap={3}
      >
      <Grid sx={{
            backgroundColor: "#ebebeb",
            borderRadius: "10px",
            padding: "10px",
            
          }}
          item
          xs={12}
        sm={5}
        
        xl={3.5}

          maxWidth={"500px"} >
          
        <Typography variant="h5" margin={"10px"}>Your email: {emailAndUser? emailAndUser[0]: "cannot get"}</Typography>
        <Typography variant="h5" margin={"10px"}>Your username: {emailAndUser? emailAndUser[1]: "cannot get"}</Typography>
        <Button variant="conatained"  margin={"10px"}>Change password? [not working yet]</Button>
      </Grid>
        <Grid
          sx={{
            backgroundColor: "#ebebeb",
            borderRadius: "10px",
            padding: "10px",
            
          }}
          item
          xs={12}
        sm={5}
    
        xl={4}
          maxWidth={"500px"}
        >
          <Box display={"flex"} justifyContent={"center"}>
            <Typography sx={{ marginBottom: "15px" }} variant="h4">
              Hi {id}
            </Typography>
          </Box>
          {userData ? (
            <>
              <Typography variant="h5">your tracks:</Typography>
              {userData.tracks}
              <Typography variant="h5" marginTop={"20px"}>
                Upcomming activites:
              </Typography>
              {userData.booked_tracks}
              <div></div>
            </>
          ) : (
            <div>
              <Typography variant="h4">Loading...</Typography>
            </div>
          )}
          <Button variant="contained">See previous activities</Button>
        </Grid>

        <Grid
          sx={{
            backgroundColor: "#ebebeb",
            borderRadius: "10px",
            padding: "10px",
            
          }}
          item
          xs={12}
        sm={5}
    
        xl={4}
          maxWidth={"500px"}
        >
          <Box display={"flex"} justifyContent={"center"}>
            <Typography sx={{ marginBottom: "15px" }} variant="h4">
              Live Custom Groups:
            </Typography>
          </Box>
          {links ? (
            <>
              {links.map((link, index)=>{
                 const date_string = link[2].slice(0,-1);
          console.log(date_string, "ha")
          // Extract the date and time components from the date string
          const date_components = date_string.split(" ");
          const date = date_components[0];
          const time_interval = date_components[1];

          // Extract the start time and end time from the time interval
          const [start_time, end_time] = time_interval.split("-").map(Number);

          // Convert the date and time components to Date objects
          const activity_start_datetime = new Date(`${date}T${start_time}:00:00`);
          const activity_end_datetime = new Date(`${date}T${end_time}:00:00`);
          const current_datetime = new Date();
          console.log(activity_start_datetime,current_datetime)
          // Compare the activity start time with the current time
          if (activity_start_datetime >= current_datetime) {
            console.log(true); // Activity has started
                return(
                 <Paper
                 key={index}
                   sx={{ margin: "10px" }}
                   className="booked-times"
                   elevation={6}
                 >
                   <h2 className="booked-times-h2">
                     <li>{link[1]}:{link[2]}</li>
                   </h2>
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
                 </Paper>)
              }})}
             
            </>
          ) : (
            <div>
              <Typography variant="h4">Loading...</Typography>
            </div>
          )}
          <Button variant="contained">See previous custom groups</Button>
        </Grid>
        
      </Grid>
    </div>
  );
}
