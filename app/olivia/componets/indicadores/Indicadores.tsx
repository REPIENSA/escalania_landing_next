import { Box, Card, Container, Grid } from '@mui/material';
import { Indicador } from './Indicador';
import { INDICADORES } from './Indicadores.data';
import { paletaMarca } from '@/ui/theme/colores';

export default function Indicadores() {
    return (
        <Box sx={{ px: { xs: 1, md: 4, lg: 12 }, pb: { xs: 6, md: 8, lg: 16 }, background: '#fff' }}>
            <Container maxWidth="xl">
                <Card
                    id="contacto"
                    sx={{
                        borderRadius: 8 ,
                        backgroundColor: paletaMarca.fondo1,
                        boxShadow: "none",
                        py: { xs: 2.5, md: 10},
                        px: { xs: 2.5, md: 12},
                    }}
                >
                <Grid container spacing={{ xs: 3, md: 4, lg: 6 }} sx={{ alignItems: 'stretch' }}>
                    {INDICADORES.map(({ id, ...indicador }) => (
                        <Grid key={id} size={{ xs: 12, sm: 6, lg: 3 }} sx={{ display: 'flex' }}>
                            <Indicador {...indicador} />
                        </Grid>
                    ))}
                </Grid>
                </Card>
            </Container>
        </Box>
    );
}
