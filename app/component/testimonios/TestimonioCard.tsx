'use client';

import { Box, Typography, Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useTheme, alpha } from '@mui/material/styles';
import { Testimonio } from './Testimonios.data';

interface TestimonioCardProps {
    testimonio: Testimonio;
}

export function TestimonioCard({ testimonio }: TestimonioCardProps) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                minWidth: { xs: 260, sm: 300 },
                maxWidth: { xs: 260, sm: 300 },
                height: '100%',
                backgroundColor: theme.palette.background.paper,
                borderRadius: 5,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                flexShrink: 0,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                    boxShadow: `0 8px 24px ${alpha(theme.palette.common.black, 0.12)}`,
                },
            }}
        >
            {/* Estrellas */}
            <Box sx={{ display: 'flex', gap: 0.5 }}>
                {Array.from({ length: testimonio.calificacion }).map((_, i) => (
                    <StarIcon key={i} sx={{fontSize: 32, color: '#F5A623',}}/>
                ))}
            </Box>

            {/* Texto */}
            <Typography variant="body1" sx={{ flexGrow: 1, mb:3 }}>
                {testimonio.texto}
            </Typography>

            {/* Autor */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar
                    sx={{
                        width: 36,
                        height: 36,
                        fontSize: 14,
                        fontWeight: 700,
                        backgroundColor: theme.palette.text.primary,
                        color: theme.palette.marca.fondo1,
                    }}
                >
                    {testimonio.avatar}
                </Avatar>
                <Box>
                    <Typography variant="body1">
                        {testimonio.nombre}
                    </Typography>
                    <Typography variant="body1">
                        {testimonio.fuente}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}