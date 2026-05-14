'use client';

import { Box, BoxProps } from '@mui/material';
import { ReactNode, Children } from 'react';

interface MarqueeProps {
    children: ReactNode;
    /** Velocidad en segundos (un ciclo completo). Default: 30 */
    velocidad?: number;
    /** Gap entre items en unidades del theme (1 = 8px). Default: 8 */
    gap?: number;
    /** Pausar la animación al hacer hover. Default: true */
    pausarEnHover?: boolean;
    /** Dirección del desfile. Default: 'izquierda' */
    direccion?: 'izquierda' | 'derecha';
    /** sx adicional para el contenedor externo */
    sx?: BoxProps['sx'];
}

export function Marquee({
    children,
    velocidad = 30,
    gap = 8,
    pausarEnHover = true,
    direccion = 'izquierda',
    sx,
}: MarqueeProps) {
    const items = Children.toArray(children);

    return (
        <Box
            sx={[
                {
                    overflow: 'hidden',
                    width: '100%',
                    '--marquee-gap': (theme) => theme.spacing(gap),
                    '@keyframes marquee-izquierda': {
                        from: { transform: 'translateX(0)' },
                        to: { transform: 'translateX(calc(-50% - var(--marquee-gap) / 2))' },
                    },
                    '@keyframes marquee-derecha': {
                        from: { transform: 'translateX(calc(-50% - var(--marquee-gap) / 2))' },
                        to: { transform: 'translateX(0)' },
                    },
                    ...(pausarEnHover && {
                        '&:hover .marquee-track': {
                            animationPlayState: 'paused',
                        },
                    }),
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            <Box
                className="marquee-track"
                sx={{
                    display: 'flex',
                    gap,
                    width: 'max-content',
                    animation: `marquee-${direccion} ${velocidad}s linear infinite`,
                }}
            >
                {[...items, ...items].map((item, i) => (
                    <Box
                        key={i}
                        sx={{ flexShrink: 0 }}
                        aria-hidden={i >= items.length ? 'true' : undefined}
                    >
                        {item}
                    </Box>
                ))}
            </Box>
        </Box>
    );
}