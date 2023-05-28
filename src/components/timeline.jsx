import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';


export default function TimeLinePicker(props) {
    const handleDateChange = (date) => {
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        props.getUpData(formattedDate);
      };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileTimePicker defaultValue={dayjs('2022-04-17T15:30')} onChange={handleDateChange}/>
    </LocalizationProvider>
  );
}