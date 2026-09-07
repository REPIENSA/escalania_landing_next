import { Box, Container, Grid } from '@mui/material';
import { paletaMarca } from '@/ui/theme/colores';
import Hero1_2 from './Hero1_2';
import Hero1_1 from './Hero1_1';

export default function Hero1() {
    return (
        <Box sx={{px:{ xs: 1, md:4, lg: 12}, pt:{ xs: 6, md:8, lg: 12}, pb:{ xs: 6, md:8, lg: 16}, background: paletaMarca.fondo1}}>
            <Container maxWidth="xl">
                <Grid container spacing={6} sx={{ alignItems: "center" }}>
                    <Grid size={{ xs: 12, md:6, lg: 6}}>
                        <Hero1_1 />
                    </Grid>

                    <Grid size={{ xs: 12, md:6, lg: 6}}>
                        <Hero1_2 />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
