import React, { useEffect, useState, useRef } from 'react'
import { Stack, Box, useMediaQuery, Typography, Button, TextField } from '@mui/material';
import { AppBar, Toolbar } from '@mui/material';
import { useTheme } from '../ThemeProvider/ThemeContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { lightTheme, darkTheme } from '../ThemeProvider/theme';
import { MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useOutletContext } from "react-router-dom";
import QuestionCards from "../components/QuestionCards";
import { v4 as uuidv4 } from 'uuid';
import ChattingCards from '../components/ChattingCards';
import FeedBackModel from '../components/FeedBackModel';

const Home = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const currentTheme = createTheme(isDarkMode ? darkTheme : lightTheme);
  const isMediumScreen = useMediaQuery(currentTheme.breakpoints.up('md'));
  const { chats, setChats, toggleDrawer, getResponse,setHistoryChats } = useOutletContext();

  const listRef = useRef(null);
  const [scroll, setScroll] = useState(false);
  
  const [inputVal, setInputVal] = useState('');

  const handleInputChange = (e) => {

    setInputVal(e.target.value);

    
  }

  const handleOnClick = () => {


    const response = getResponse(inputVal);

    setChats((prev) => ([
      ...prev,
      {
        type: 'Human',
        text: inputVal,
        id: uuidv4(),
        time: new Date(),
      },
      {
        type: 'AI',
        text: response,
        id: uuidv4(),
        time: new Date(),
      },
    
    ]));

    
    setScroll(prev => !prev);

    setInputVal('');

    
  }

  const handleHistoryChats = ()=>{
    const newChatHistoryEntry = {
     
      messages: chats, 
      timestamp: new Date().toISOString(),
  };
  setHistoryChats((prev) => [newChatHistoryEntry, ...prev]);
    setChats([]);
  }

  useEffect(()=>{
    listRef.current?.lastElementChild?.scrollIntoView();
  },[scroll])


  return (
    <div>
      <Stack
        direction="column"
        justifyContent="space-between"
        spacing={2}
        sx={{ height: '100vh',padding: '1rem' }} position='static'>

        <AppBar sx={{ background: 'inherit', border: 'none' }} position='static'>

          <Stack
            direction="row"
            margin='1rem'
            justifyContent="space-between"
            spacing={3}
            sx={{ border: 'none', alignItems: 'center' }}
          >
            {!isMediumScreen && (
              <MenuIcon sx={{ color: currentTheme.palette.primary.main, marginTop: '0.5rem', fontWeight: '700' }} onClick={toggleDrawer(true)} />
            )}
            <Typography sx={{margin:'0.5rem'}} variant='h1'>Boat AI</Typography>

            {isDarkMode ? <Button onClick={toggleTheme}><DarkModeIcon /></Button> : <Button onClick={toggleTheme}><LightModeIcon /></Button>}
          </Stack>


        </AppBar>


        {!chats.length && <Box>
          <QuestionCards />
        </Box>}

        {
          chats.length > 0 && <Stack sx={{marginTop: '2rem'}} spacing={3}>
            {
              chats.map((ch)=>(

                <ChattingCards updateChat={setChats} key={ch.id} chat={ch}/>
              ))
            }
           
          </Stack>
        }


<Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        width: '100%',
        margin: '1rem 0'
      }}
    >
      <TextField 
        sx={{ 
          flexGrow: 1, 
          marginRight: '0.5rem' 
        }} 
        onChange={handleInputChange} 
        id='question-input' 
        value={inputVal} 
        label='Message to Bot' 
        variant="outlined" 
      />
      
      <Button 
        onClick={handleOnClick} 
        disabled={!inputVal} 
        sx={{ 
          bgcolor: 'secondary.main', 
          marginLeft: '0.2rem', 
          width: '4rem' 
        }}
      >
        <Typography variant='body1'>Ask</Typography>
      </Button>
      
      <Button 
      onClick={handleHistoryChats}
        sx={{ 
          bgcolor: 'secondary.main', 
          marginLeft: '0.2rem', 
          width: '4rem' 
        }}
      >
        <Typography variant='body1'>Save</Typography>
      </Button>
    </Box>


      </Stack>

     
    </div>

  )
}

export default Home
