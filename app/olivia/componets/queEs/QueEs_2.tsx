import { Box, Typography } from '@mui/material';
import type { SvgIconComponent } from '@mui/icons-material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { paletaMarca } from '@/ui/theme/colores';

interface Fila {
    id: string;
    olivia: string;
    otrosBots: string;
}

const FILAS: Fila[] = [
    {
        id: 'habla',
        olivia: 'Conversa en lenguaje normal',
        otrosBots: 'Te dan un menú de opciones',
    },
    {
        id: 'responde',
        olivia: 'Entiende tu consulta y responde a esa consulta',
        otrosBots: 'Repiten respuestas predefinidas',
    },
    {
        id: 'sabe',
        olivia: 'Conoce tus servicios y contraindicaciones',
        otrosBots: 'No saben de tratamientos',
    },
    {
        id: 'agenda',
        olivia: 'Agenda ella misma',
        otrosBots: 'Derivan a un humano',
    },
    {
        id: 'cobra',
        olivia: 'Cobra el adelanto por Yape o Plin',
        otrosBots: 'No cobran',
    },
];

interface Columna {
    campo: 'olivia' | 'otrosBots';
    titulo: string;
    icono: SvgIconComponent;
    color: string;
}

/** Cada columna define su título, su icono y su color una sola vez, así la
 *  cabecera y el cuerpo no pueden desalinearse entre sí. */
const COLUMNAS: Columna[] = [
    {
        campo: 'olivia',
        titulo: 'Olivia',
        icono: CheckCircleOutlineRoundedIcon,
        color: '#389f3b',
    },
    {
        campo: 'otrosBots',
        titulo: 'Otros Agentes',
        icono: HighlightOffIcon,
        color: '#8b0303',
    },
];

const COLOR_BORDE = paletaMarca.acento;

// Estructura común a las cuatro celdas: es lo que mantiene el mismo espacio
// entre icono y texto en la cabecera y en el contenido.
const estilosCelda = {
    flex: 1,
    display: 'flex',
    gap: { xs: 1, md: 1.25 },
    px: { xs: 1.5, md: 2.5 },
};

const estilosIcono = {
    flexShrink: 0,
    fontSize: { xs: 20, md: 24 },
};

export default function QueEs_2() {
    return (
        <Box
            role="table"
            aria-label="Olivia comparada con otros agentes"
            sx={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                border: `1px solid ${COLOR_BORDE}`,
                // Recorta las esquinas de la cabecera contra el marco.
                overflow: 'hidden',
            }}
        >
            <Box
                role="row"
                sx={{
                    display: 'flex',
                    minHeight: 56,
                    backgroundColor: paletaMarca.acento,
                    color: '#fff',
                }}
            >
                {COLUMNAS.map((columna, indice) => {
                    const Icono = columna.icono;

                    return (
                        <Box
                            key={columna.campo}
                            role="columnheader"
                            sx={{
                                ...estilosCelda,
                                alignItems: 'center',
                                ...(indice > 0 && {
                                    borderLeft: '1px solid rgba(255, 255, 255, 0.15)',
                                }),
                            }}
                        >
                            <Icono aria-hidden="true" sx={estilosIcono} />
                            {columna.titulo}
                        </Box>
                    );
                })}
            </Box>

            {FILAS.map((fila) => (
                <Box
                    key={fila.id}
                    role="row"
                    sx={{
                        display: 'flex',
                        '&:not(:last-of-type)': {
                            borderBottom: `1px solid ${COLOR_BORDE}`,
                        },
                    }}
                >
                    {COLUMNAS.map((columna, indice) => {
                        const Icono = columna.icono;

                        return (
                            <Box
                                key={columna.campo}
                                role="cell"
                                sx={{
                                    ...estilosCelda,
                                    alignItems: 'flex-start',
                                    pt: { xs: 1.75, md: 2.25 },
                                    pb: { xs: 1.5, md: 2 },
                                    ...(indice > 0 && {
                                        borderLeft: `1px solid ${COLOR_BORDE}`,
                                    }),
                                }}
                            >
                                <Icono
                                    aria-hidden="true"
                                    // Baja el icono hasta la primera línea del texto.
                                    sx={{ ...estilosIcono, color: columna.color, mt: '3px' }}
                                />
                                <Typography variant="body2">
                                    {fila[columna.campo]}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>
            ))}
        </Box>
    );
}
