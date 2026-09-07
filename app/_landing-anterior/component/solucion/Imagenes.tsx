import { Box } from '@mui/material';
import { CardCambiante } from '@/ui/componentes/cards/CardCambiante';
import { paletaMarca } from '@/ui/theme/colores';
import Image from 'next/image';

export default function Imagenes() {
    return (
        <CardCambiante
            colorBase={paletaMarca.principal}
            colorVisible={paletaMarca.textoPrincipal}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    minHeight: { xs: 200, md: 300, lg: 420 },
                }}
            >
                {/* Imagen superior izquierda */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '0%',
                        left: '0%',
                        width: '60%',
                        aspectRatio: '5 / 4',
                        overflow: 'hidden',
                        zIndex: 1,
                    }}
                >
                    <Image src="/imagenes/chat-whatsapp.svg" alt="Conversación de WhatsApp atendida por el agente" fill/>
                </Box>


                {/* Imagen inferior derecha */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '0%',
                        right: '0%',
                        width: '60%',
                        overflow: 'hidden',
                        zIndex: 2,
                        aspectRatio: '5 / 4',
                    }}
                >
                    <Image src="/imagenes/chat-messenger.svg" alt="Conversación de Messenger atendida por el agente" fill />
                </Box>
            </Box>
        </CardCambiante>
    );
}
