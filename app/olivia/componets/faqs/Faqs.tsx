import { Box, Button, Container, Typography } from '@mui/material';
import { paletaMarca } from '@/ui/theme/colores';
import { FAQS, ID_FAQ_ABIERTA_POR_DEFECTO } from './Faqs.data';
import { ListaFaqs } from './ListaFaqs';

/**
 * Datos estructurados de FAQPage. Salen del mismo array que la UI, así que la
 * pregunta que ve Google es siempre la que ve el visitante.
 * https://schema.org/FAQPage
 */
const datosEstructurados = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.pregunta,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.respuesta,
        },
    })),
};

export default function Faqs() {
    return (
        <Box
            component="section"
            sx={{
                px: { xs: 1, md: 4, lg: 12 },
                py: { xs: 6, md: 8, lg: 12 },
                background: '#fff',
            }}
        >
            {/* Structured data: sin efecto visual, habilita el resultado
                enriquecido de preguntas frecuentes en Google. */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(datosEstructurados).replace(/</g, '\\u003c'),
                }}
            />

            <Container maxWidth="md">
                <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
                    <Typography variant="h3" component="h2" sx={{ mb: 2 }}>
                        ¿Quieres saber más sobre Olivia?
                    </Typography>

                    <Typography variant="h6" sx={{ color: paletaMarca.textoSecundario }}>
                        Estas son las preguntas que más nos hacen antes de empezar.
                    </Typography>
                </Box>

                <ListaFaqs faqs={FAQS} idAbiertaPorDefecto={ID_FAQ_ABIERTA_POR_DEFECTO} />

            </Container>
        </Box>
    );
}
