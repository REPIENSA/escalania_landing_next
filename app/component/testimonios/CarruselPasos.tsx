'use client';

import { Box, BoxProps } from '@mui/material';
import { ReactNode, Children, useMemo } from 'react';

interface CarruselPasosProps {
    children: ReactNode;
    /** Duración del deslizamiento de un item al siguiente. Default: 0.7s */
    duracionDeslizamiento?: number;
    /** Pausa entre cada paso. Default: 2s */
    pausa?: number;
    /** Gap entre items en unidades del theme. Default: 3 */
    gap?: number;
    sx?: BoxProps['sx'];
}

export function CarruselPasos({
    children,
    duracionDeslizamiento = 0.7,
    pausa = 2,
    gap = 3,
    sx,
}: CarruselPasosProps) {
    const items = Children.toArray(children);
    const n = items.length;

    // Tiempo por paso y duración total del ciclo
    const tiempoPorPaso = duracionDeslizamiento + pausa;
    const duracionTotal = tiempoPorPaso * n;

    // Generamos keyframes: cada paso desliza durante `duracionDeslizamiento`,
    // luego se queda quieto durante `pausa`
    const keyframes = useMemo(() => {
        const frames: Record<string, object> = {};
        const porcentajePaso = 100 / n;
        const porcentajeDeslizar =
            (duracionDeslizamiento / tiempoPorPaso) * porcentajePaso;

        for (let i = 0; i < n; i++) {
            const inicio = i * porcentajePaso;
            const finDeslizamiento = inicio + porcentajeDeslizar;

            // Posición al inicio del paso = i items desplazados
            frames[`${inicio.toFixed(4)}%`] = {
                transform: `translateX(calc(-${i} * (100% / ${n * 2}) - ${i} * var(--carrusel-gap-step)))`,
            };
            // Posición al final del deslizamiento = i+1 items desplazados
            frames[`${finDeslizamiento.toFixed(4)}%`] = {
                transform: `translateX(calc(-${i + 1} * (100% / ${n * 2}) - ${i + 1} * var(--carrusel-gap-step)))`,
            };
        }
        // Cierra el ciclo
        frames['100%'] = {
            transform: `translateX(calc(-${n} * (100% / ${n * 2}) - ${n} * var(--carrusel-gap-step)))`,
        };

        return frames;
    }, [n, duracionDeslizamiento, tiempoPorPaso]);

    return (
        <Box
            sx={[
                {
                    overflow: 'hidden',
                    width: '100%',
                    '--carrusel-gap-step': (theme) =>
                        `calc(${theme.spacing(gap)} / 2)`,
                    '@keyframes carrusel-pasos': keyframes,
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap,
                    width: 'max-content',
                    animation: `carrusel-pasos ${duracionTotal}s ease-in-out infinite`,
                }}
            >
                {[...items, ...items].map((item, i) => (
                    <Box
                        key={i}
                        sx={{ flexShrink: 0 }}
                        aria-hidden={i >= n ? 'true' : undefined}
                    >
                        {item}
                    </Box>
                ))}
            </Box>
        </Box>
    );
}