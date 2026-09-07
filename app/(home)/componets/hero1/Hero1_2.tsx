'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Box, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VideocamIcon from '@mui/icons-material/Videocam';
import CallIcon from '@mui/icons-material/Call';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SendIcon from '@mui/icons-material/Send';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import WifiIcon from '@mui/icons-material/Wifi';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';

/** Paleta de WhatsApp. No son colores de marca: son los de la app que imitamos. */
const WHATSAPP = {
    header: '#008069',
    fondoChat: '#EFE7DE',
    burbujaOlivia: '#FFFFFF',
    burbujaClienta: '#D9FDD3',
    texto: '#111B21',
    hora: '#667781',
    check: '#53BDEB',
    botonEnviar: '#00A884',
};

/** Hora del sistema del celular. Coincide con el titular del Hero 1. */
const HORA_SISTEMA = '11:01';

interface MensajeChat {
    de: 'olivia' | 'clienta';
    texto: string;
    hora: string;
}

const GUION: MensajeChat[] = [
    { de: 'clienta', texto: 'Hola, ¿hacen limpieza facial profunda?', hora: '11:01 p.m.' },
    { de: 'olivia', texto: '¡Hola! Sí 😊 Dura 1:30 min y cuesta S/ 120. ¿Es tu primera vez con nosotros?', hora: '11:01 p.m.' },
    { de: 'clienta', texto: 'Sí. Tengo la piel súper sensible, no sé si me caiga bien', hora: '11:02 p.m.' },
    { de: 'olivia', texto: 'Con piel sensible trabajamos una versión sin extracción manual. Queda igual de limpia y no te deja roja al día siguiente.', hora: '11:02 p.m.' },
    { de: 'olivia', texto: '¿Estaría bien mañana?', hora: '11:02 p.m.' },
    { de: 'clienta', texto: 'Sí, Mañana 4pm', hora: '11:03 p.m.' },
    { de: 'olivia', texto: 'Listo, te reservo mañana a las 4:00 p.m. Para reservar esa necesario S/ 30 de adelanto por Yape al 987 654 321 📲', hora: '11:03 p.m.' },
    { de: 'clienta', texto: 'Ya esta el yape', hora: '11:04 p.m.' },
    { de: 'olivia', texto: '¡Recibido! ✅ Cita confirmada mañana 4:00 p.m.', hora: '11:04 p.m.' },
];

const PAUSA_ANTES_DE_LA_CLIENTA = 900;
const PAUSA_TRAS_MENSAJE = 420;
const PAUSA_ANTES_DE_REINICIAR = 4500;

/** Olivia "tarda" en escribir en proporción al largo del mensaje, entre 1 y 2 s. */
function duracionEscribiendo(texto: string): number {
    return Math.min(1000 + texto.length * 14, 2000);
}

type EventoChat = {
    tipo: 'espera' | 'escribe' | 'mensaje';
    duracion: number;
};

/**
 * La animación es una secuencia fija: esperar, escribir, mostrar mensaje.
 * Precalcularla deja un único estado —el evento actual— en vez de encadenar
 * temporizadores que se pisan entre sí.
 */
const LINEA_DE_TIEMPO: EventoChat[] = [
    ...GUION.flatMap((mensaje): EventoChat[] =>
        mensaje.de === 'clienta'
            ? [
                { tipo: 'espera', duracion: PAUSA_ANTES_DE_LA_CLIENTA },
                { tipo: 'mensaje', duracion: PAUSA_TRAS_MENSAJE },
            ]
            : [
                { tipo: 'escribe', duracion: duracionEscribiendo(mensaje.texto) },
                { tipo: 'mensaje', duracion: PAUSA_TRAS_MENSAJE },
            ]
    ),
    { tipo: 'espera', duracion: PAUSA_ANTES_DE_REINICIAR },
];

/** Cuántos mensajes están a la vista durante cada evento. */
const MENSAJES_A_LA_VISTA: number[] = LINEA_DE_TIEMPO.map(
    (_, indice) =>
        LINEA_DE_TIEMPO.slice(0, indice + 1).filter(
            (evento) => evento.tipo === 'mensaje'
        ).length
);

const CONSULTA_MOVIMIENTO_REDUCIDO = '(prefers-reduced-motion: reduce)';

function suscribirseAMovimientoReducido(alCambiar: () => void) {
    const consulta = window.matchMedia(CONSULTA_MOVIMIENTO_REDUCIDO);
    consulta.addEventListener('change', alCambiar);
    return () => consulta.removeEventListener('change', alCambiar);
}

function leerMovimientoReducido(): boolean {
    return window.matchMedia(CONSULTA_MOVIMIENTO_REDUCIDO).matches;
}

