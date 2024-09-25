import React,{useState} from 'react'
import { useOutletContext } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { Stack, Typography } from '@mui/material';
import logo from '../assets/BoatAI_Logo.png'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import HomeRepairServiceSharp from '@mui/icons-material/HomeRepairServiceSharp';
import { v4 as uuidv4 } from 'uuid';


const QuestionCards = () => {

    const { randomItems, setRandomItems, isMediumScreen, setChats, getResponse } = useOutletContext();
    const [hovered, setHovered] = useState({
        hover:false,
        id:''
    });

    const handleOnClick = (idx)=>{
        const ques = randomItems[idx];
        
        const response = getResponse(ques.question);

        setChats((prev) => ([
            ...prev,
            {
              type: 'Human',
              text: ques.question,
              id: uuidv4(),
              time: new Date()
            },
            {
              type: 'AI',
              text: response,
              id: uuidv4(),
              time: new Date()
            },
          ]));
        
        
    }

    return (
        <Stack spacing={2}>



            <Box
                display="flex"
                justifyContent="space-around"
                flexDirection="column"
                alignItems="center"
            >
                <Typography variant='h2'>How Can I Help You Today?</Typography>
                <Box
                    component="img"
                    src={logo}
                    sx={
                        {
                            width: '4.05rem',
                            height: '4.30rem',
                            borderRadius: '100%',
                            margin: '1rem',
                            boxShadow: '-4px 4px 10px 0px #00000026'

                        }
                    }
                />
            </Box>

            <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
                sx={{ width: '100%' }}
            >

                {randomItems && randomItems.map((item, idx) => (
                    <Box
                        key={item.id || idx} 
                        onClick={()=>handleOnClick(idx)}
                        sx={{
                            flex: '1 1 100%',
                            maxWidth: { xs: '100%', md: '48%' },
                            borderRadius: '8px',
                            padding: '1rem',
                            boxSizing: 'border-box',
                            margin: '0.5rem',
                            bgcolor: "secondary.secondary",
                            cursor:'pointer'

                        }}
                        onMouseEnter={() => setHovered((prev)=>({
                            ...prev,
                            hover:true,
                            id:item.id||idx
                        }))}
                        onMouseLeave={() => setHovered((prev)=>({
                            ...prev,
                            hover:false,
                            id:''
                        }))}



                    >
                        <Typography variant='body1' sx={{ margin: '0.5rem' }}>{item.question}</Typography>
                        <Typography variant='body2' sx={{ margin: '0.5rem' }} >Get immediate AI generated response</Typography>

                        {hovered.hover && hovered.id===(item.id||idx) && <ArrowUpwardIcon sx={{position:'relative', left:'90%'}}/>}
                    </Box>
                ))}
            </Box>
        </Stack>
    )
}

export default QuestionCards
