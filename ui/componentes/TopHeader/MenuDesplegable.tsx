'use client';

import { useId, useState } from 'react';
import type { MouseEvent } from 'react';
import Link from 'next/link';
import { Button, Menu, MenuItem } from '@mui/material';
import { alpha } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { paletaMarca } from '@/ui/theme/colores';
import type { EnlaceNavegacion } from './navegacion.data';
import { estilosEnlaceHeader } from './estilosEnlaceHeader';

interface PropsMenuDesplegable {
    etiqueta: string;
    subitems: EnlaceNavegacion[];
    /** Ruta actual, para resaltar el item cuando una de sus opciones está activa. */
    rutaActual: string;
}

/** Item del header con opciones que se despliegan al hacer clic (escritorio). */
export function MenuDesplegable({ etiqueta, subitems, rutaActual }: PropsMenuDesplegable) {
    const [ancla, setAncla] = useState<HTMLElement | null>(null);
    const idMenu = useId();
    const abierto = Boolean(ancla);
    const activo = subitems.some((subitem) => rutaActual.startsWith(subitem.href));

    const abrir = (evento: MouseEvent<HTMLElement>) => setAncla(evento.currentTarget);
    const cerrar = () => setAncla(null);

    return (
        <>
            <Button
                variant="text"
                onClick={abrir}
                endIcon={<KeyboardArrowDownIcon />}
                aria-haspopup="menu"
                aria-expanded={abierto}
                aria-controls={abierto ? idMenu : undefined}
                sx={[
                    estilosEnlaceHeader(activo),
                    {
                        '& .MuiButton-endIcon': {
                            ml: 0.25,
                            transition: 'transform 0.25s ease',
                            transform: abierto ? 'rotate(180deg)' : 'none',
                        },
                    },
                ]}
            >
                {etiqueta}
            </Button>

            <Menu
                id={idMenu}
                anchorEl={ancla}
                open={abierto}
                onClose={cerrar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            mt: 1,
                            minWidth: 220,
                            borderRadius: 3,
                            border: `1px solid ${alpha(paletaMarca.textoPrincipal, 0.08)}`,
                            boxShadow: `0 12px 32px ${alpha(paletaMarca.fondo1, 0.16)}`,
                        },
                    },
                    list: { sx: { py: 1 } },
                }}
            >
                {subitems.map((subitem) => {
                    const subitemActivo = rutaActual.startsWith(subitem.href);
                    return (
                        <MenuItem
                            key={subitem.href}
                            component={Link}
                            href={subitem.href}
                            onClick={cerrar}
                            selected={subitemActivo}
                            sx={{
                                mx: 1,
                                px: 2,
                                py: 1.25,
                                borderRadius: 2,
                                fontSize: '0.95rem',
                                fontWeight: subitemActivo ? 600 : 500,
                                color: subitemActivo ? paletaMarca.principal : paletaMarca.textoPrincipal,
                                '&.Mui-selected, &.Mui-selected:hover': {
                                    backgroundColor: alpha(paletaMarca.principal, 0.08),
                                },
                                '&:hover': {
                                    backgroundColor: alpha(paletaMarca.principal, 0.06),
                                    color: paletaMarca.principal,
                                },
                            }}
                        >
                            {subitem.etiqueta}
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
}
