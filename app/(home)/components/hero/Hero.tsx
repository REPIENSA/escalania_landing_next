import { Box, Container, Grid } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { paletaMarca } from '@/ui/theme/colores';
import Hero_1 from './Hero_1';
import Hero_2 from './Hero_2';

export default function Hero() {
    return (
        <Box sx={{px:{ xs: 1, md:4, lg: 12}, pt:{ xs: 6, md:8, lg: 12}, pb:{ xs: 6, md:8, lg: 16}, backgroundColor: paletaMarca.fondo1, position: 'relative'}}>

            <Box
                component="video"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
                sx={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    pointerEvents: 'none',
                }}
            >
                <source src="/videos/video-home.mp4" type="video/mp4" />
            </Box>

            <Box
                aria-hidden="true"
                sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: alpha(paletaMarca.fondo1, 0.90),
                    pointerEvents: 'none',
                }}
            />

            <Container maxWidth="xl" sx={{ position: 'relative' }}>
                <Grid container spacing={6} sx={{ alignItems: "center" }}>
                    <Grid size={{ xs: 12, md:6, lg: 7}}>
                        <Hero_1 />
                    </Grid>

                    <Grid size={{ xs: 12, md:12, lg: 12}}>
                        <Hero_2 />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
