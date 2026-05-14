'use client';
import { Box } from '@mui/material';
import { CardCambiante } from '@/ui/componentes/cards/CardCambiante';
import { useTheme } from "@mui/material/styles";
import Image from 'next/image';

export default function Imagenes() {
    const theme = useTheme();
    
    return (
        <CardCambiante 
            colorBase={theme.palette.marca.principal} 
            colorVisible={theme.palette.text.primary}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    minHeight: 420,
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
                    <Image
                        src="/imagenes/chat-whatsapp.svg"
                        alt="Imagen 1"
                        fill
                    />
                </Box>


                {/* Imagen inferior derecha */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '0%',
                        right: '0%',
                        width: '50%',
                        overflow: 'hidden',
                        zIndex: 2,
                        aspectRatio: '5 / 4',
                    }}
                >
                    <Image
                        src="/imagenes/chat-messenger.svg"
                        alt="Imagen 2"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </Box>
            </Box>
        </CardCambiante>              
    );
}