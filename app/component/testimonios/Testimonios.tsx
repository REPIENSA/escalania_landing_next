'use client';

import { Box, Container, Typography } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { TestimonioCard } from './TestimonioCard';
import { TESTIMONIOS } from './Testimonios.data';

export default function Testimonios() {
    const theme = useTheme();

    return (
        <Box
            component="section"
            sx={{
                py: { xs: 8, md: 12 },
                backgroundColor: alpha(theme.palette.marca.principal, 0.04),
                overflow: 'hidden',
            }}
        >
            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ mb: { xs: 5, md: 7 } }}>
                    <Typography
                        variant="overline"
                        sx={{
                            color: theme.palette.marca.principal,
                            fontWeight: 700,
                            letterSpacing: 2,
                            display: 'block',
                            mb: 1,
                        }}
                    >
                        Testimonios
                    </Typography>
                    <Typography
                        variant="h3"
                        sx={{ mb: 1.5 }}
                    >
                        Lo que dicen nuestros clientes
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ maxWidth: 480 }}
                    >
                        Negocios reales que ya automatizaron su atención y están vendiendo más.
                    </Typography>
                </Box>
            </Container>

            {/* Scroll horizontal sin scrollbar visible */}
            <Box
                sx={{
                    display: 'flex',
                    gap: 3,
                    px: { xs: 2, sm: 4, md: 8 },
                    overflowX: 'auto',
                    pb: 2,
                    scrollSnapType: 'x mandatory',
                    '&::-webkit-scrollbar': { display: 'none' },
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                    '& > *': {
                        scrollSnapAlign: 'start',
                    },
                }}
            >
                {TESTIMONIOS.map((testimonio) => (
                    <TestimonioCard key={testimonio.id} testimonio={testimonio} />
                ))}
            </Box>
        </Box>
    );
}