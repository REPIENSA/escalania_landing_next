'use client';

import { Box, Typography, Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useTheme, alpha } from '@mui/material/styles';
import { Testimonio } from './testimonios.data';

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
                backgroundColor: theme.palette.background.paper,
                borderRadius: 5,
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                flexShrink: 0,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 24px ${alpha(theme.palette.common.black, 0.12)}`,
                },
            }}
        >
            {/* Estrellas */}
            <Box sx={{ display: 'flex', gap: 0.5 }}>
                {Array.from({ length: testimonio.calificacion }).map((_, i) => (
                    <StarIcon key={i} sx={{fontSize: 24, color: '#F5A623',}}/>
                ))}
            </Box>

            {/* Texto */}
            <Typography variant="body1">
                {testimonio.texto}
            </Typography>

            {/* Autor */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar
                    sx={{
                        width: 36,
                        height: 36,
                        fontSize: 13,
                        fontWeight: 700,
                        backgroundColor: theme.palette.marca.principal,
                        color: theme.palette.marca.fondo1,
                    }}
                >
                    {testimonio.avatar}
                </Avatar>
                <Box>
                    <Typography variant="body2">
                        {testimonio.nombre}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {testimonio.fuente}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}