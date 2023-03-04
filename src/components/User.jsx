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

  //this is the function for cancelling boooked times on the userpage
  async function cancel(item) {
    const nameOfTrack = item.split(": ")[0];
    const timeline = item.split(": ")[1].split(" ").slice(1).join(" ");
    const rightDay = item.split(": ")[1].split(" ")[0];

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cancel`, {
      method: "POST",
      body: JSON.stringify({ nameOfTrack, timeline, id, rightDay }),
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
        }),
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
        }),
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
    }
    fetching_user();
  }

  return (
    <div>
      {" "}
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
        flexDirection={"column"}
      >
        <Grid
          sx={{
            backgroundColor: "#ebebeb",
            borderRadius: "10px",
            padding: "10px",
          }}
          item
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
                booked tracks:
              </Typography>
              {userData.booked_tracks}
              <div></div>
            </>
          ) : (
            <div>
              <Typography variant="h4">Loading...</Typography>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
