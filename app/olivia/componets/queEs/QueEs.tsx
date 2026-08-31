import { Box, Container, Grid } from '@mui/material';
import { paletaMarca } from '@/ui/theme/colores';
import QueEs_1 from './QueEs_1';
import { FormularioContacto } from '@/ui/componentes/formularioContacto/FormularioContacto';
import QueEs_2 from './QueEs_2';


export default function QueEs() {
    return (
        <Box sx={{ px:{ xs: 1, md:4, lg: 12}, py:{ xs: 6, md:8, lg: 16}, background: '#fff'}}>
            <Container maxWidth="xl">
                <Grid container spacing={8} sx={{ alignItems: "stretch" }}>
                    
                    <Grid size={{ xs: 12, md:6, lg:6}} sx={{ pr:{ xs: 0, md:6, lg: 6} }}>
                        <QueEs_1/>
                    </Grid>

                    <Grid id="agendar" size={{ xs: 12, md:6, lg:6}}>
                        <QueEs_2 />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
