import { createBreakpoints } from '@mui/system';
const breakpoints = createBreakpoints({});

export const tipografia = {
    fontFamily: 'var(--font-geist-sans), Arial, sans-serif',

    h1:{
        fontSize: '3.5rem',
        fontWeight: 800,
        lineHeight: 1.3,
        [breakpoints.up('sm')]: { fontSize: '2.5rem' },
    },

    h2:{
        [breakpoints.up('xs')]: { fontSize: '2.5rem',fontWeight: 600, },
        [breakpoints.up('lg')]: { fontSize: '3.5rem',fontWeight: 700, },
        lineHeight: 1.3,
        
    },

    h3: {
        fontSize: '2.5rem',
        fontWeight: 700,
        lineHeight: 1.3,
    },

    h4: {
        fontSize: '2.0rem',
        fontWeight: 600,
        lineHeight: 1.3,
    },

    h5: {
        fontSize: '1.5rem',
        fontWeight: 500,
        lineHeight: 1.5 ,
    },

    h6: {
        fontSize: '1.2rem',
        fontWeight: 400,
        lineHeight: 1.5,
    },

    body1: {
        fontSize: '1.1rem',
        fontWeight: 400,
        lineHeight: 1.5,
    },

    body2: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.6,
    },

    button: {
        fontSize: '0.95rem',
        fontWeight: 700,
        lineHeight: 1.2,
        textTransform: 'none' as const,
    },
};