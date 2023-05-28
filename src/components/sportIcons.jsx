import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import HikingIcon from '@mui/icons-material/Hiking';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PoolIcon from '@mui/icons-material/Pool';
import KayakingIcon from '@mui/icons-material/Kayaking';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import SportsHockeyIcon from '@mui/icons-material/SportsHockey';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SchoolIcon from '@mui/icons-material/School';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { Box, Grid, Typography } from '@mui/material';
import { useState } from 'react';

export default function Sports (props){
  const sportsIcons = [
    {name: 'Soccer', icon: <SportsSoccerIcon sx={{fontSize:'35px', margin:"0 10px"}}/>},
    {name: 'Tennis', icon: <SportsTennisIcon sx={{fontSize:'35px', margin:"0 10px"}}/>},
    {name: 'Volleyball', icon: <SportsVolleyballIcon sx={{fontSize:'35px', margin:"0 10px"}}/>},
    {name: 'Hiking', icon: <HikingIcon sx={{fontSize:'35px', margin:"0 10px"}}/>},
    {name: 'Cycling', icon: <DirectionsBikeIcon sx={{fontSize:'35px', margin:"0 10px"}}/>},
    {name: 'Fitness', icon: <FitnessCenterIcon sx={{fontSize:'35px', margin:"0 10px"}}/>},
    {name: 'Swimming', icon: <PoolIcon sx={{fontSize:'35px', margin:"0 10px"}}/>},
    {name: 'Kayaking', icon: <KayakingIcon sx={{fontSize:'35px', margin:"0 10px"}}/>},
    {name: 'Basketball', icon: <SportsBasketballIcon sx={{fontSize:'35px', margin:"0 10px"}}/>},
    {name: 'Football', icon: <SportsFootballIcon sx={{fontSize:'35px', margin:"0 10px"}}/>},
    {name: 'Handball', icon: <SportsHandballIcon sx={{fontSize:'35px', margin:"0 10px"}}/>},
    {name: 'Judo', icon: <SportsMartialArtsIcon sx={{fontSize:'35px', margin:"0 10px"}}/>},
    {name: 'Hockey', icon: <SportsHockeyIcon sx={{fontSize:'35px', margin:"0 10px"}}/>},
    {name: 'Esports', icon: <SportsEsportsIcon sx={{fontSize:'35px', margin:"0 10px"}}/>},
    {name: 'Baseball', icon: <SportsBaseballIcon sx={{fontSize:'35px', margin:"0 10px"}}/>},
    {name: 'Watching', icon: <RemoveRedEyeIcon sx={{fontSize:'35px', margin:"0 10px"}}/>},
    {name: 'Studying', icon: <SchoolIcon sx={{fontSize:'35px', margin:"0 10px"}}/>},
    {name: 'Running', icon: <DirectionsRunIcon sx={{fontSize:'35px', margin:"0 10px"}}/>}
  ];
  
  function settingSport(sport){
    if (sport == props.sport){
      props.setCurrentSport("")
    } else{

      props.setCurrentSport(sport)
    }
  }

    return(
     
        <Grid width={"100%"} padding={'10px'}  display={'flex'} justifyContent={"flex-start"} gap={3.5}  className='element'
        sx={{   
        
          
          cursor:"pointer",
          top: 0,
          left: 0,
         
          height: '100%',
          boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.3)',
        
         overflowX: 'auto',
        
        }}>
           {sportsIcons.map((item, index)=>{
        return(
          <Box key={index} onClick={()=>settingSport(item.name)} display={"flex"} flexDirection={"column"} alignItems={"center"} sx={{ color:item.name==props.sport?"black":"#c9c3c3", "&:hover":{color:"black"}}}>
            {item.icon}
            <Typography variant='h8'>{item.name}</Typography>
        </Box>
        )
      })}
         
        </Grid>
    )
}