'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, Button, Container } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { paletaMarca } from '@/ui/theme/colores';
import { CTA_HEADER, ITEMS_NAVEGACION } from './navegacion.data';
import { estilosEnlaceHeader } from './estilosEnlaceHeader';
import { MenuDesplegable } from './MenuDesplegable';
import { MenuMovil } from './MenuMovil';

/**
 * Header fijo del sitio: logo a la izquierda y navegación a la derecha.
 *
 * Se queda pegado arriba al hacer scroll con fondo translúcido, para que el
 * contenido se vea pasar por debajo. En pantallas pequeñas la navegación se
 * reemplaza por un menú lateral.
 */
export function TopHeader() {
    const rutaActual = usePathname();

    return (
        <Box
            component="header"
            sx={{
                position: 'sticky',
                top: 0,
                zIndex: (theme) => theme.zIndex.appBar,
                px: { xs: 2, md: 4, lg: 12 },
                backgroundColor:paletaMarca.fondo1,
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
            }}
        >
            <Container maxWidth="xl">
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 6,
                        minHeight: { xs: 64, md: 76 },
                    }}
                >
                    <Link href="/" aria-label="Escalania, ir al inicio" style={{ display: 'flex', flexShrink: 0 }}>
                        <Image
                            src="/imagenes/logotipo-escalania.svg"
                            alt="Escalania"
                            width={160}
                            height={32}
                            priority
                            style={{ width: 'auto', height: 32 }}
                        />
                    </Link>

                    <Box
                        component="nav"
                        aria-label="Navegación principal"
                        sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}
                    >
                        {ITEMS_NAVEGACION.map((item) =>
                            item.subitems ? (
                                <MenuDesplegable
                                    key={item.etiqueta}
                                    etiqueta={item.etiqueta}
                                    subitems={item.subitems}
                                    rutaActual={rutaActual}
                                />
                            ) : (
                                <Button
                                    key={item.etiqueta}
                                    variant="text"
                                    component={Link}
                                    href={item.href ?? '/'}
                                    sx={estilosEnlaceHeader(rutaActual === item.href)}
                                >
                                    {item.etiqueta}
                                </Button>
                            ),
                        )}

                        <Button href={CTA_HEADER.href} size="small" sx={{ ml: 2, minHeight: 44, px: 3, fontSize: '0.95rem' }}>
                            {CTA_HEADER.etiqueta}
                        </Button>
                    </Box>

                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <MenuMovil rutaActual={rutaActual} />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
