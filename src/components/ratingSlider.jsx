import { useState } from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Box, Button, Grid, Typography } from '@mui/material';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { UserAuth } from '../context/AuthContext';
import { useEffect } from 'react';


function RatingSlide(props) {
  const [rating, setRating] = useState(0);
  const [ratingClicked, setRatingClicked] = useState(false)
  const [review, setReview] = useState("")
  const [alreadyReviewed, setAlredyReviewed] = useState(false)

  const { user } = UserAuth();
  const name = user ? user.displayName : "";
  const [allReview, setAllReview] = useState([])

  useEffect(()=>{
    async function fetchReviews(){
      
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/initialReview`, {
        method: "POST",
        body: JSON.stringify({trackName:props.title } ),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const reviews = await response.json()
     for (let item in reviews){
      if(reviews[item][0] === name){
        setAlredyReviewed(true)
        break
      }
     }
      setAllReview(reviews)
    }
    fetchReviews()
  }, [name])

  async function leaveReview(e){
    e.preventDefault()
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/review`, {
      method: "POST",
      body: JSON.stringify({reviewicon: rating, review, name, trackName:props.title } ),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const reviews = await response.json()
    setAllReview(reviews)
    setReview("")
    setAlredyReviewed(true)
  }

  

  /* const handleMouseOver = (newRating) => {
      if (!ratingClicked){

          setRating(newRating);
      }

  }; */
 
  const allReviewJSX = allReview.map((item)=>(
    <Grid display={"flex"} backgroundColor={"#e1e1e1"} margin={' 15px'} borderRadius={"15px"}>
     
      <Typography variant='h6' margin={"0px 15px"}>{item[0]}</Typography>
      {item[2]==="vds"? <SentimentVeryDissatisfiedIcon sx={{fontSize:'28px'}} />:undefined}
      {item[2]==="ds"? <SentimentDissatisfiedIcon sx={{fontSize:'28px'}}/>:undefined}
      {item[2]==="n"? <SentimentNeutralIcon sx={{fontSize:'28px'}}/>:undefined}
      {item[2]==="s"? <SentimentSatisfiedIcon sx={{fontSize:'28px'}}/>:undefined}
      {item[2]==="vs"? <SentimentSatisfiedAltIcon sx={{fontSize:'28px'}}/>:undefined}
      
     
      <Typography variant='h6' margin={"0px 15px"}>"{item[1]}"</Typography>
      
      </Grid> 
  ))
  
  return (
    <Grid marginLeft={"50px"}
    sx={{
      position: 'relative',
      width: "100%",
      height: 350,
      backgroundColor:'#e1e1e1',
      overflow: 'auto',
      borderRadius:"15px",
      margin:"35px 0px"
      }}
      
    item
    xs={12}
    sm={10}
    md={8}
    lg={5}
    xl={3.5}>
     
    {!alreadyReviewed ? <Grid display={"flex"} margin={"15px"}>
    <form className="formForReview" onSubmit={(e)=>leaveReview(e)}>
    <input value={review} onChange={(e)=>setReview(e.target.value)} placeholder='Write your review here'/>
      <SentimentVeryDissatisfiedIcon  onClick={()=>setRating("vds")} sx={{fontSize:"35px", margin:"5px 10px", color:(rating==="vds"?"black":"#c9c3c3"),"&:hover":{color:"black"}}}/>
      <SentimentDissatisfiedIcon onClick={()=>setRating("ds")}  sx={{fontSize:"35px", margin:"5px 10px",color:(rating==="ds"?"black":"#c9c3c3"),  "&:hover":{color:"black"}}}/>
      <SentimentNeutralIcon onClick={()=>setRating("n")}  sx={{fontSize:"35px", margin:"5px 10px", color:(rating==="n"?"black":"#c9c3c3"), "&:hover":{color:"black"}}}/>
      <SentimentSatisfiedIcon onClick={()=>setRating("s")}  sx={{fontSize:"35px", margin:"5px 10px", color:(rating==="s"?"black":"#c9c3c3"), "&:hover":{color:"black"}}}/>
      <SentimentSatisfiedAltIcon onClick={()=>setRating("vs")} sx={{fontSize:"35px", margin:"5px 10px", color:(rating==="vs"?"black":"#c9c3c3") ,  "&:hover":{color:"black"}}}/>
      <Box display={"flex"} gap={2}>

      <Button variant='contained' type='submit'>Leave review</Button>
      <Typography variant="h6"> Rating 4,5 </Typography>
      </Box>
    
      </form>
    </Grid>: 
    <Box display={"flex"} gap={2}>
    <Button variant='contained'>Edit review? [currently not working]</Button>
    <Typography variant="h6" > Rating 4,5 </Typography>
    </Box>}
    
    {allReviewJSX}

    
            </Grid>
  );
}

export default RatingSlide;
