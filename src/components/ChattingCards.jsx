import React, { useEffect, useState } from 'react'
import { useOutletContext } from "react-router-dom";
import { Avatar, Rating, Card, CardContent, Stack, Box, Typography } from '@mui/material';
import profileImage from '../assets/You.png';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { format } from 'date-fns';
import logo from '../assets/BoatAI_Logo.png';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import FeedBackModel from './FeedBackModel';
const ChattingCards = ({ chat, updateChat,isHistory=false }) => {

    const [isLoading, setIsLoading] = useState(true);
    const[feedBack,setFeedback] = useState('');
    
    const isHuman = chat.type === 'Human' ? true : false;
    const[feedbackModel, setFeedBackModel] = useState(false);
    const [isRatings, setIsRatings] = useState(false);
    const [rating, setRating] = useState(0);
    const [starRatings, setStartRatings] = useState(false);
    const handleMouseEnter = () => {
       if(!isHistory){
        setIsRatings(true);
       } 
        
    };

    const handleMouseLeave = () => {
        if(!isHistory){
            setIsRatings(false);
        }
     
    };

    const handleRatingChange = (event, newValue) => {
        if(newValue>0){
            setRating(newValue);
        }
        
    };
    const handleClickOnLike = ()=>{

        setStartRatings((prev) => (!prev));
    }

    const handleClickOnUnlike = ()=>{
        setFeedBackModel(true);
    }
    useEffect(() => {

        setTimeout(() => {
            setIsLoading(false);
        }, 1000)
    }, [])

    useEffect(()=>{

        if(isRatings){
            updateChat(prev=>(
                prev.map(item=>{
                    if(item.id==chat.id){
                        return {...item, rating: rating||0}
                    }
                    else{
                        return{...item}
                    }
                })
            ))
        }
    },[rating])


    useEffect(()=>{
        if(feedBack){
            updateChat(prev=>(
                prev.map(item=>{
                    if(item.id==chat.id){
                        return {...item, feedback: feedBack}

                    }
                    else{
                        return {...item}
                    }
                })
            ))
        }
    },[feedBack])
    return (

        <Stack spacing={2}>
            {isHuman && <Card sx={{ borderRadius: isHistory?'':'20px', background:  isHistory ? 'linear-gradient(90deg, #BFACE2 0%, #D7C7F4 100%)':'#D7C7F421' }} spacing={2}>
                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>

                    <Avatar
                        alt={""}
                        src={profileImage}
                        sx={{ width: 65, height: 69, margin: '0.5rem' }}
                    />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        margin: '1rem'
                    }}
                    >
                        <Typography variant='h4'>You!</Typography>
                        <Typography variant='body2'>{chat.text}</Typography>
                        <Typography sx={{ marginTop: '1rem' }} variant='p'>{format(chat.time, 'hh:mm a')}</Typography>
                    </Box>


                </CardContent>
            </Card>
            }
            {!isHuman && <>{!isHistory && isLoading && (
                <Box sx={{ position: 'relative', right: '20px', top: '20px' }}>
                    <AutorenewIcon className="loading-icon" sx={{ animation: 'spin 1s infinite linear' }} />

                </Box>
            )}

                {
                    !isLoading && (
                        <>
                            <Card sx={{
                                borderRadius: isHistory?'':'20px', background: isHistory ? 'linear-gradient(90deg, #BFACE2 0%, #D7C7F4 100%)':'#D7C7F421' , transition: '0.3s',

                            }}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                spacing={2}>
                                <CardContent sx={{ display: 'flex', alignItems: 'flex-start' }}>

                                    <Avatar
                                        alt={""}
                                        src={logo}
                                        sx={{ width: 65, height: 69, margin: '0.5rem' }}
                                    />
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-evenly',
                                        margin: '1rem'
                                    }}
                                    >
                                        <Typography variant='h4'>SoulAI!</Typography>
                                        <Typography variant='body2'>{chat.text}</Typography>
                                        <Typography sx={{ marginTop: '1rem' }} variant='p'>{format(chat.time, 'hh:mm a')}</Typography>

                                        {isRatings && <Box>
                                            < ThumbUpOffAltIcon sx={{
                                                '&:hover': {
                                                    color: 'primary.main'
                                                },
                                                cursor: 'pointer'


                                            }}
                                                onClick={handleClickOnLike}
                                            /> <ThumbDownOffAltIcon
                                                sx={{
                                                    '&:hover': {
                                                        color: 'primary.main'
                                                    },
                                                    cursor: 'pointer'

                                                }}
                                                onClick={handleClickOnUnlike}
                                            />


                                        </Box>}

                                        {
                                          !isHistory &&  starRatings && <Box>
                                                <Rating
                                                    name="simple-controlled"
                                                    value={rating}
                                                    onChange={handleRatingChange}
                                                />


                                            </Box>
                                        }
                                        {
                                          !isHistory && starRatings && rating>0 && <Box> 
                                                <Typography>Feedback: {rating} star</Typography>
                                            </Box>

                                        }
                                        {
                                            feedBack && <Box> 
                                            <Typography>Feedback: {feedBack}</Typography>
                                        </Box>
                                        }
                                    </Box>

                                </CardContent>
                            </Card>
                        </>

                    )
                }
            </>
            }
             {feedbackModel && <FeedBackModel setFeedback={setFeedback} open={feedbackModel} setOpen={setFeedBackModel}/>}
        </Stack >




    )
}

export default ChattingCards
