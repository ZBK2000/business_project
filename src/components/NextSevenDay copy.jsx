import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';
import { Box, Collapse, IconButton, Stack, Typography } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const DatePickerWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex:9999,
  border:"2px solid #dbdbdb",
  
}));

export default function StaticDatePickerCollapsible(props) {
  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  const [open, setOpen] = React.useState(false);
  const [timeAsString, setTimeAsString] = useState("")

  const handleDateChange = (date) => {
    setSelectedDate(date);
    props.getUpData(date.format('YYYY-MM-DD'))
    console.log(date.format('YYYY-MM-DD'))
  };

  const handleCollapse = () => {
    setOpen(!open);
  };

  return (
    <Stack direction="column" alignItems="flex-start">
      <Box display={"flex"} alignItems={"center"}>
      <IconButton onClick={handleCollapse}>
        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      </IconButton>
      <Typography variant='h5'>{selectedDate.format('ddd, MMM D')}</Typography>
      </Box>
      <Box position="relative">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Collapse in={open}>
            <DatePickerWrapper>
              <StaticDatePicker
                
                value={selectedDate}
                onChange={handleDateChange}
              />
              
            </DatePickerWrapper>
          </Collapse>
        </LocalizationProvider>
      </Box>
    </Stack>
  );
}
