import { Box, Container, Grid, Typography } from '@mui/material';
import { Beneficio } from '@/ui/componentes/beneficio/Beneficio';
import { paletaMarca } from '@/ui/theme/colores';

import ChatIcon from '@mui/icons-material/Chat';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AlarmIcon from '@mui/icons-material/Alarm';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';

export default function Beneficios() {
    return (
        <Box sx={{px:{ xs: 1, md:4, lg: 12}, py:{ xs: 6, md:8, lg: 16}, background: paletaMarca.fondo2 }}>
            <Container maxWidth="xl">

               <Grid container spacing={6} sx={{ alignItems:{ xs: 'left', md: 'center' }, justifyContent: "center", mb:{ xs: 0, md:8, lg:12} }}>
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
                            Beneficios de nuestro servicio
                        </Typography>

                        <Typography variant="h5"  sx={{ mt:2}}>
                            Deja de perder clientes por responder tarde. Con nuestra IA, tu negocio trabaja solo, las 24 horas del día.
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={4} sx={{ alignItems: "stretch" }}>

                    <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex', justifyContent: 'center',alignItems: 'center',}} >
                        <ChatIcon sx={{ fontSize: 120, color: paletaMarca.acento }} />
                    </Grid>

                    <Grid size={{ xs: 12, md:4, lg:4}} sx={{ display: "flex" }}>
                        <Beneficio
                            icono={StorefrontIcon}
                            titulo='Atención inmediata'
                            subTitulo='Responde al instante y evita que una oportunidad se enfríe por esperar demasiado.'
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md:4, lg:4}} sx={{ display: "flex" }}>
                        <Beneficio
                            icono={ShoppingCartCheckoutIcon}
                            titulo='Mas ventas'
                            subTitulo='Cada mensaje se convierte en una oportunidad para acercar al cliente a la compra.'
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md:4, lg:4}} sx={{ display: "flex" }}>
                        <Beneficio
                            icono={EventAvailableIcon}
                            titulo='Atención 24/7'
                            subTitulo='Tu negocio sigue atendiendo, captando y respondiendo incluso fuera de horario.'
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md:4, lg:4}} sx={{ display: "flex" }}>
                        <Beneficio
                            icono={AlarmIcon}
                            titulo='Ahorro de tiempo'
                            subTitulo='La IA resuelve lo repetitivo para que tu equipo se enfoque en lo importante.'
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md:4, lg:4}} sx={{ display: "flex" }}>
                        <Beneficio
                            icono={DisplaySettingsIcon}
                            titulo='Control'
                            subTitulo='Supervisa cada conversación y mantén el control de la experiencia de tus clientes.'
                        />
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
}
