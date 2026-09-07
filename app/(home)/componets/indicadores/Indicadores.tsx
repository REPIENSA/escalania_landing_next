import { Box, Card, Container, Grid } from '@mui/material';
import { Indicador } from './Indicador';
import { INDICADORES } from './Indicadores.data';

export default function Indicadores() {
    return (
        <Box sx={{ px: { xs: 1, md: 4, lg: 12 }, pb: { xs: 6, md: 8, lg: 16 } }}>
            <Container maxWidth="xl">
                <Card
                    id="contacto"
                    sx={{
                        borderRadius: 8 ,
                        //backgroundColor: paletaMarca.fondo2,
                        boxShadow: "none",
                        p: { xs: 2.5, md: 6},
                    }}
                >
                <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
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
