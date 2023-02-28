import Header from "./Header";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Next7DaysDropdown from "./nextSevenDay";
import Footer from "./FooterNOTUSED";
import Paper from "@mui/material/Paper";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { Fab, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { UserAuth } from "../context/AuthContext";
import SimpleMap from "./GoogleMapNOTUSED";
import AddIcon from "@mui/icons-material/Add";

export default function CertainTrack(props) {
  //declaring states and consts
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

  //declaring the function, which will be activated when someone join to a timeline
  const handleClick = async (id) => {
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
      try {
        setH3s(trackData.booked[rightDay]);
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
  try {
    for (let track in props.allTrack) {
      if (props.allTrack[track].name == id) {
        desc = props.allTrack[track].description;
        nameOfTrack = props.allTrack[track].name;
        img_number = props.allTrack[track].img_urls.length;
        slot_number = props.allTrack[track].slot_number;
        trackNumber = track;
        break;
      }
    }
    const new_slots = Array(parseInt(slot_number)).fill("");

    useEffect(() => {
      try {
        if (
          //if its a new day which wasnt declared before we will initialize it here otherwise just retrive the specified date data
          typeof props.allTrack[trackNumber].booked[rightDay] === "undefined"
        ) {
          fetch(`${import.meta.env.VITE_BACKEND_URL}/newDay`, {
            method: "POST",
            body: JSON.stringify({
              id: nameOfTrack,
              rightDay: rightDay,
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
            .then((response) => response.json)
            .then((data) => setH3s(data.booked[rightDay]));
        } else {
          setH3s(props.allTrack[trackNumber].booked[rightDay]);
        }
      } catch (error) {
        setErrorHandler("x");
        console.log(error);
      }
    }, [rightDay, props.allTrack[trackNumber].booked[rightDay]]);
  } catch (error) {
    console.log(error);
  }

  //here we make the image slider which can be activated by clicking
  let currentSlide = 0;
  const slides = document.querySelectorAll(".images");

  function changeSlide() {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].style.display = "block";
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
          >
            <Grid
              minWidth={"300px"}
              maxWidth={"400px"}
              xs={12}
              sm={10}
              md={8}
              lg={5}
              xl={3}
              className="slider"
            >
              {Array.from({ length: img_number }, (_, i) => (
                <img
                  key={i}
                  onClick={changeSlide}
                  src={`${import.meta.env.VITE_BACKEND_URL}/img?user_id=${id}&number=${i}`}
                  className="images slide"
                  alt="image"
                />
              ))}
            </Grid>{" "}
            <Grid
              flexDirection={"column"}
              display={"flex"}
              className="desc-and-rating"
              minWidth={"300px"}
              maxWidth={"350px"}
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
                    thewebpage@ofthissite.com
                  </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Next7DaysDropdown getUpData={setRightDay} />
                  <Typography
                    variant="h6"
                    sx={{
                      margin: "10px",
                      whiteSpace: "pre-line",
                      overflowWrap: "anywhere",
                    }}
                  >
                    Rating 4,5
                  </Typography>
                  
                </Box>
         
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2} className=" contanier booking-timelines">
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
                alignItems={"center"}
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
                        h3.color === "red" ? () => {} : () => handleClick(h3.id)
                      }
                    >
                      <AddIcon />
                    </Fab>
                  </Box>
                  <ExpandMore
                    expand={expanded == h3.id ? true : false}
                    onClick={() => handleExpandClick(h3.id)}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                  <Collapse
                    in={expanded == h3.id ? true : false}
                    timeout="auto"
                  >
                    {h3.slots.map((slot) => (
                      <li className="slots-list-element">{slot}</li>
                    ))}
                  </Collapse>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
}
