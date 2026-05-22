'use client';

import { Box, Container, Typography, Grid } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { TestimonioCard } from './TestimonioCard';
import { TESTIMONIOS } from './Testimonios.data';
import { CarruselPasos } from './CarruselPasos';


export default function Testimonios() {
    const theme = useTheme();

    return (
        <Box sx={{px:{ xs: 1, md:4, lg: 12}, pb:{ xs: 6, md:8, lg: 16}, background: theme.palette.marca.fondo2 }}>
            <Container maxWidth="xl">


                <Grid container spacing={6} sx={{ alignItems:{ xs: 'left', md: 'center' }, justifyContent: "center", mb:{ xs: 3, md:8, lg:12} }}>
                    <Grid size={{ xs: 12, md:10, lg:7}} sx={{textAlign:{ xs: 'left', md: 'center'}}}>
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
                    </Grid>
                </Grid>

                <CarruselPasos duracionDeslizamiento={0.7} pausa={2} gap={3}>
                    {TESTIMONIOS.map((testimonio) => (
                        <TestimonioCard key={testimonio.id} testimonio={testimonio} />
                    ))}
                </CarruselPasos>

            </Container>
        </Box>
    );
}