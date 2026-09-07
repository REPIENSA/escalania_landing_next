import { createBreakpoints } from '@mui/system';
const breakpoints = createBreakpoints({});

export const tipografia = {
    fontFamily: 'var(--font-geist-sans), Arial, sans-serif',

    h1:{
        fontWeight: 600,
        [breakpoints.up('xs')]: { fontSize: '1.8rem'},
        [breakpoints.up('md')]: { fontSize: '2.5rem'},
        [breakpoints.up('lg')]: { fontSize: '3.5rem'},
    },

    h2:{
        fontWeight: 600,
        lineHeight: 1.3,
        [breakpoints.up('xs')]: { fontSize: '1.8rem'},
        [breakpoints.up('md')]: { fontSize: '2.5rem'},
        [breakpoints.up('lg')]: { fontSize: '3.5rem'},
    },

    h3: {
        fontWeight: 600,
        lineHeight: 1.3,
        [breakpoints.up('xs')]: { fontSize: '1.8rem'},
        [breakpoints.up('md')]: { fontSize: '2.5rem'},
        [breakpoints.up('lg')]: { fontSize: '2.5rem'},
    },

    h4: {
        fontWeight: 400,
        lineHeight: 1.3,
        [breakpoints.up('xs')]: { fontSize: '1.5rem'},
        [breakpoints.up('md')]: { fontSize: '2.0rem'},
        [breakpoints.up('lg')]: { fontSize: '2.0rem'},
    },

    h5: {
        lineHeight: 1.3 ,
        fontWeight: 400,
        [breakpoints.up('xs')]: { fontSize: '1.2rem'},
        [breakpoints.up('md')]: { fontSize: '1.5rem'},
        [breakpoints.up('lg')]: { fontSize: '1.4rem'},
    },

    h6: {
        fontSize: '1.4rem',
        fontWeight: 400,
        lineHeight: 1.3,
    },

    body1: {
        fontSize: '1.1rem',
        fontWeight: 400,
        lineHeight: 1.5,
    },

    body2: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.5,
    },

    button: {
        fontSize: '0.95rem',
        fontWeight: 700,
        lineHeight: 1.2,
        textTransform: 'none' as const,
    },
};