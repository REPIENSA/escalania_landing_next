'use client';

import { Box, Container, Typography } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { TestimonioCard } from './TestimonioCard';
import { TESTIMONIOS } from './Testimonios.data';
import { CarruselPasos } from './CarruselPasos';


export default function Testimonios() {
    const theme = useTheme();

    return (
        <Box sx={{pb:{ xs: 6, md:8, lg: 16}, px:{ xs: 6, md:8, lg: 12}, background: theme.palette.marca.fondo2 }}>
            <Container maxWidth="xl">

                <Box sx={{ mb: 10, textAlign:'center'}}>
                    <Typography variant="h2"
                        sx={{
                            display: "inline",
                            backgroundImage: "linear-gradient(currentColor, currentColor)",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "0 100%",
                            backgroundSize: "0% 4px",
                            transition: "background-size 0.5s cubic-bezier(0.22, 1, 0.36, 1)",

                            "@media (hover: hover)": {
                                "&:hover": {
                                    backgroundSize: "100% 4px",
                                },
                            },
                        }}
                    >
                        Lo que dicen nuestros clientes
                    </Typography>

                    <Typography variant="h5"  sx={{ mt:2}}>
                        Negocios reales que ya automatizaron su atencións.
                    </Typography>
                </Box>

                <CarruselPasos duracionDeslizamiento={0.7} pausa={2} gap={3}>
                    {TESTIMONIOS.map((testimonio) => (
                        <TestimonioCard key={testimonio.id} testimonio={testimonio} />
                    ))}
                </CarruselPasos>

            </Container>
        </Box>
    );
}