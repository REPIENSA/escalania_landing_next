import { Box, Container, Typography } from '@mui/material';

export const metadata = {
    title: 'Escalania | Agentes de IA para tu negocio',
    description: 'Agentes de Inteligencia Artificial que conversan con tus clientes, resuelven dudas y agendan citas por WhatsApp.',
};

/** Raíz del sitio. Marcador de posición mientras se construye la home. */
export default function HomePage() {
    return (
        <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 8, md: 12 } }}>
            <Container maxWidth="md">
                <Typography variant="h1" sx={{ mb: 2 }}>
                    Escalania
                </Typography>
                <Typography variant="h5" component="p">
                    Home en construcción.
                </Typography>
            </Container>
        </Box>
    );
}
