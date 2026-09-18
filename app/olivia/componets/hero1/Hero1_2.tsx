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

/** Cantos metálicos: más claros en el centro, como el aluminio pulido. */
const BOTON_LATERAL_DEGRADADO =
    'linear-gradient(180deg, #B8B8BF 0%, #E8E8EC 45%, #B8B8BF 100%)';

/** Volumen y encendido, en las posiciones de un iPhone. */
const BOTONES_LATERALES = [
    { id: 'silencio', lado: 'left' as const, top: 96, alto: 28 },
    { id: 'volumen-mas', lado: 'left' as const, top: 140, alto: 52 },
    { id: 'volumen-menos', lado: 'left' as const, top: 204, alto: 52 },
    { id: 'encendido', lado: 'right' as const, top: 164, alto: 80 },
];

/** Hora del sistema del celular. Coincide con el titular del Hero 1. */
const HORA_SISTEMA = '11:01';

interface MensajeChat {
    de: 'olivia' | 'clienta';
    texto: string;
    hora: string;
}

const GUION: MensajeChat[] = [
    { de: 'clienta', texto: 'Hola, ¿hacen limpieza facial profunda?', hora: '11:01 p.m.' },
    { de: 'olivia', texto: '👋 Hola Stephanie, Sí hacemos limpiezas faciales profundas.', hora: '11:01 p.m.' },
     { de: 'olivia', texto: '¿Es tu primera vez con nosotros?', hora: '11:01 p.m.' },
    { de: 'clienta', texto: 'Sí. Tengo la piel súper sensible, no sé si me caiga bien', hora: '11:02 p.m.' },
    { de: 'olivia', texto: 'Con piel sensible trabajamos una versión sin extracción manual. Queda igual de limpia y no te deja roja al día siguiente.', hora: '11:02 p.m.' },
    { de: 'olivia', texto: '¿Te gustarpía agendar para mañana?', hora: '11:02 p.m.' },
    { de: 'clienta', texto: 'Sí, Mañana 4pm', hora: '11:03 p.m.' },
    { de: 'olivia', texto: '👍 Listo, te puedo reservar para mañana a las 4:00 p.m.', hora: '11:03 p.m.' },
    { de: 'olivia', texto: 'Te comento, para reservar esa necesario un adelanto de S/ 30', hora: '11:03 p.m.' },
        { de: 'olivia', texto: '📌 Puedes pagar por yape o plin al 987 654 321', hora: '11:03 p.m.' },
    { de: 'clienta', texto: 'Ya está el pago por yape, te envio la captura', hora: '11:04 p.m.' },
    { de: 'olivia', texto: '¡Recibido Stephanie! ✅ Cita confirmada mañana 4:00 p.m.', hora: '11:04 p.m.' },
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
                {/* Botones laterales. Cuelgan del contenedor exterior y no del
                    marco, que recorta a sus hijos con el borde redondeado. */}
                {BOTONES_LATERALES.map((boton) => (
                    <Box
                        key={boton.id}
                        aria-hidden="true"
                        sx={{
                            position: 'absolute',
                            top: boton.top,
                            height: boton.alto,
                            width: 3,
                            [boton.lado]: -3,
                            borderRadius:
                                boton.lado === 'left' ? '2px 0 0 2px' : '0 2px 2px 0',
                            background: BOTON_LATERAL_DEGRADADO,
                            zIndex: 1,
                        }}
                    />
                ))}

                {/* Marco del celular */}
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        background:
                            'linear-gradient(145deg, #F2F2F4 0%, #C9C9CF 18%, #E4E4E8 50%, #BFBFC6 82%, #EDEDF0 100%)',
                        borderRadius: '46px',
                        p: '5px',
                        boxShadow:
                            '0 30px 60px rgba(0, 0, 0, 0.28),' +
                            ' 0 0 0 1px rgba(0, 0, 0, 0.35),' +
                            ' inset 0 0 0 1px rgba(0, 0, 0, 0.22),' +
                            ' inset 0 1px 1px rgba(255, 255, 255, 0.55)',
                    }}
                >
                    {/* Pantalla */}
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            borderRadius: '41px',
                            border: '2px solid #000',
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
                                width: 76,
                                height: 20,
                                borderRadius: '999px',
                                backgroundColor: '#000',
                                zIndex: 5,
                            }}
                        />

                        {/* Reflejo del vidrio. Va encima de todo, incluida la isla:
                            el cristal es una sola pieza que cubre la pantalla entera.
                            No captura el ratón para no estorbar al contenido. */}
                        <Box
                            aria-hidden="true"
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                borderRadius: '39px',
                                pointerEvents: 'none',
                                zIndex: 6,
                                background: [
                                    // Cuña de luz con el canto cortado en seco. Es el corte
                                    // nítido —no el brillo— lo que el ojo lee como vidrio;
                                    // un degradado suave solo parece neblina.
                                    'linear-gradient(197deg,' +
                                        ' rgba(255, 255, 255, 0.17) 0%,' +
                                        ' rgba(255, 255, 255, 0.09) 27%,' +
                                        ' rgba(255, 255, 255, 0.09) 32.6%,' +
                                        ' rgba(255, 255, 255, 0) 33%)',
                                    // Filo encendido justo encima del corte, donde la luz
                                    // roza el canto del cristal.
                                    'linear-gradient(197deg,' +
                                        ' transparent 29.5%,' +
                                        ' rgba(255, 255, 255, 0.26) 32.2%,' +
                                        ' rgba(255, 255, 255, 0) 33%)',
                                    // Segundo reflejo, más abajo y mucho más tenue: el
                                    // espesor del vidrio devuelve la misma luz dos veces.
                                    'linear-gradient(197deg,' +
                                        ' transparent 52%,' +
                                        ' rgba(255, 255, 255, 0.07) 55%,' +
                                        ' rgba(255, 255, 255, 0) 58%)',
                                    // Cantos laterales: el vidrio curvo devuelve una línea
                                    // de luz contra el aluminio.
                                    'linear-gradient(90deg,' +
                                        ' rgba(255, 255, 255, 0.20) 0px,' +
                                        ' rgba(255, 255, 255, 0) 5px)',
                                    'linear-gradient(270deg,' +
                                        ' rgba(255, 255, 255, 0.12) 0px,' +
                                        ' rgba(255, 255, 255, 0) 4px)',
                                    // Halo frío de la fuente de luz, fuera de cuadro.
                                    'radial-gradient(115% 75% at 4% -14%,' +
                                        ' rgba(206, 227, 255, 0.30) 0%,' +
                                        ' rgba(206, 227, 255, 0.06) 40%,' +
                                        ' transparent 68%)',
                                    // Rebote cálido del ambiente por la esquina opuesta.
                                    'radial-gradient(85% 55% at 106% 112%,' +
                                        ' rgba(255, 236, 210, 0.14) 0%,' +
                                        ' transparent 55%)',
                                    // Viñeta: el canto curvo apaga la luz en el perímetro.
                                    'radial-gradient(140% 115% at 50% 45%,' +
                                        ' transparent 54%,' +
                                        ' rgba(0, 0, 0, 0.13) 100%)',
                                ].join(', '),
                                // Canto del cristal: luz arriba, sombra abajo.
                                boxShadow:
                                    'inset 0 1px 1.5px rgba(255, 255, 255, 0.6),' +
                                    ' inset 0 -1px 2px rgba(0, 0, 0, 0.2)',
                            }}
                        />

                        {/* Barra de estado + cabecera del chat */}
                        <Box sx={{ backgroundColor: WHATSAPP.header, color: '#fff', flexShrink: 0 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    px: 4.5,
                                    pt: 1,
                                    pb: 0.25,
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

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.5, pb: 0.75 }}>
                                <ArrowBackIosNewIcon sx={{ fontSize: 16, opacity: 0.9 }} />

                                <Box
                                    aria-hidden="true"
                                    sx={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        color: WHATSAPP.header,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 700,
                                        fontSize: 13,
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
                                px: '12px',
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
                                            maxWidth: '82%',
                                            mt: abreTanda && indice !== 0 ? 0.75 : 0,
                                            backgroundColor: esDeOlivia
                                                ? WHATSAPP.burbujaOlivia
                                                : WHATSAPP.burbujaClienta,
                                            color: WHATSAPP.texto,
                                            borderRadius: '8px',
                                            px: 1.25,
                                            py: 0.6,
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
                                            sx={{
                                                fontSize: 13.5,
                                                lineHeight: 1.38,
                                                // Contiene el float de la hora: sin esto la
                                                // burbuja no crece cuando la hora se baja
                                                // a una línea propia.
                                                display: 'flow-root',
                                            }}
                                        >
                                            {mensaje.texto}
                                            {/* Como en WhatsApp: la hora se acomoda al final
                                                de la última línea, y solo baja si no cabe. */}
                                            <Box
                                                component="span"
                                                sx={{
                                                    float: 'right',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: 0.4,
                                                    ml: 1,
                                                    mt: '6px',
                                                    fontSize: 10,
                                                    color: WHATSAPP.hora,
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                {mensaje.hora}
                                                {!esDeOlivia && (
                                                    <DoneAllIcon
                                                        sx={{ fontSize: 14, color: WHATSAPP.check }}
                                                    />
                                                )}
                                            </Box>
                                        </Typography>
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

                        {/* Barra de gestos del sistema */}
                        <Box
                            aria-hidden="true"
                            sx={{
                                flexShrink: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                pb: 1,
                                backgroundColor: WHATSAPP.fondoChat,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 115,
                                    height: 3,
                                    borderRadius: '999px',
                                    backgroundColor: 'rgba(17, 27, 33, 0.35)',
                                }}
                            />
                        </Box>
                    </Box>
                </Box>

            </Box>
        </Box>
    );
}
