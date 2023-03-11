import { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

import { TextField, Typography } from "@mui/material";
import { UserAuth } from "../context/AuthContext";

export default function register(props) {
  //declaring states and consts
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [slots, setSlots] = useState(4);
  const [img, setImg] = useState("");
  const { user } = UserAuth();
  const userName = user ? user.displayName : "";

  const avalaibleTimes_initial = [
    { id: 1, text: "8-10 ", color: "black", slots: ["", "", "", ""] },
    { id: 2, text: "10-12 ", color: "black", slots: ["", "", "", ""] },
    { id: 3, text: "12-14 ", color: "black", slots: ["", "", "", ""] },
    { id: 4, text: "14-16 ", color: "black", slots: ["", "", "", ""] },
    { id: 5, text: "16-18 ", color: "black", slots: ["", "", "", ""] },
    { id: 6, text: "18-20 ", color: "black", slots: ["", "", "", ""] },
    { id: 7, text: "20-22 ", color: "black", slots: ["", "", "", ""] },
  ];

  //we declaring the next seven days function here too(not only in that component) so initially we can work from this
  function getNext7Days() {
    const next7Days = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(today.getTime());
      nextDay.setDate(today.getDate() + i);
      const year = nextDay.getFullYear();
      const month = nextDay.getMonth() + 1;
      const day = nextDay.getDate();
      next7Days.push(
        `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`
      );
    }

    return next7Days;
  }

  //this is the submit function for registering a track
  const registerTrack = async (event) => {
    event.preventDefault();
    let latAndLong
    const response_loc = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${import.meta.env.VITE_GOOGLE_MAPS_API}`);
      const data_loc = await response_loc.json();
      
  
      if (data_loc.results.length > 0) {
        const location = data_loc.results[0].geometry.location;
        latAndLong = [location.lat, location.lng ];
      }

    const slot_places = Array(parseInt(slots)).fill("");

    const avalaibleTimes = avalaibleTimes_initial.map((item) => {
      item.slots = [...slot_places];
      return item;
    });

    const avalaibleTimesFor7Days = {};
    const next7Days = getNext7Days();
    next7Days.forEach((key) => {
      avalaibleTimesFor7Days[key] = avalaibleTimes;
    });

    

    let formData = new FormData();
    for (let i = 0; i < img.length; i++) {
      formData.append("img_urls", img[i]);
    }
    const data = {
      track: {
        name,
        price,
        location,
        description,
        slot_number: slots,
        booked: avalaibleTimesFor7Days /* next7Days, */,
        latAndLong
      },
      user: userName,
    };
    // we post the data into mongo database
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    formData.append("track", name);
    //we make another request to store the name of the images in the tracks database ( its only after the database for this track was created)
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/img`, {
      method: "POST",
      body: formData,
    });
    const allTrack = await res.json();
    
    
      
  
    if (allTrack) {
      props.getUpData(allTrack);
      props.getUpData2(slots);
      navigate("/");
    }

  };

  return (
    <div>
      <Header
        title="new track registration"
        success={props.getDownData}
        name={props.getDownData2}
      />

      <form onSubmit={registerTrack}>
        <label htmlFor="name">
          <Typography>Name:</Typography>
        </label>
        <input
          type="text"
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="price">
          <Typography>Price:</Typography>
        </label>
        <input
          type="number"
          id="price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <label htmlFor="location">
          <Typography>Location:</Typography>
        </label>
        <input
          type="text"
          id="location"
          onChange={(e) => setLocation(e.target.value)}
        />
        <label htmlFor="slots">
          <Typography>Maximum slots:</Typography>
        </label>
        <input
          type="number"
          step="1"
          id="slots"
          onChange={(e) => setSlots(e.target.value)}
        />
        <label htmlFor="img">
          <Typography>Images:</Typography>
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
        <button>
          <Typography>Submit</Typography>
        </button>
      </form>
    </div>
  );
}
