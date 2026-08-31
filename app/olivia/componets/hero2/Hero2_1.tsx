import { Box, Typography } from '@mui/material';
import { alpha } from "@mui/material/styles";
import { paletaMarca } from '@/ui/theme/colores';
import { Titulo } from '@/ui/componentes/Titulo';

interface Paso {
    numero: string;
    descripcion: string;
}

const PASOS: Paso[] = [
    {
        numero: '1',
        descripcion: 'Dejas tus datos.',
    },
    {
        numero: '2',
        descripcion: 'Conversas con Emilia por WhatsApp y pregúntale todo sobre Olivia.',
    },
    {
        numero: '3',
        descripcion: 'Con Emilia podrás agendar una reunión online con una persona de nuestro equipo.',
    },
    {
        numero: '4',
        descripcion: 'Si te gusta Olivia, ¡empezamos! Te asignamos un ejecutivo con nombre y apellido que configura a Olivia por ti.',
    },
];

// Diámetro del círculo del número: define también dónde cae la línea que une
// un paso con el siguiente.
const DIAMETRO_NUMERO = { xs: 40, md: 48 };

export default function Hero2_1() {
    return (
        <Box>

            <Box sx={{ mb:2 }}>
                <Titulo titulo="Pruébalo primero y decides después" variant="h3"/>
            </Box>


            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" component="h5">
                    Déjanos tus datos y podrás hablar con{' '}
                    <Box component="strong" sx={{ color: paletaMarca.principal }}>
                        Emilia
                    </Box>
                    , nuestra agente experta en explicar todo lo que{' '}
                    <Box component="strong" sx={{ color: paletaMarca.principal }}>
                        Olivia 
                    </Box>{' '}puede hacer por tu negocio.
                </Typography>
            </Box>

            <Box component="ol" sx={{ listStyle: 'none', p: 0, m: 0, mb: 4 }}>
                {PASOS.map((paso) => (
                    <Box
                        component="li"
                        key={paso.numero}
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: { xs: 2, md: 3 },
                            pb: { xs: 2, md:2 },
                            '&:last-of-type': { pb: 0 },

                            // Línea vertical que conecta este número con el siguiente.
                            '&:not(:last-of-type)::before': {
                                content: '""',
                                position: 'absolute',
                                left: { xs: 19, md: 23 },
                                top: DIAMETRO_NUMERO,
                                bottom: 0,
                                width: 2,
                                backgroundColor:paletaMarca.principal,
                            },
                        }}
                    >
                        <Box
                            aria-hidden="true"
                            sx={{
                                flexShrink: 0,
                                width: DIAMETRO_NUMERO,
                                height: DIAMETRO_NUMERO,
                                borderRadius: '999px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: paletaMarca.principal,
                                color: '#fff',
                                fontWeight: 500,
                                lineHeight: 1,
                            }}
                        >
                            {paso.numero}
                        </Box>

                        <Typography
                            sx={{
                                // Centra la primera línea del texto con el círculo.
                                pt: { xs: 0.75, md: 1.25 },
                                lineHeight: 1.6,
                            }}
                        >
                            {paso.descripcion}
                        </Typography>
                    </Box>
                ))}
            </Box>

        </Box>
    );
}
