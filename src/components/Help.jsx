import { Grid, Typography } from "@mui/material";
import Header from "./Header";

export default function Help (){
    return(
        <Grid >
            <Header/>
            <Grid maxWidth={"650px"} borderRadius={"15px"} sx={{backgroundColor:"#ffffff", margin:"15px", padding:"15px"}} >
        <Typography margin={"10px"} variant="h4">Hi, welcome here</Typography>
        <hr/>
        <Typography margin={"10px"}  variant="h6">You can see different sport locations, including free and payed services (we have no partners yet so these are just examples)  and you can book appointments with other people to sport together</Typography>
        <Typography margin={"10px"}  variant="h6">NOTE! Its only a beta/test website so there are fixed timelines for every sport activity and there are limited space on the free locations as well</Typography>
        <hr />
        <Typography margin={"10px"}  variant="h6">You have to create an account to see the detailed page of the sport locations and to be able to book an appointment. You can see and cancel your booked times at the user page</Typography>
        <Typography margin={"10px"}  variant="h6">NOTE! Its only a beta/test website so please dont register with email and password which you use elsewhere (since the website wont send you anything, at this point you can register with an nonexisting email)</Typography>
        <hr />
        <Typography margin={"10px"}  variant="h6">If you are logged in, you can also add new locations to the website, so people can have more opportunities to choose from, you can cancel the sport location which you added in your user page</Typography>
        <Typography margin={"10px"}  variant="h6">NOTE! Since its only a beta/test website, you have to specifiy the max amount of people that can do that sport in a timeline, even if its free</Typography>
        <hr />
        <Typography margin={"10px"}  variant="h6">You can book one week ahead</Typography>
        </Grid></Grid>
    )
}