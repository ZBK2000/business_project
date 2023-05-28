import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function StaticDatePickerCollapsible(props) {
  const handleDateChange = (date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    props.getUpData(formattedDate);
  };

  return (
    <LocalizationProvider  dateAdapter={AdapterDayjs}>
      <DatePicker
      sx={{border:props.missing&&"1px solid red", zIndex:9999}}
      onChange={handleDateChange}
       PopperProps={{
        style: { zIndex: 9999 } // Set a higher z-index for the pop-up calendar
      }}
         // Use a regular input element for the date picker
      />
    </LocalizationProvider>
  );
}
