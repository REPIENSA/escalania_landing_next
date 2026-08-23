import { Box, Typography } from '@mui/material';
import { paletaMarca } from '@/ui/theme/colores';

export default function Hero1_1() {
    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h1" sx={{mb:1, color:"#fff"}} >
                    Si te escriben 11:00 pm, Olivia les responde 11:01 pm.
                </Typography>
            </Box>

            <Box>
                <Typography variant="h5" sx={{color:"#fff"}}>Olivia es una agente de IA creada para centros estéticos.</Typography>
                <Typography variant="h5" component="h5" sx={{color:"#fff"}}>Conversa con tus clientas, les explica tus tratamientos, agenda citas  y hasta les cobra  por Yape o Plin.</Typography>

            </Box>
        </Box>
    );
}
