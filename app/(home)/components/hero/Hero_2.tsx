'use client';

import { useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PaymentsIcon from '@mui/icons-material/Payments';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import StorefrontIcon from '@mui/icons-material/Storefront';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InsightsIcon from '@mui/icons-material/Insights';
import MiniCard from './MiniCard';
import { paletaMarca } from '@/ui/theme/colores';

const CARDS = [
    { titulo: 'Atiende en WhatsApp', icono: <WhatsAppIcon /> },
    { titulo: 'Agenda citas 24/7', icono: <EventAvailableIcon /> },
    { titulo: 'Cobra por Yape o Plin', icono: <PaymentsIcon /> },
    { titulo: 'Responde dudas', icono: <QuestionAnswerIcon /> },
    { titulo: 'Explica tus servicios', icono: <StorefrontIcon /> },
    { titulo: 'Envía recordatorios', icono: <NotificationsActiveIcon /> },
    { titulo: 'Disponible 24/7', icono: <AccessTimeIcon /> },
    { titulo: 'Métricas de conversación', icono: <InsightsIcon /> },
];

/** Tira horizontal de mini cards con flechas de navegación, estilo "What's new" de Chrome. */
export default function Hero_2() {
    const pistaRef = useRef<HTMLDivElement>(null);

    const desplazar = (direccion: 1 | -1) => {
        const pista = pistaRef.current;
        if (!pista) return;
        pista.scrollBy({ left: direccion * pista.clientWidth * 0.8, behavior: 'smooth' });
    };

    return (
        <Box sx={{ position: 'relative' }}>
            <Box
                ref={pistaRef}
                sx={{
                    display: 'flex',
                    gap: 2,
                    overflowX: 'auto',
                    scrollbarWidth: 'none',
                    // fundido transparente en el borde derecho, debajo de las flechas
                    maskImage: 'linear-gradient(90deg, #000 82%, transparent 100%)',
                    '&::-webkit-scrollbar': { display: 'none' },
                    // espacio a la derecha para que las flechas no tapen la última card
                    pr: { xs: 14, md: 18 },
                    py: 1,
                }}
            >
                {CARDS.map((card) => (
                    <MiniCard key={card.titulo} {...card} />
                ))}
            </Box>

            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    pr: 1,
                    pointerEvents: 'none',
                }}
            >
                {[
                    { dir: -1 as const, Icono: ChevronLeftIcon, label: 'Anterior' },
                    { dir: 1 as const, Icono: ChevronRightIcon, label: 'Siguiente' },
                ].map(({ dir, Icono, label }) => (
                    <IconButton
                        key={label}
                        aria-label={label}
                        onClick={() => desplazar(dir)}
                        sx={{
                            pointerEvents: 'auto',
                            width: { xs: 44, md: 56 },
                            height: { xs: 44, md: 56 },
                            backgroundColor: paletaMarca.secundario,
                            color: '#fff',
                            boxShadow: '0 2px 8px rgba(0,0,0,.35)',
                            '&:hover': { backgroundColor: paletaMarca.secundario },
                        }}
                    >
                        <Icono />
                    </IconButton>
                ))}
            </Box>
        </Box>
    );
}
