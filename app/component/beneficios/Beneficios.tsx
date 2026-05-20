'use client';
import { Box, Container, Grid, Typography} from '@mui/material';
import { CardCambiante } from '@/ui/componentes/cards/CardCambiante';
import { Beneficio } from '@/ui/componentes/beneficio/Beneficio';
import { useTheme, alpha } from "@mui/material/styles";

export default function Beneficios() {

    const theme = useTheme();
    
    return (
        <Box sx={{py:{ xs: 6, md:8, lg: 16}, px:{ xs: 6, md:8, lg: 12}, background: theme.palette.marca.fondo2 }}>
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
                        Beneficios de nuestro servicio
                    </Typography>
                </Box>

                <Grid container spacing={4} sx={{ alignItems: "stretch" }}>
                    
                    <Grid size={{ xs: 12, md:4, lg:4}} sx={{ display: "flex" }}>
                        <Typography variant="h4">
                            Cada conversación bien atendida es una oportunidad.
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md:4, lg:4}} sx={{ display: "flex" }}>
                        <Beneficio
                            icono='store'
                            titulo='Atención inmediata'
                            subTitulo='Responde al instante y evita que una oportunidad se enfríe por esperar demasiado.'
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md:4, lg:4}} sx={{ display: "flex" }}>
                        <Beneficio
                            icono='alarm'
                            titulo='Mas ventas'
                            subTitulo='Cada mensaje se convierte en una oportunidad para acercar al cliente a la compra.'
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md:4, lg:4}} sx={{ display: "flex" }}>
                        <Beneficio
                            icono='event_available'
                            titulo='Atención 24/7'
                            subTitulo='Tu negocio sigue atendiendo, captando y respondiendo incluso fuera de horario.'
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md:4, lg:4}} sx={{ display: "flex" }}>
                        <Beneficio
                            icono='store'
                            titulo='Ahorro de tiempo'
                            subTitulo='La IA resuelve lo repetitivo para que tu equipo se enfoque en lo importante.'
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md:4, lg:4}} sx={{ display: "flex" }}>
                        <Beneficio
                            icono='alarm'
                            titulo='Control'
                            subTitulo='Supervisa cada conversación y mantén el control de la experiencia de tus clientes.'
                        />
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
}