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


function Conversation(props) {
  
  const [review, setReview] = useState("")

  const { user } = UserAuth();
  const name = user ? user.displayName : "";
  const [allReview, setAllReview] = useState("")
 console.log(props._id)
  useEffect(()=>{
    async function fetchReviews(){
      console.log(props._id, "lll")
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/initialReview`, {
        method: "POST",
        body: JSON.stringify({linkId:props._id } ),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const reviews = await response.json()
      console.log(reviews, "llééjphjpoj")
      if (reviews.length ==0){
        setAllReview((<Typography></Typography>)
          )
      } else{
        setAllReview(reviews.map((item)=>
        (
          <Grid display={"flex"} backgroundColor={"#e1e1e1"} margin={' 15px'} borderRadius={"15px"}>
           
            <Typography variant='h6' margin={"0px 15px"}>{item[0]} -</Typography>
            
           
            <Typography variant='h6' >{item[1]}</Typography>
            
            </Grid> )
      ))
      }
      console.log("haha")
    }
    fetchReviews()
  }, [props])

  async function leaveReview(e){
    e.preventDefault()
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/review`, {
      method: "POST",
      body: JSON.stringify({review, name, linkId: props._id } ),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const reviews = await response.json()
    console.log(reviews)
    setAllReview(reviews.map((item)=>(
          
      <Grid display={"flex"} backgroundColor={"#e1e1e1"} margin={' 15px'} borderRadius={"15px"}>
       
        <Typography variant='h6' margin={"0px 15px"}>{item[0]} -</Typography>
        
       
        <Typography variant='h6' >{item[1]}</Typography>
        
        </Grid> )
  ))
    setReview("")
    
  }

  

  /* const handleMouseOver = (newRating) => {
      if (!ratingClicked){

          setRating(newRating);
      }

  }; */
 
  console.log(allReview, "hu")
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
     
    <Grid display={"flex"} margin={"15px"}>
    <form className="formForReview" onSubmit={(e)=>leaveReview(e)}>
    <input value={review} onChange={(e)=>setReview(e.target.value)} placeholder='Ask a question'/>
      
      
    
      </form>
    </Grid>

    
    {allReview}

    
            </Grid>
  );
}

export default Conversation;
