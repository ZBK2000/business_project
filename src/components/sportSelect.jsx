  {/*
import React, { useState } from 'react';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputIcon from '@mui/icons-material/Input';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
;

const sports = [
    { name: 'Soccer', icon: <SportsSoccerIcon /> },
    { name: 'Basketball', icon: <SportsBasketballIcon /> },
    { name: 'Tennis', icon: <SportsTennisIcon /> },
    { name: 'Cricket', icon: <SportsCricketIcon /> },
    { name: 'Esports', icon: <SportsEsportsIcon /> },
    { name: 'Handball', icon: <SportsHandballIcon /> },
    { name: 'Volleyball', icon: <SportsVolleyballIcon /> },
    { name: 'Cycling', icon: <DirectionsBikeIcon /> },

  ];

const OtherSportMenuItem = ({ onClick }) => {
    return (
      <MenuItem onClick={onClick}>
        <AddCircleOutlineIcon fontSize="small" />
        Other
      </MenuItem>
    );
  };
  
  const SportsSelect = (props) => {
    
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    props.sportType(value)
    const handleChange = (event) => {
      setValue(event.target.value);
    };
  
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
      
    };
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOtherSportClick = () => {
      setValue('Other');
      handleClose();
    };
  
    const filteredSports = sports.filter((sport) =>
      sport.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <Select
       
        value={value}
        onChange={handleChange}
        onOpen={handleOpen}
        onClose={handleClose}
        open={open}
        displayEmpty
        renderValue={(selected) => (selected ? selected : 'Select a sport')}
        inputProps={{
          'aria-label': 'Select a sport',
        }}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        }}
      >
        <MenuItem disabled>
          <InputIcon fontSize="small"  />
          Search
        </MenuItem>
        <MenuItem>
          <input
            type="text"
            placeholder="Type to search"
            onChange={handleSearch}
          />
        </MenuItem>
        {filteredSports.map((sport) => (
          <MenuItem key={sport.name} value={sport.name}>
            {sport.icon}
            {sport.name}
          </MenuItem>
        ))}
        <OtherSportMenuItem onClick={handleOtherSportClick} />
      </Select>
    );
  };
  
  export default SportsSelect;
 */}

 import * as React from 'react';
 import TextField from '@mui/material/TextField';
 import Autocomplete from '@mui/material/Autocomplete';
 
 const sportsList = [
  { name: 'Soccer' },
  { name: 'Basketball' },
  { name: 'Baseball' },
  { name: 'Tennis' },
  { name: 'Volleyball' },
  { name: 'Golf' },
  { name: 'Swimming' },
  { name: 'Cycling' },
  { name: 'Boxing' },
  { name: 'MMA' },
  { name: 'Hockey' },
  { name: 'Football' },
  { name: 'Rugby' },
  { name: 'Cricket' },
  { name: 'Track and Field' },
  { name: 'Gymnastics' },
  { name: 'Figure Skating' },
  { name: 'Skiing' },
  { name: 'Snowboarding' },
  { name: 'Ice Skating' },
  { name: 'Table Tennis' },
  { name: 'Badminton' },
  { name: 'Frisbee' },
  { name: 'Hiking' },
  { name: 'Camping' },
  { name: 'Rock Climbing' },
  { name: 'Yoga' },
  { name: 'Pilates' },
  { name: 'Zumba' },
  { name: 'Dancing' },
  { name: 'Martial Arts' },
  { name: 'Gym' },
  { name: 'Jogging' },
  { name: 'Running' },
  { name: 'Walking' },
  { name: 'Swimming Lessons' },
  { name: 'Cycling Tours' },
  { name: 'Kayaking' },
  { name: 'Canoeing' },
  { name: 'Sailing' },
  { name: 'Surfing' },
  { name: 'Paddleboarding' },
  { name: 'Scuba Diving' },
  { name: 'Snorkeling' },
  { name: 'Fishing' },
  { name: 'Photography' },
  { name: 'Painting' },
  { name: 'Drawing' },
  { name: 'Cooking' },
  { name: 'Board Games' },
  { name: 'Card Games' },
  { name: 'Chess' },
  { name: 'Trivia' },
  { name: 'Karaoke' },
  { name: 'Concerts' },
  { name: 'Movies' },
  { name: 'Theater' },
  { name: 'Museums' },
  { name: 'Art Galleries' },
  { name: 'Wine Tasting' },
  { name: 'Beer Tasting' },
  { name: 'Coffee Shops' },
  { name: 'Book Clubs' },
  { name: 'Language Exchange' },
  { name: 'Volunteering' },
  { name: 'Charity Events' },
  { name: 'Networking' },
];

 
 export default function SportsSelect(props) {
  const handleSelectedValueChange = (event, newValue) => {
    props.sportType(newValue.name)}

   return (
     <Autocomplete
       disablePortal
       id="combo-box-demo"
       options={sportsList}
       sx={{ width: 300 }}
       getOptionLabel={(option) => option.name} // use the name property of each object
       onChange={handleSelectedValueChange} 
       renderInput={(params) => <TextField {...params} label="Sport" />}
     />
   );
 }
 