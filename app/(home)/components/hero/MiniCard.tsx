import { Box, Typography } from '@mui/material';
import { paletaMarca } from '@/ui/theme/colores';
import type { ReactNode } from 'react';

export interface MiniCardProps {
    titulo: string;
    icono: ReactNode;
}

/** Card pequeña con título a la izquierda e icono a la derecha, estilo "What's new" de Chrome. */
export default function MiniCard({ titulo, icono }: MiniCardProps) {
    return (
        <Box
            sx={{
                flex: '0 0 auto',
                width: { xs: 220, md: 270 },
                //height: { xs: 76, md: 90 },
                px: 2,
                py: 3,
                pb: 3,
                borderRadius: 5,
                backgroundColor: paletaMarca.fondo1,
                color: paletaMarca.textoPrincipal,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 1.5,
                cursor: 'default',
                transition: 'transform .2s ease',
                '&:hover': { transform: 'translateY(-2px)' },
            }}
        >
            <Typography component="p" sx={{color:"#fff"}}>
                {titulo}
            </Typography>

            <Box
                sx={{
                    flexShrink: 0,
                    width: { xs: 48, md: 58 },
                    height: { xs: 48, md: 58 },
                    borderRadius: 3,
                    backgroundColor: paletaMarca.principal,
                    color: '#fff',
                    display: 'grid',
                    placeItems: 'center',
                    '& svg': { fontSize: { xs: 28, md: 34 } },
                }}
            >
                {icono}
            </Box>
        </Box>
    );
}
