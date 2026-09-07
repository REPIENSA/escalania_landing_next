import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { paletaMarca } from '@/ui/theme/colores';
import type { Faq } from './Faqs.data';

interface PropsItemFaq {
    faq: Faq;
    abierta: boolean;
    onAlternar: (id: string) => void;
}

/**
 * Una fila del acordeón. No guarda estado: quién está abierto lo decide
 * ListaFaqs, que es la única que necesita saberlo para "Expandir todo".
 */
export function ItemFaq({ faq, abierta, onAlternar }: PropsItemFaq) {
    return (
        <Accordion
            expanded={abierta}
            onChange={() => onAlternar(faq.id)}
            disableGutters
            square
            elevation={0}
            sx={{
                backgroundColor: 'transparent',
                borderBottom: '1px solid #DADCE0',
                '&::before': { display: 'none' },
            }}
        >
            <AccordionSummary
                expandIcon={
                    <ExpandMoreIcon sx={{ color: paletaMarca.principal, fontSize: 28 }} />
                }
                aria-controls={`respuesta-${faq.id}`}
                id={`pregunta-${faq.id}`}
                sx={{
                    px: 0,
                    py: 1.5,
                    '& .MuiAccordionSummary-content': { my: 1.5, pr: 2 },
                }}
            >
                <Typography
                    component="span"
                    sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, fontWeight: 500 }}
                >
                    {faq.pregunta}
                </Typography>
            </AccordionSummary>

            <AccordionDetails id={`respuesta-${faq.id}`} sx={{ px: 0, pt: 0, pb: 3, pr: { md: 6 } }}>
                <Typography sx={{ color: paletaMarca.textoSecundario }}>
                    {faq.respuesta}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
}
