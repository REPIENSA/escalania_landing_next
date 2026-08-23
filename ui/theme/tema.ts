'use client';
import { alpha, createTheme } from '@mui/material/styles';
import { paletaMarca } from './colores';
import { tipografia } from './tipografia';

declare module '@mui/material/styles' {

    interface Palette {
        marca: {
            principal: string;
            secundario: string;
            superficie: string;
            acento: string;
            fondo1: string;
            fondo2: string;
            fondo3: string;
        };
    }

    interface PaletteOptions {
        marca?: {
            principal?: string;
            secundario?: string;
            superficie?: string;
            acento?: string;
            fondo1?: string;
            fondo2?: string;
            fondo3?: string;
        };
    }
}

export const tema = createTheme({
    typography: tipografia,
    palette: {
        primary: {
            main: paletaMarca.principal,
        },
        secondary: {
         main: paletaMarca.secundario,
        },
        text: {
            primary: paletaMarca.textoPrincipal,
            secondary: paletaMarca.textoSecundario,
        },
        background: {
            default: paletaMarca.fondo3,
        },
        marca: {
            principal: paletaMarca.principal,
            secundario: paletaMarca.secundario,
            acento: paletaMarca.acento,
            fondo1:paletaMarca.fondo1,
            fondo2:paletaMarca.fondo2,
            fondo3:paletaMarca.fondo3,
        },
    },












     components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true,      // sin box-shadow por defecto de MUI
                variant: 'contained',         // variant por defecto
            },
            styleOverrides: {
                root: {
                    borderRadius: '999px',
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    minHeight: 48,
                    paddingInline: '1.75rem',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease',

                    '@media (hover: hover)': {
                        '&:hover': {
                            //transform: 'translateY(-3px)',
                        },
                    },
                    '&:active': {
                        transform: 'translateY(0px)',
                    },
                    '&.Mui-disabled': {
                        opacity: 0.45,
                    },
                },

                // Variante CONTAINED — botón primario sólido
                contained: ({ theme }) => ({
                    backgroundColor: theme.palette.marca.principal,
                    color: '#fff',
                    boxShadow: 'none',

                    '@media (hover: hover)': {
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.marca.principal, 0.8),
                            //boxShadow: `0 8px 20px ${alpha(theme.palette.marca.principal, 0.35)}`,
                        },
                    },
                    '&.Mui-disabled': {
                        backgroundColor: alpha(theme.palette.marca.principal, 0.25),
                        color: 'rgba(255,255,255,0.7)',
                    },
                }),

                // Variante OUTLINED — borde azul, fondo transparente
                outlined: ({ theme }) => ({
                    borderColor: theme.palette.marca.principal,
                    color: theme.palette.marca.principal,
                    borderWidth: '1.5px',
                    backgroundColor: 'transparent',

                    '@media (hover: hover)': {
                        '&:hover': {
                            borderWidth: '1.5px',
                            borderColor: theme.palette.marca.principal,
                            backgroundColor: alpha(theme.palette.marca.principal, 0.06),
                            boxShadow: 'none',
                        },
                    },
                }),

                // Variante TEXT — solo texto, sin borde ni fondo
                text: ({ theme }) => ({
                    color: theme.palette.marca.principal,
                    paddingInline: '0.75rem',

                    '@media (hover: hover)': {
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.marca.principal, 0.06),
                            boxShadow: 'none',
                        },
                    },
                }),

                // Tamaño large — para CTAs principales como tu formulario
                sizeLarge: {
                    minHeight: 64,
                    fontSize: '1.1rem',
                    paddingInline: '2.5rem',
                },

                // Tamaño small
                sizeSmall: {
                    minHeight: 36,
                    fontSize: '0.85rem',
                    paddingInline: '1.25rem',
                },
            },
        },
    },
});