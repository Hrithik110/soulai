// theme.js
import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#9785BA', 
            secondary:'#AF9FCD'
        },
        secondary: {
            main: '#D7C7F4', 
            secondary:'#FFF'
        },
        background: {
            default: '#f5f5f5', 
            paper: '#ffffff', 
        },
        text: {
            primary: '#AF9FCD', 
            secondary: '#3C3C3C', 
        },
    },
    typography: {
        fontFamily: 'Ubuntu, Open Sans, sans-serif',
        h1: { fontSize: '2rem', fontWeight: 700, color:'#9785BA' },
        h2: { fontSize: '1.75rem', fontWeight: 500 },
        h3:{fontSize: '1.5rem', fontWeight: 400},
        h4:{fontSize: '1.25rem', fontWeight: 700, color:'#000'},

        body1: { fontSize: '1rem', fontWeight: 700,color:'#000' },
        body2:{fontSize: '1rem', fontWeight: 400,color:'#000'},
        p:{color:'#0000009E', fontFamily:'Open Sans', fontWeight:400,fontSize:'0.75rem'}
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    border: '1px solid #ccc', 
                },
            },
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#bb86fc', 
        },
        secondary: {
            main: '#03dac6', 
            secondary:'#03dac6'
        },
        background: {
            default: '#121212', 
            paper: '#1e1e1e', 
        },
        text: {
            primary: '#000', 
            secondary: '#dddddd', 
        },
    },
    typography: {
        fontFamily: 'Ubuntu, Open Sans, sans-serif',
        h1: { fontSize: '2rem', fontWeight: 700 },
        h2: { fontSize: '1.75rem', fontWeight: 500 },
        h3:{fontSize: '1.5rem', fontWeight: 400},
        h4:{fontSize: '1.25rem', fontWeight: 700, color:'#000'},
        body1: { fontSize: '1rem', fontWeight: 400 },
        body2:{fontSize: '1rem', fontWeight: 400},
        p:{color:'#0000009E', fontFamily:'Open Sans', fontWeight:400,fontSize:'0.75rem'}
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    border: '1px solid #ccc', 
                },
            },
        },
    },
});

export { lightTheme, darkTheme };
