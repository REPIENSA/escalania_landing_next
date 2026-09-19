import { Box, Button, List, ListItem, ListItemIcon, Typography } from '@mui/material';
import { paletaMarca } from '@/ui/theme/colores';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CAPACIDADES = [
    'Conversa con tus clientes.',
    'Responde preguntas frecuentes.',
    'Explica tus tratamientos.',
    'Agenda citas.',
    'Cobra por Yape o Plin.',
];

export default function Hero1_1() {
    return (
        <Box sx={{color:"#fff"}}>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h1" sx={{mb:1}} >
                    Si te escriben 11:30 de la noche,{' '}
                    <Box component="span" sx={{ color: paletaMarca.secundario }}>
                        Olivia
                    </Box>{' '}
                    les responde.
                </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography variant="h5" component="h5">Olivia es nuestra agente de Inteligencia Artificial creada para centros médicos y estéticos.</Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
                <List>
                    {CAPACIDADES.map((capacidad) => (
                        <ListItem key={capacidad} disablePadding sx={{ py: 1 }}>
                            <ListItemIcon>
                                <TaskAltIcon fontSize="medium" sx={{color:"#fff"}}/>
                            </ListItemIcon>
                            <Typography variant="h5" component="h5">{capacidad}</Typography>
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Button href="#contacto" endIcon={<ArrowForwardIcon />} sx={{ mb: 2 }}>
                Agendar una demo
            </Button>
            <Box >
                <Typography component="p" sx={{ color: paletaMarca.textoSecundario }}>
                    Desde S/ 490 mensuales, puedes acceder a todo el poder de Olivia, incluye hasta 1,500 conversaciones al mes con tus clientes.
                </Typography>
            </Box>
        </Box>
    );
}
