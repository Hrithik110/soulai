import React, { useState , useEffect} from 'react';
import './App.css';
import { Stack, useMediaQuery,Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Drawer from '@mui/material/Drawer';
import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './ThemeProvider/theme';
import { MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from './ThemeProvider/ThemeContext';
import logo from './assets/BoatAI_Logo.png';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import jsonData from './sampleData.json';


function App() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  
  const storedChats = localStorage.getItem('chatHistory');
  const storedChat = localStorage.getItem('chat');
  const[historyChats, setHistoryChats] = useState(storedChats? JSON.parse(storedChats):[]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const { isDarkMode, toggleTheme,setIsDarkMode } = useTheme();
  const currentTheme = createTheme(isDarkMode ? darkTheme : lightTheme);
  const isMediumScreen = useMediaQuery(currentTheme.breakpoints.up('md'));
  const [chats, setChats] = useState(storedChat?JSON.parse(storedChat):[]);
  const count = isMediumScreen?4:3;

  const [randomItems, setRandomItems] = useState([]);
  const [data, setData] = useState(jsonData);

  useEffect(() => {
    
    getRandomItems(data, count);

  }, []);

  useEffect(()=>{
    
    localStorage.setItem('chatHistory', JSON.stringify(historyChats));
   
  },[historyChats])

  const getResponse = (question)=>{

    let answer = '';
    const res = jsonData.find((item)=>{
      return item.question.toLowerCase() === question.toLowerCase();
    });

    if(!res){
      answer = "As an AI Language Model, I don’t have the details";
    }
    else{
      answer = res.response;
    }

    return answer;


    
  }

  useEffect(()=>{
    getRandomItems(data, count);
  }, [isMediumScreen])
  const getRandomItems = (data, count) => {
    const shuffled = data.sort(() => 0.5 - Math.random()); 
    const selected = shuffled.slice(0, count); 
    setRandomItems(selected);
  };

useEffect(()=>{
  const mode = localStorage.getItem('isDark')==='true'? true:false;
  setIsDarkMode(mode);
},[])

const handleNewChat = ()=>{
  setChats([]);
  navigate('/');
}

useEffect(()=>{
  localStorage.setItem('isDark', isDarkMode)
},[isDarkMode])

  const handleNavigate = () => {
    navigate('/history');
  };
  return (
    <Stack
      spacing={0}
    >
      <CssBaseline />
      <Grid container spacing={0} sx={{height:'100vh'}}>
        <Grid sx={{background:'linear-gradient(180deg, rgba(215, 199, 244, 0.2) 0%, rgba(151, 133, 186, 0.2) 100%)'}} size={{xs:0, md:2.5}} >
        
          <Drawer open={open} onClose={toggleDrawer(false)}>
          <Button onClick={toggleDrawer(false)}><CloseIcon/> Close</Button>
            <Stack
            spacing={4}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            bgcolor={currentTheme.palette.secondary.main}
            padding="1rem"
            >
              <Box
                component="img"
                src={logo}
                alt={'logo'}
                sx={{
                  width: '2.06rem',          
                  height: '2rem',         
                  borderRadius: '100%',   
                  boxShadow: 2,    
                }} 
              />

              <Box sx={{cursor:'pointer'}} onClick={handleNewChat}>
                <Typography variant='h4'>New Chat</Typography>
              </Box>
              <Box>
              <Button><EditNoteIcon sx={{ width: '2.06rem',          
                  height: '2rem',  }}/></Button>  
              </Box>
            </Stack>
            <Button onClick={handleNavigate} sx={{bgcolor:currentTheme.palette.secondary.main, borderRadius:'10px', margin:'1.5rem', padding:'0.5rem'}}> <Typography variant='body1'>Past Conversations</Typography> </Button>
          </Drawer>

          {isMediumScreen && 
            <>
            <Stack
             onClick={handleNewChat}
            spacing={2}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            bgcolor={currentTheme.palette.secondary.main}
            padding="1rem"
            sx={{cursor:'pointer'}}
            >
              <Box
                component="img"
                src={logo}
                alt={'logo'}
                sx={{
                  width: '2.06rem',          
                  height: '2rem',         
                  borderRadius: '100%',   
                  boxShadow: 2,  
                  
                }} 
              />

              <Box>
                <Typography variant='h4'>New Chat</Typography>
              </Box>
              <Box>
              <Button><EditNoteIcon sx={{ width: '2.06rem',          
                  height: '2rem',  }}/></Button>  
              </Box>
            </Stack>
            <Button onClick={handleNavigate} sx={{bgcolor:currentTheme.palette.secondary.main, borderRadius:'10px', margin:'1.5rem', padding:'0.5rem'}}> <Typography variant='body1'>Past Conversations</Typography> </Button>
            </>
           }

        </Grid>

        <Grid  sx={{background:'linear-gradient(180deg, rgba(215, 199, 244, 0.2) 0%, rgba(151, 133, 186, 0.2) 100%)'}}size={{xs:12, md:9.5}} >
        
        <Box
              sx={{
                flexGrow: 1,
                overflowY: 'auto',
                paddingBottom: '2rem',
              }}
            >
          <Outlet context={{ chats, setChats, toggleDrawer,randomItems, setRandomItems, isMediumScreen,getResponse,setHistoryChats,historyChats}}/>
       
          </Box>
        </Grid>
       
      </Grid>

    </Stack>
  );
}

export default App;
