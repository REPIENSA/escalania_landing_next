'use client';
import { Box, Container, Grid, Typography} from '@mui/material';
import { Beneficio } from '@/ui/componentes/beneficio/Beneficio';
import { useTheme, alpha } from "@mui/material/styles";
import Imagenes from './Imagenes';
import Atributos from './Atributos';

export default function Solucion() {

    const theme = useTheme();
    
    return (
        <Box sx={{py:{ xs: 6, md:8, lg: 16}, px:{ xs: 6, md:8, lg: 12}, background: theme.palette.marca.fondo1 }}>
            <Container maxWidth="xl">
                    <Grid container spacing={6} sx={{ alignItems: "stretch" }}>
                        <Grid size={{ xs: 12, md:6, lg:6}}>
                            <Imagenes/>
                        </Grid>

                        <Grid size={{ xs: 12, md:6, lg:6}}>
                            <Atributos/>
                        </Grid>
                    </Grid>
            </Container>
        </Box>
    );
}