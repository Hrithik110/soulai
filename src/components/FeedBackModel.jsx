import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Snackbar from '@mui/material';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function FeedBackModel({ open, setOpen, setFeedback }) {

    const handleClose = () => setOpen(false);


    const [inputValue, setInputValue] = React.useState('');

    const handleFeedback = (e) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = () => {
        if (inputValue) {
            setFeedback(inputValue);

            handleClose();
        }
    }
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={
                    {
                        bgcolor: '#FAF7FF'
                    }
                }
            >

                <Box sx={style}>

                    <Button onClick={handleClose} sx={{
                        position: 'relative',
                        left: '80%',
                        cursor: 'pointer'

                    }}><CloseOutlinedIcon /></Button>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        <TipsAndUpdatesOutlinedIcon />   Provide Additional Feedback
                    </Typography>
                    <TextField
                        multiline
                        value={inputValue}
                        onChange={(e) => handleFeedback(e)}
                        sx={{
                            width: '100%',
                            height: '100%',
                            border: '1px solid #00000073',
                        }}
                        required
                    />
                    <Button onClick={handleSubmit} sx={{
                        width: '10rem',
                        height: '3.125rem',
                        position: 'relative',
                        top: '50%',
                        left: '50%',
                        borderRadius: '5px',
                        bgcolor: '#D7C7F4',
                        margin: '1rem',
                        cursor: 'pointer'

                    }}>Submit</Button>

                </Box>

                
            </Modal>
        </div>
    );
}
