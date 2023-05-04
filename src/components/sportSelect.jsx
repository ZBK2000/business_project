
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
  