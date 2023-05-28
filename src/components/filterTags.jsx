import React, { useState, useEffect } from 'react';
import {

    Fab,
    Grid
   
  } from "@mui/material";


const FilterTags = (props) => {
    console.log(props)
   let filterTags = props.filterTags.slice(0,7)
  if(props.filterTags[8]) filterTags.push("Unlimited")
  if(props.filterTags[9]) filterTags.push("Free")
    if (!props.filterTags[10]) {
       filterTags = filterTags.slice(2);
    } else {
      filterTags[1] = `${props.filterTags[1][0]}-${props.filterTags[1][1]} Ft`;
      
    }

    if (!props.filterTags[7]) {
         filterTags = filterTags.slice(1);
      } else {
         filterTags[0] = `${props.filterTags[0][0]}-${props.filterTags[0][1]} People`;
         
      }
      console.log(filterTags)
    return (
        <Grid width={"100%"} padding={'10px'}  display={'flex'} justifyContent={"flex-start"} gap={2}  className='element'
        sx={{   
        
          marginTop:"-15px",
          cursor:"pointer",
          top: 0,
          left: 0,
         
          height: '100%',
          
        
         overflowX: 'auto',
        
        }}>
        {props.filterTags
          ? filterTags.map((item, index) => {
              if (item) {
                return <Fab  variant='extended' key={index} sx={{ color: "black", height:'100%', width:"100%",minWidth:"100px", whiteSpace:"nowrap" }}>{item}</Fab>;
              }
            })
          : ""}
      </Grid>
    );
  };
  

export default FilterTags;
