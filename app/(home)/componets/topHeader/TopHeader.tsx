import { Box, Button, Container } from '@mui/material';
import Image from 'next/image';
import { paletaMarca } from '@/ui/theme/colores';

export default function TopHeader() {
    return (
        <Box sx={{px: { xs: 2, md: 4, lg: 12 }, py: { xs: 1, md: 2, lg: 3 }, background: paletaMarca.fondo1, }}>
            <Container maxWidth="xl">
                <Box
                    sx={{
                        display: 'grid',
                        // Dos mitades: logo en la izquierda, botón centrado en la derecha.
                        // En xs no hay ancho para centrarlo, va pegado a la derecha.
                        gridTemplateColumns: { xs: '1fr auto', md: '1fr 1fr' },
                        alignItems: 'center',
                        gap: 6,
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            //width: { xs: 150, md: 100 },
                            height: { xs: 24, md: 24 },
                            flexShrink: 0,
                        }}
                    >
                        <Image
                            src="/imagenes/logo-escalania-olivia.svg"
                            alt="Escalania / Olivia"
                            fill
                            style={{ objectFit: 'contain', objectPosition: 'left center' }}
                            priority
                        />
                    </Box>


                </Box>
            </Container>
        </Box>
    );
}
