'use client';
import { Box, Typography} from '@mui/material';
import { CardCambiante } from '@/ui/componentes/cards/CardCambiante';
import { useTheme, alpha } from "@mui/material/styles";

export default function Izquierda() {

    const theme = useTheme();
    
    return (    
        <Box>      
            <Box sx={{ mb: 3 }}>
                <Typography variant="h1">
                    Agente de IA para WhatsApp, Instagram y Facebook
                </Typography>
                <Typography variant="h1" sx={{color:theme.palette.marca.principal}}>
                    Desde S/ 600 al mes.
                </Typography>   
            </Box>

            <Box sx={{ mb: 3 }}>
                <Typography variant="h5">
                    Automatiza la atención de tus clientes con un agente 24/7 que responde consultas, brinda información, agenda citas y te ayuda a convertir más conversaciones en ventas.
                </Typography>   
            </Box>
        </Box>
    );
}