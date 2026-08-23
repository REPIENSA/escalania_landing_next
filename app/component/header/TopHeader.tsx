import { Box, Container } from '@mui/material';
import Image from 'next/image';

export default function TopHeader() {
    return (
        <Box sx={{ py: { xs: 2, md: 3, lg: 3 }, borderBottom: '1px solid #fff', }}>
            <Container maxWidth="xl">
                <Box
                    sx={{
                        position: 'relative',
                        width: { xs: 150, md: 180 },
                        height: { xs: 28, md: 36 },
                        mx: 'auto',           // 👈 centra horizontalmente
                    }}
                >
                    <Image
                        src="/imagenes/logotipo-escalania.svg"
                        alt="Escalania"
                        fill
                        style={{ objectFit: 'contain' }}
                        priority
                    />
                </Box>
            </Container>
        </Box>
    );
}
