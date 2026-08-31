import { Box, List, ListItem, ListItemIcon, Typography } from '@mui/material';
import { paletaMarca } from '@/ui/theme/colores';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

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
            <Box sx={{ mb: 3 }}>
                <Typography variant="h1" sx={{mb:1}} >
                    Si te escriben 11:30 de la noche, Olivia les responde.
                </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography variant="h5" component="h5">Olivia es nuestra agente de Inteligencia Artificial creada para centros médicos y estéticos.</Typography>
            </Box>

            <Box>
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
        </Box>
    );
}
