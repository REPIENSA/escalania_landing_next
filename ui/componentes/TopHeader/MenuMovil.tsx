'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Box,
    Button,
    Collapse,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { paletaMarca } from '@/ui/theme/colores';
import { CTA_HEADER, ITEMS_NAVEGACION } from './navegacion.data';

interface PropsMenuMovil {
    rutaActual: string;
}

const estilosItemMovil = (activo: boolean) => ({
    borderRadius: 2,
    px: 2,
    py: 1.5,
    color: activo ? paletaMarca.principal : paletaMarca.textoPrincipal,
    backgroundColor: activo ? alpha(paletaMarca.principal, 0.08) : 'transparent',
    '& .MuiListItemText-primary': {
        fontSize: '1.05rem',
        fontWeight: activo ? 600 : 500,
    },
});

/** Botón hamburguesa y panel lateral con la navegación (pantallas pequeñas). */
export function MenuMovil({ rutaActual }: PropsMenuMovil) {
    const [abierto, setAbierto] = useState(false);
    // Etiqueta de la sección desplegada; solo una abierta a la vez.
    const [seccionAbierta, setSeccionAbierta] = useState<string | null>(null);

    const cerrar = () => setAbierto(false);
    const alternarSeccion = (etiqueta: string) =>
        setSeccionAbierta((actual) => (actual === etiqueta ? null : etiqueta));

    return (
        <>
            <IconButton
                onClick={() => setAbierto(true)}
                aria-label="Abrir menú"
                sx={{ color: paletaMarca.textoPrincipal }}
            >
                <MenuIcon />
            </IconButton>

            <Drawer
                anchor="right"
                open={abierto}
                onClose={cerrar}
                slotProps={{
                    paper: {
                        sx: {
                            width: 'min(320px, 85vw)',
                            display: 'flex',
                            flexDirection: 'column',
                            px: 2,
                            py: 2,
                        },
                    },
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                    <IconButton onClick={cerrar} aria-label="Cerrar menú" sx={{ color: paletaMarca.textoPrincipal }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <List component="nav" aria-label="Navegación principal" sx={{ flexGrow: 1, p: 0 }}>
                    {ITEMS_NAVEGACION.map((item) => {
                        if (!item.subitems) {
                            const activo = rutaActual === item.href;
                            return (
                                <ListItemButton
                                    key={item.etiqueta}
                                    component={Link}
                                    href={item.href ?? '/'}
                                    onClick={cerrar}
                                    sx={estilosItemMovil(activo)}
                                >
                                    <ListItemText primary={item.etiqueta} />
                                </ListItemButton>
                            );
                        }

                        const desplegado = seccionAbierta === item.etiqueta;
                        const activo = item.subitems.some((subitem) => rutaActual.startsWith(subitem.href));

                        return (
                            <Box key={item.etiqueta}>
                                <ListItemButton
                                    onClick={() => alternarSeccion(item.etiqueta)}
                                    aria-expanded={desplegado}
                                    sx={estilosItemMovil(activo && !desplegado)}
                                >
                                    <ListItemText primary={item.etiqueta} />
                                    <ExpandMoreIcon
                                        sx={{
                                            transition: 'transform 0.25s ease',
                                            transform: desplegado ? 'rotate(180deg)' : 'none',
                                        }}
                                    />
                                </ListItemButton>

                                <Collapse in={desplegado} timeout="auto" unmountOnExit>
                                    <List disablePadding sx={{ pl: 2, pb: 1 }}>
                                        {item.subitems.map((subitem) => (
                                            <ListItemButton
                                                key={subitem.href}
                                                component={Link}
                                                href={subitem.href}
                                                onClick={cerrar}
                                                sx={{
                                                    ...estilosItemMovil(rutaActual.startsWith(subitem.href)),
                                                    py: 1,
                                                    '& .MuiListItemText-primary': { fontSize: '0.95rem' },
                                                }}
                                            >
                                                <ListItemText primary={subitem.etiqueta} />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                            </Box>
                        );
                    })}
                </List>

                <Button href={CTA_HEADER.href} onClick={cerrar} fullWidth sx={{ mt: 2 }}>
                    {CTA_HEADER.etiqueta}
                </Button>
            </Drawer>
        </>
    );
}
