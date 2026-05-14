'use client';

import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import Image from 'next/image';
import { CLIENTES_LOGOS } from './clientesLogos.data';
import { Marquee } from './Marquee';

// Duplicamos el array para crear el efecto infinito
const LOGOS_DUPLICADOS = [...CLIENTES_LOGOS, ...CLIENTES_LOGOS];

export default function ClientesLogos() {
    const theme = useTheme();

    return (
        <Box sx={{py:{ xs: 6, md:8, lg: 16}, px:{ xs: 1, md:1, lg: 1}, background: theme.palette.marca.fondo1 }}>
            <Container maxWidth="xl">


                <Typography variant="h5" align='center' sx={{mb:2}} color='primary'>
                    Ellos confiaron en nosotros
                </Typography>


                <Marquee velocidad={35} gap={12}>
                    {CLIENTES_LOGOS.map((cliente) => (
                        <Image
                            key={cliente.id}
                            src={cliente.logoSrc}
                            alt={cliente.nombre}
                            width={cliente.width ?? 160}
                            height={50}
                            style={{ objectFit: 'contain' }}
                        />
                    ))}
                </Marquee>

                <Grid container spacing={6} sx={{ alignItems:{ xs: 'left', md: 'center' }, justifyContent: "center", mt:10, mb:4 }}>

                    <Grid size={{ xs: 12, md:10, lg:7}} sx={{textAlign:{ xs: 'left', md: 'center'}}}>
                        <Typography variant="h2" align='center'
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
                            Tenemos mas de 10 años en Perú desarrollando tecnologia.
                        </Typography>

                        <Typography variant="h5"  sx={{ mt:2, mx:{xs:0 , md:6}, textAlign:{xs: 'left', md: 'center'}}}>
                            En el último año hemos creado agentes de Inteligencia Artificial para más de 10 clientes.
                        </Typography>
                    </Grid>

                </Grid>

                <Box sx={{textAlign:{ xs: 'left', md: 'center' }}}>
                    <Button variant="contained" href="#agendar" size="large" >
                        Agendar una cita
                    </Button>
                </Box>

            </Container>
        </Box>
    );
}