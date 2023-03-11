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
import { Grid } from '@mui/material';

export default function Sports (){

    return(
        <Grid margin={"15px"} padding={'10px'} gap={"20px"} display={'flex'} justifyContent={"center"} 
        sx={{  position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.3)',
          borderRadius: 'inherit',
        },borderRadius:"10px", overflowX: 'scroll',
        '-webkit-overflow-scrolling': 'touch', 
        '&::-webkit-scrollbar': { display: 'none'} 
        }}>
            <SportsBasketballIcon sx={{fontSize:'35px', margin:"0 10px", color:"#c9c3c3", "&:hover":{color:"black"}}}/>
            <SportsFootballIcon sx={{fontSize:'35px', margin:"0 10px", color:"#c9c3c3", "&:hover":{color:"black"}}}/>
            <SportsSoccerIcon sx={{fontSize:'35px', margin:"0 10px", color:"#c9c3c3", "&:hover":{color:"black"}}}/>
            <SportsTennisIcon sx={{fontSize:'35px', margin:"0 10px", color:"#c9c3c3", "&:hover":{color:"black"}}}/>
            <SportsVolleyballIcon sx={{fontSize:'35px', margin:"0 10px", color:"#c9c3c3", "&:hover":{color:"black"}}}/>
            <HikingIcon sx={{fontSize:'35px', margin:"0 10px", color:"#c9c3c3", "&:hover":{color:"black"}}}/>
            <PoolIcon sx={{fontSize:'35px', margin:"0 10px", color:"#c9c3c3", "&:hover":{color:"black"}}}/>
            <KayakingIcon sx={{fontSize:'35px', margin:"0 10px", color:"#c9c3c3", "&:hover":{color:"black"}}}/>
            <FitnessCenterIcon sx={{fontSize:'35px', margin:"0 10px", color:"#c9c3c3", "&:hover":{color:"black"}}}/>
            <DirectionsBikeIcon sx={{fontSize:'35px', margin:"0 10px", color:"#c9c3c3", "&:hover":{color:"black"}}}/>
        </Grid>
    )
}