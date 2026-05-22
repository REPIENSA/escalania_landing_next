'use client';
import { Box, Container, Grid, Typography} from '@mui/material';
import { useTheme } from "@mui/material/styles";
import Izquierda from './Izquierda';
import { FormularioContacto } from '@/ui/componentes/formularioContacto/FormularioContacto';

export default function Header() {

    const theme = useTheme();
    
    return (
        <Box sx={{px:{ xs: 1, md:4, lg: 12}, py:{ xs: 6, md:8, lg: 16}}}>
            <Container maxWidth="xl">
                    <Grid container spacing={6} sx={{ alignItems: "stretch" }}>
                        <Grid size={{ xs: 12, md:6, lg:7}}>
                            <Izquierda/>
                        </Grid>

                        <Grid id="agendar" size={{ xs: 12, md:6, lg:5}}>
                            <FormularioContacto />
                        </Grid>
                    </Grid>
            </Container>
        </Box>
    );
}