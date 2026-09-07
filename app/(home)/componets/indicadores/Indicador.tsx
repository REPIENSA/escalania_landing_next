'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { paletaMarca } from '@/ui/theme/colores';
import type { DatoIndicador } from './Indicadores.data';

export type PropsIndicador = Omit<DatoIndicador, 'id'>;

const CONSULTA_MOVIMIENTO_REDUCIDO = '(prefers-reduced-motion: reduce)';

function suscribirseAMovimientoReducido(alCambiar: () => void) {
    const consulta = window.matchMedia(CONSULTA_MOVIMIENTO_REDUCIDO);
    consulta.addEventListener('change', alCambiar);
    return () => consulta.removeEventListener('change', alCambiar);
}

function leerMovimientoReducido(): boolean {
    return window.matchMedia(CONSULTA_MOVIMIENTO_REDUCIDO).matches;
}

/** Frenada al final: la cifra corre rápido y se asienta en el número real. */
const suavizar = (avance: number) => 1 - Math.pow(1 - avance, 3);

const DURACION_MS = 1400;

export function Indicador({ icono: Icono, prefijo, valor, sufijo, titulo }: PropsIndicador) {
    const ref = useRef<HTMLDivElement>(null);

    // Arranca en la cifra final a propósito: así el HTML que manda el servidor
    // ya trae el dato y quien no ejecute JS lo lee igual. El conteo lo pone a
    // cero al montar, justo antes de que la tarjeta entre en pantalla.
    const [valorMostrado, setValorMostrado] = useState(valor);

    // Con "reducir movimiento" activado el número se queda quieto en su cifra.
    // En el servidor no hay media query, así que ahí asumimos que sí hay animación.
    const sinAnimacion = useSyncExternalStore(
        suscribirseAMovimientoReducido,
        leerMovimientoReducido,
        () => false
    );

    useEffect(() => {
        if (sinAnimacion) return;

        const elemento = ref.current;
        if (!elemento) return;

        // En una pestaña de fondo requestAnimationFrame está en pausa: si
        // pusiéramos la cifra a cero, se quedaría en "+0" hasta que alguien
        // vuelva a la pestaña. Mejor no arrancar el conteo y dejar el dato.
        if (document.hidden) return;

        let cuadro = 0;
        let inicio = 0;

        // Bajar la cifra a cero es otro cambio de estado: hacerlo aquí mismo
        // encadenaría un render sobre el commit del efecto. Va en el siguiente
        // cuadro, que llega mucho antes de que la tarjeta entre en pantalla.
        const cuadroInicial = requestAnimationFrame(() => setValorMostrado(0));

        const contar = (ahora: number) => {
            if (!inicio) inicio = ahora;
            const avance = Math.min((ahora - inicio) / DURACION_MS, 1);
            setValorMostrado(Math.round(valor * suavizar(avance)));
            if (avance < 1) cuadro = requestAnimationFrame(contar);
        };

        const observador = new IntersectionObserver(
            ([entrada]) => {
                if (!entrada.isIntersecting) return;
                // Una sola vez: el número no vuelve a cero al salir de pantalla.
                observador.disconnect();

                if (document.hidden) {
                    setValorMostrado(valor);
                    return;
                }

                cuadro = requestAnimationFrame(contar);
            },
            { threshold: 0.4 }
        );

        observador.observe(elemento);

        return () => {
            observador.disconnect();
            cancelAnimationFrame(cuadroInicial);
            cancelAnimationFrame(cuadro);
        };
    }, [valor, sinAnimacion]);

    const cifraFinal = `${prefijo ?? ''}${valor.toLocaleString('es-PE')}${sufijo ?? ''}`;

    return (
        <Card
            ref={ref}
            sx={{
                backgroundColor: paletaMarca.fondo2,
                borderRadius: 5,
                boxShadow: 'none',
                width: '100%',
                height: '100%',
                transition: 'transform 0.25s ease',
                transform: 'translateY(0)',
                '&:hover': {
                    transform: 'translateY(-12px)',
                },
            }}
        >
            <CardContent
                sx={{
                    px: { xs: 3, md: 4 },
                    py: { xs: 3, md: 5 },
                    '&:last-child': { pb: { xs: 5 } },
                }}
            >
                <Icono sx={{ fontSize: 50 }} />

                <Typography
                    variant="h3"
                    component="p"
                    aria-hidden="true"
                    sx={{
                        my: 1,
                        fontWeight: 800,
                    }}
                >
                    {prefijo}
                    {valorMostrado.toLocaleString('es-PE')}
                    {sufijo}
                </Typography>

                {/* El lector de pantalla recibe la cifra real, no la del conteo. */}
                <Box component="span" sx={visuallyHidden}>
                    {cifraFinal}
                </Box>

                <Typography variant="h6">
                    {titulo}
                </Typography>
            </CardContent>
        </Card>
    );
}
