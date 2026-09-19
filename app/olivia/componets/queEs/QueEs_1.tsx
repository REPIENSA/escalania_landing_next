import { Box, Typography } from '@mui/material';
import { alpha } from "@mui/material/styles";
import { paletaMarca } from '@/ui/theme/colores';
import { Titulo } from '@/ui/componentes/Titulo';


export default function QueEs_1() {
    return (
        <Box>
            <Box sx={{ mb:2 }}>
                <Titulo titulo="¿Qué es Olivia?" variant="h2"/>
            </Box>


            <Box sx={{ mb: 2 }}>
                <Typography variant="h5" component="h5">
                    Olivia es un agente de inteligencia artificial conversacional. No es una app, un menú de opciones, o un contestador automático.
                </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography variant="h5" component="h5">
                    Olivia esta entrenada específicamente para centros médicos y estéticos.
                </Typography>
            </Box>
        </Box>
    );
}