export default function Hero1_2() {
    const [evento, setEvento] = useState(0);
    const chatRef = useRef<HTMLDivElement>(null);

    // Con "reducir movimiento" activado mostramos la conversación completa y
    // quieta: el bucle sería justo lo que el visitante pidió no ver. En el
    // servidor no hay media query, así que ahí asumimos que sí hay animación.
    const sinAnimacion = useSyncExternalStore(
        suscribirseAMovimientoReducido,
        leerMovimientoReducido,
        () => false
    );

    useEffect(() => {
        if (sinAnimacion) return;

        const temporizador = setTimeout(() => {
            setEvento((actual) => (actual + 1) % LINEA_DE_TIEMPO.length);
        }, LINEA_DE_TIEMPO[evento].duracion);

        return () => clearTimeout(temporizador);
    }, [evento, sinAnimacion]);

    // El chat sigue al último mensaje a medida que se llena.
    useEffect(() => {
        const contenedor = chatRef.current;
        if (!contenedor) return;

        contenedor.scrollTo({
            top: contenedor.scrollHeight,
            behavior: sinAnimacion ? 'auto' : 'smooth',
        });
    }, [evento, sinAnimacion]);

    const escribiendo = !sinAnimacion && LINEA_DE_TIEMPO[evento].tipo === 'escribe';
    const mensajes = sinAnimacion
        ? GUION
        : GUION.slice(0, MENSAJES_A_LA_VISTA[evento]);

    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                // Aire para que la etiqueta flotante no se salga del contenedor.
                px: { xs: 3, sm: 4 },
                py: 2,
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: { xs: 324, sm: 324 },
                    height: { xs: 576, sm: 576 },
                    flexShrink: 0,
                }}
            >
                {/* Marco del celular */}
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#0B0B0C',
                        borderRadius: '46px',
                        p: '10px',
                        boxShadow:
                            '0 30px 60px rgba(0, 0, 0, 0.28), 0 0 0 2px rgba(255, 255, 255, 0.06) inset',
                    }}
                >
                    {/* Pantalla */}
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            borderRadius: '38px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: WHATSAPP.fondoChat,
                        }}
                    >
                        {/* Isla dinámica */}
                        <Box
                            aria-hidden="true"
                            sx={{
                                position: 'absolute',
                                top: 10,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: 86,
                                height: 22,
                                borderRadius: '999px',
                                backgroundColor: '#000',
                                zIndex: 5,
                            }}
                        />

                        {/* Barra de estado + cabecera del chat */}
                        <Box sx={{ backgroundColor: WHATSAPP.header, color: '#fff', flexShrink: 0 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    px: 2.5,
                                    pt: 1.5,
                                    pb: 0.5,
                                    fontSize: 12,
                                    fontWeight: 600,
                                }}
                            >
                                <Box component="span">{HORA_SISTEMA}</Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <SignalCellularAltIcon sx={{ fontSize: 14 }} />
                                    <WifiIcon sx={{ fontSize: 14 }} />
                                    <BatteryFullIcon sx={{ fontSize: 14, transform: 'rotate(90deg)' }} />
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.5, pb: 1.25 }}>
                                <ArrowBackIosNewIcon sx={{ fontSize: 16, opacity: 0.9 }} />

                                <Box
                                    aria-hidden="true"
                                    sx={{
                                        width: 38,
                                        height: 38,
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        color: WHATSAPP.header,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 700,
                                        fontSize: 17,
                                        flexShrink: 0,
                                    }}
                                >
                                    O
                                </Box>

                                <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                                    <Box sx={{ fontSize: 15, fontWeight: 600, lineHeight: 1.2 }}>
                                        Olivia
                                    </Box>
                                    <Box
                                        sx={{
                                            fontSize: 11.5,
                                            opacity: 0.85,
                                            lineHeight: 1.3,
                                            height: 15,
                                        }}
                                    >
                                        {escribiendo ? 'escribiendo…' : 'en línea'}
                                    </Box>
                                </Box>

                                <VideocamIcon sx={{ fontSize: 19, opacity: 0.9 }} />
                                <CallIcon sx={{ fontSize: 17, opacity: 0.9 }} />
                                <MoreVertIcon sx={{ fontSize: 18, opacity: 0.9 }} />
                            </Box>
                        </Box>

                        {/* Conversación */}
                        <Box
                            ref={chatRef}
                            sx={{
                                flexGrow: 1,
                                overflowY: 'auto',
                                px: 1.5,
                                py: 1.5,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 0.5,
                                // Ocultamos la barra de scroll: un celular no la muestra.
                                scrollbarWidth: 'none',
                                '&::-webkit-scrollbar': { display: 'none' },
                            }}
                        >
                            <Box
                                sx={{
                                    alignSelf: 'center',
                                    backgroundColor: '#FFF6D5',
                                    color: '#5B5643',
                                    fontSize: 10.5,
                                    px: 1.5,
                                    py: 0.6,
                                    borderRadius: '8px',
                                    mb: 1,
                                    textAlign: 'center',
                                    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.08)',
                                }}
                            >
                                Los mensajes están cifrados de extremo a extremo
                            </Box>

                            {mensajes.map((mensaje, indice) => {
                                const esDeOlivia = mensaje.de === 'olivia';
                                // Marca el primero de cada tanda: solo separa visualmente los turnos.
                                const abreTanda =
                                    indice === 0 || GUION[indice - 1].de !== mensaje.de;

                                return (
                                    <Box
                                        key={`${mensaje.hora}-${indice}`}
                                        sx={{
                                            position: 'relative',
                                            alignSelf: esDeOlivia ? 'flex-start' : 'flex-end',
                                            maxWidth: '80%',
                                            mt: abreTanda && indice !== 0 ? 0.75 : 0,
                                            backgroundColor: esDeOlivia
                                                ? WHATSAPP.burbujaOlivia
                                                : WHATSAPP.burbujaClienta,
                                            color: WHATSAPP.texto,
                                            borderRadius: '8px',
                                            px: 1.25,
                                            pt: 0.75,
                                            pb: 0.5,
                                            boxShadow: '0 1px 0.5px rgba(11, 20, 26, 0.13)',
                                            animation: sinAnimacion
                                                ? 'none'
                                                : 'aparecer-mensaje 0.28s ease-out both',
                                            '@keyframes aparecer-mensaje': {
                                                from: {
                                                    opacity: 0,
                                                    transform: 'translateY(8px) scale(0.97)',
                                                },
                                                to: { opacity: 1, transform: 'translateY(0) scale(1)' },
                                            },
                                        }}
                                    >
                                        <Typography
                                            component="p"
                                            sx={{ fontSize: 13.5, lineHeight: 1.38 }}
                                        >
                                            {mensaje.texto}
                                        </Typography>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'flex-end',
                                                gap: 0.4,
                                                mt: 0.2,
                                            }}
                                        >
                                            <Box
                                                component="span"
                                                sx={{ fontSize: 10, color: WHATSAPP.hora }}
                                            >
                                                {mensaje.hora}
                                            </Box>
                                            {!esDeOlivia && (
                                                <DoneAllIcon
                                                    sx={{ fontSize: 14, color: WHATSAPP.check }}
                                                />
                                            )}
                                        </Box>
                                    </Box>
                                );
                            })}

                            {/* Burbuja de "escribiendo…" */}
                            {escribiendo && (
                                <Box
                                    aria-hidden="true"
                                    sx={{
                                        alignSelf: 'flex-start',
                                        backgroundColor: WHATSAPP.burbujaOlivia,
                                        borderRadius: '8px',
                                        px: 1.5,
                                        py: 1.1,
                                        mt: 0.75,
                                        display: 'flex',
                                        gap: 0.6,
                                        boxShadow: '0 1px 0.5px rgba(11, 20, 26, 0.13)',
                                    }}
                                >
                                    {[0, 1, 2].map((punto) => (
                                        <Box
                                            key={punto}
                                            sx={{
                                                width: 6,
                                                height: 6,
                                                borderRadius: '50%',
                                                backgroundColor: '#9AA5AC',
                                                animation: 'rebote-punto 1.2s ease-in-out infinite',
                                                animationDelay: `${punto * 0.16}s`,
                                                '@keyframes rebote-punto': {
                                                    '0%, 60%, 100%': {
                                                        opacity: 0.35,
                                                        transform: 'translateY(0)',
                                                    },
                                                    '30%': { opacity: 1, transform: 'translateY(-4px)' },
                                                },
                                            }}
                                        />
                                    ))}
                                </Box>
                            )}
                        </Box>

                        {/* Barra de escritura */}
                        <Box
                            sx={{
                                flexShrink: 0,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                px: 1,
                                py: 1,
                                pb: 2,
                                backgroundColor: WHATSAPP.fondoChat,
                            }}
                        >
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    backgroundColor: '#fff',
                                    borderRadius: '999px',
                                    px: 1.5,
                                    py: 1,
                                    color: '#8696A0',
                                }}
                            >
                                <SentimentSatisfiedAltIcon sx={{ fontSize: 20 }} />
                                <Box component="span" sx={{ flexGrow: 1, fontSize: 13.5 }}>
                                    Mensaje
                                </Box>
                                <AttachFileIcon sx={{ fontSize: 19, transform: 'rotate(45deg)' }} />
                                <PhotoCameraIcon sx={{ fontSize: 19 }} />
                            </Box>

                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    backgroundColor: WHATSAPP.botonEnviar,
                                    color: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                }}
                            >
                                <SendIcon sx={{ fontSize: 19, ml: '2px' }} />
                            </Box>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </Box>
    );
}
