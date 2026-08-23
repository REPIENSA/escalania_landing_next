import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { paletaMarca } from '@/ui/theme/colores';
import { CLIENTES_LOGOS } from './clientesLogos.data';
import { Marquee } from './Marquee';

export default function Clientes() {
    return (
        <Box sx={{px:{ xs: 1, md:1, lg: 1}, py:{ xs: 6, md:8, lg: 16}, background: paletaMarca.fondo1 }}>
            <Container maxWidth="xl">


                <Typography variant="h5" align='center' sx={{mb:2}}>
                    Ellos confiaron en Escalania
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

                <Grid container spacing={6} sx={{ alignItems:{ xs: 'left', md: 'center' }, justifyContent: "center", mt:{ xs: 2, md:8, lg: 14}, mb:6 }}>
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

                <Box sx={{textAlign:{ xs: 'left', md: 'center'}, mb:6}}>
                    <Button variant="contained" href="/#agendar" size="large" >
                        Agendar una cita
                    </Button>
                </Box>

            </Container>
        </Box>
    );
}
