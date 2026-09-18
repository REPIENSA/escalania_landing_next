import type { Metadata } from 'next';
import { Box, Button, Container, Typography } from '@mui/material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { paletaMarca } from '@/ui/theme/colores';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { EventoMetaPixel } from '@/ui/componentes/metaPixel/EventoMetaPixel';

export const metadata: Metadata = {
    title: 'Gracias | Escalania',
    description: 'Recibimos tus datos. Te contactamos en breve.',
    // Es una página de confirmación: no aporta nada en resultados de búsqueda.
    robots: { index: false, follow: false },
};

export default function GraciasPage() {
    return (
        <Box
            sx={{
                px: { xs: 1, md: 4, lg: 12 },
                py: { xs: 8, md: 12, lg: 16 },
                background: paletaMarca.fondo1,
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            {/* Conversión: llegar aquí significa que el formulario se envió con éxito. */}
            <EventoMetaPixel evento="Lead" />
            <Container maxWidth="sm">
                <Box sx={{ textAlign: 'center', color:"#fff", mb:3 }}>
                    <CheckCircleOutlinedIcon
                        sx={{ fontSize: 96, color: paletaMarca.principal, mb: 2 }}
                    />

                    <Typography variant="h2" component="h1" sx={{ mb: 2 }}>
                        ¡Gracias! Recibimos tus datos.
                    </Typography>

                    <Typography variant="h5" sx={{ mb: 5 }}>
                        Un asesor te va a escribir por WhatsApp para coordinar la
                        demostración. Revisa también tu correo por si acaso.
                    </Typography>

                    <Button href="https://wa.link/4ju65b" size="large" endIcon={<WhatsAppIcon />}>
                        Chatear con un especialista
                    </Button>
                </Box>

                <Box sx={{ textAlign: 'center', color:"#fff" }}>
                    <Button variant="outlined" href="/" size="large" startIcon={<ArrowBackIcon />}>
                        Volver al inicio
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}
