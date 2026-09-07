import { Box, Button, Container, Typography } from '@mui/material';
import { paletaMarca } from '@/ui/theme/colores';
import { FAQS, ID_FAQ_ABIERTA_POR_DEFECTO } from './Faqs.data';
import { ListaFaqs } from './ListaFaqs';

export default function Faqs() {
    return (
        <Box sx={{ px:{ xs: 1, md:4, lg: 12}, pb:{ xs: 6, md:8, lg: 16}, background: '#fff'}}>
            <Container maxWidth="md">
                
                <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 8 } }}>
                    <Typography variant="h3" component="h3" sx={{ mb: 2 }}>
                        Preguntas frecuentes
                    </Typography>

                </Box>

                <ListaFaqs faqs={FAQS} idAbiertaPorDefecto={ID_FAQ_ABIERTA_POR_DEFECTO} />

            </Container>
        </Box>
    );
}
