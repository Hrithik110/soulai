import React, { useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";
import { Stack, Box, Typography, FormControl, InputLabel, Select, MenuItem,useMediaQuery ,Button} from '@mui/material';
import { format, startOfDay, add, isEqual } from 'date-fns';
import ChattingCards from '../components/ChattingCards';
import { lightTheme, darkTheme } from '../ThemeProvider/theme';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '../ThemeProvider/ThemeContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const filterList = (list, rating) => {
  if (rating === 0) {
    return list;
  }
  return list.filter(ele => {
    return ele.messages.some(ch => ch.rating === rating);
  });
};

const History = () => {
  const { historyChats } = useOutletContext();
  const [rating, setRating] = useState(0);
  const [filteredChats, setFilteredChats] = useState([]);
  const { isDarkMode, toggleTheme } = useTheme();
  const currentTheme = createTheme(isDarkMode ? darkTheme : lightTheme);
  const isMediumScreen = useMediaQuery(currentTheme.breakpoints.up('md'));
  const {  toggleDrawer} = useOutletContext();


  const items = ['All Ratings', '1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'];

  const handleChange = (event) => {
    setRating(event.target.value);
  };

  const customDateFormat = (day) => {
    const today = startOfDay(new Date());
    const dayDate = startOfDay(new Date(day));

    if (isEqual(today, dayDate)) {
      return "Today's Chat";
    } else if (isEqual(today, add(dayDate, { days: 1 }))) {
      return "Tomorrow's Chat";
    } else {
      return format(dayDate, 'E, d LLL');
    }
  };

  useEffect(() => {
    const fChats = filterList(historyChats, rating);
    setFilteredChats(fChats);
  }, [rating, historyChats]);

  return (
    <Stack direction='column' justifyContent='space-between'>

      <Stack
        direction="row"

        justifyContent="space-between"
        spacing={3}
        sx={{ border: 'none', alignItems: 'center' }}
      >
        {!isMediumScreen && (
          <MenuIcon sx={{ color: currentTheme.palette.primary.main, marginTop: '0.5rem', fontWeight: '700' }} onClick={toggleDrawer(true)} />
        )}
        <Typography variant='h1'>Boat AI</Typography>

        {isDarkMode ? <Button onClick={toggleTheme}><DarkModeIcon /></Button> : <Button onClick={toggleTheme}><LightModeIcon /></Button>}
      </Stack>

      <Box sx={{ display:'flex', flexDirection:'column',justifyContent:'center', textAlign:'center', minWidth: 120, margin: '3rem'}}>


      <Typography sx={{margin:'2rem'}} variant='h2'>Conversation History</Typography>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Ratings</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={rating}
            label="All Ratings"
            onChange={handleChange}
          >
            {items.map((ele, idx) => (
              <MenuItem key={idx} value={idx}>{ele}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Stack sx={{ margin: '2rem' }} spacing={0}>
        {filteredChats.length > 0 && filteredChats.map((ch, idx) => {
          const formattedDate = customDateFormat(ch.timestamp);
          const isFirstChatOfDate = idx === 0 || formattedDate !== customDateFormat(filteredChats[idx - 1].timestamp);

          return (
            <React.Fragment key={ch.id || idx}>
              {isFirstChatOfDate && (
                <Typography variant='h4'>{formattedDate}</Typography>
              )}
              <Stack spacing={0} sx={{ background: 'linear-gradient(90deg, #BFACE2 0%, #D7C7F4 100%)', borderRadius: '20px', margin: '1rem' }}>
                {ch.messages.map((ele, messageIdx) => (
                  <Box key={ele.id || messageIdx}>
                    <ChattingCards isHistory={true} chat={ele} />
                  </Box>
                ))}
              </Stack>
            </React.Fragment>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default History;
