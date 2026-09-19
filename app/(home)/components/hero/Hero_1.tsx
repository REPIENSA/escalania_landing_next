import { Box, Button, List, ListItem, ListItemIcon, Typography } from '@mui/material';
import { paletaMarca } from '@/ui/theme/colores';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CAPACIDADES = [
    'Conversa con tus clientes.',
    'Responde preguntas frecuentes.',
    'Explica tus servicios.',
    'Agenda citas.',
    'Cobra por Yape o Plin.',
];

export default function Hero_1() {
    return (
        <Box sx={{color:"#fff"}}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h1" sx={{mb:1}} >
                    Conversaciones que generan{' '}
                    <Box component="span" sx={{ color: paletaMarca.secundario }}>
                        resultados
                    </Box>
                </Typography>
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

            <Button href="#contacto" endIcon={<ArrowForwardIcon />}>
                Agendar una demo
            </Button>
        </Box>
    );
}