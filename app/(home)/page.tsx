import { Box } from '@mui/material';
import Hero from './components/hero/Hero';
import { TopHeader } from '@/ui/componentes/TopHeader/TopHeader';

export const metadata = {
    title: 'Escalania | Agentes de IA para tu negocio',
    description: 'Agentes de Inteligencia Artificial que conversan con tus clientes, resuelven dudas y agendan citas por WhatsApp.',
};

/** Raíz del sitio. Marcador de posición mientras se construye la home. */
export default function HomePage() {
    return (
        <Box>
            <TopHeader />
            <Hero/>
        </Box>
    );
}
