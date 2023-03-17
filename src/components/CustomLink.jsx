import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Typography, Button, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { Box } from '@mui/system';
import LoginWithFirebase from './loginWithFirebase';
import Header from './Header';


 export default function CustomLink() {

   const {id, hashcode} = useParams()
   const encodedString = encodeURIComponent(`${id}/${hashcode}`);
   const navigate = useNavigate()
    const [linkData, setLinkData] = useState({})
   const {user} = UserAuth()
    console.log(id, hashcode)

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
        if (data.slots.includes("") && !data.slots.includes(user.displayName)){
          data.slots[data.slots.indexOf('')] = user.displayName
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
    <li key={index} className="slots-list-element" >
      {slot}
    </li>
  )): ""
  console.log(liSlotsList)
  return (<Grid>
    <Header title="Custom Group"/>
    <Grid sx={{ 
        display: 'flex',
        flexDirection: 'column',
        
        gap: '16px',
        padding: '16px',
        backgroundColor: 'white',
        borderRadius: '8px',
        margin: "10px"
      }}>

        {!user? <Typography variant="h4" component="h1" gutterBottom sx={{ marginBottom: '16px' }}>
        you were invited to an activity by {linkData.user} if you want to participate you have to log in, then join 
        </Typography> : user.displayName === linkData.user ? 
        <Typography variant="h4" component="h1" gutterBottom sx={{ marginBottom: '16px' }}>
          Hi {user.displayName}, you created this activity
        </Typography> :
        <Typography variant="h4" component="h1" gutterBottom sx={{ marginBottom: '16px' }}>
           Hi {user.displayName}, you were invited to an activity by {linkData.user} if you want to participate press join 
        </Typography>}
        <Typography variant="h6" component="h1" gutterBottom >
          Name of location/activity: {linkData.trackName}
        </Typography>
        <Typography variant="h6" component="h1" gutterBottom >
          Date: {linkData.time}
        </Typography>
        <Typography variant="h6" component="h1" gutterBottom >
          Location: {linkData.location}
        </Typography>
        {user? <Button onClick={join} variant="contained" color="primary" sx={{ width: '100px' }}>
          join
        </Button>: <Box> <Button variant="contained" onClick={()=>navigate(`/login/${encodedString}`)} color="primary" sx={{ width: '100px' }}>
          Log in
        </Button> <Button onClick={()=>navigate(`/signup/${encodedString}`)} variant="contained" color="primary" sx={{ width: '100px' }}>
          sign up
        </Button> </Box>
        }
        <ul sx={{ listStyle: 'none', margin: '0', padding: '0' }}>
          { liSlotsList }
        </ul>
      </Grid>
      </Grid>
  );
}

