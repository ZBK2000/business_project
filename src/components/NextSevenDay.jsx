import { Box, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

export default  function Next7DaysDropdown(props) {
  //this function creates an array with the next seven days in it
    function getNext7Days() {
        const next7Days = [];
        const today = new Date();
        
        for (let i = 0; i < 7; i++) {
          const nextDay = new Date(today.getTime());
          nextDay.setDate(today.getDate() + i);
          const year = nextDay.getFullYear();
          const month = nextDay.getMonth() + 1;
          const day = nextDay.getDate();
          next7Days.push(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
        }
      
        return next7Days;
      } 
      const next7Days = getNext7Days();
  const [selectedDate, setSelectedDate] = useState(0);
  

  //this is the function for the select component
 const handleChange = (e) => {

    setSelectedDate(e.target.value);

    
  };
  useEffect(()=>{props.getUpData(next7Days[selectedDate])}, [selectedDate])
    
  return (

        <Box sx={{ minWidth: 120 }}>
      
        
        <Select sx={{border:"none"}}
           labelId="demo-simple-select-label" id="demo-simple-select" label="Date" value={selectedDate} onChange={handleChange}>
        {next7Days.map((date, index) => (
          <MenuItem key={date} value={index}>
            {date}
          </MenuItem>
        ))}
      </Select>
     
    </Box> 
  );
}