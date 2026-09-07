import { Box, Typography } from '@mui/material';
import { paletaMarca } from '@/ui/theme/colores';

export default function Izquierda() {
    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h1" sx={{mb:1}}>
                    Agente de IA para WhatsApp, Instagram y Facebook
                </Typography>
                <Typography variant="h1" component="p" sx={{color: paletaMarca.principal}}>
                    Desde S/ 600 al mes.
                </Typography>
            </Box>

            <Box>
                <Typography variant="h5" component="p">
                    Automatiza la atención de tus clientes con un agente 24/7 que responde consultas, brinda información, agenda citas y te ayuda a convertir más conversaciones en ventas.
                </Typography>
            </Box>
        </Box>
    );
}
