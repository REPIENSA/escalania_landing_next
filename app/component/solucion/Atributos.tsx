import { Box, List, ListItem, ListItemIcon, Typography } from '@mui/material';
import ForwardIcon from '@mui/icons-material/Forward';

const CAPACIDADES = [
    'Responder preguntas frecuentes.',
    'Dar información sobre tus servicios.',
    'Resolver dudas de clientes potenciales.',
    'Agendar citas.',
    'Guiar conversaciones hacia la venta.',
    'Mantener una atención rápida y profesional.',
];

export default function Atributos() {
    return (
        <Box>

            <Box sx={{ mb: 3 }}>
                <Typography variant="h3" component="h2"
                    sx={{
                        display: "inline",
                        backgroundImage: "linear-gradient(currentColor, currentColor)",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "0 100%",
                        backgroundSize: "0% 4px",
                        transition: "background-size 0.5s cubic-bezier(0.22, 1, 0.36, 1)",

                        "@media (hover: hover)": {
                            "&:hover": {
                                backgroundSize: "100% 4px",
                            },
                        },
                    }}
                >
                    Tu asistente comercial inteligente siempre activo
                </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography>
                    En Escalania implementamos un agente de IA entrenado para atender a tus clientes en tus canales principales: WhatsApp, Instagram, Facebook, etc.
                </Typography>
                <Typography>
                    Tu agente puede:
                </Typography>
            </Box>

            <Box sx={{ width: '100%'}}>
                <List>
                    {CAPACIDADES.map((capacidad) => (
                        <ListItem key={capacidad} disablePadding sx={{ py: 1 }}>
                            <ListItemIcon>
                                <ForwardIcon fontSize="medium"/>
                            </ListItemIcon>
                            <Typography>{capacidad}</Typography>
                        </ListItem>
                    ))}
                </List>
            </Box>

        </Box>
    );
}
