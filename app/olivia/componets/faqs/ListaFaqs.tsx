'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import { ItemFaq } from './ItemFaq';
import type { Faq } from './Faqs.data';

interface PropsListaFaqs {
    faqs: Faq[];
    /** Pregunta que arranca desplegada. */
    idAbiertaPorDefecto?: string;
}

export function ListaFaqs({ faqs, idAbiertaPorDefecto }: PropsListaFaqs) {
    // Varias pueden estar abiertas a la vez: es lo que hace útil "Expandir todo".
    const [abiertas, setAbiertas] = useState<string[]>(
        idAbiertaPorDefecto ? [idAbiertaPorDefecto] : []
    );

    const todasAbiertas = abiertas.length === faqs.length;

    const alternarUna = (id: string) => {
        setAbiertas((previas) =>
            previas.includes(id)
                ? previas.filter((abierta) => abierta !== id)
                : [...previas, id]
        );
    };

    const alternarTodas = () => {
        setAbiertas(todasAbiertas ? [] : faqs.map((faq) => faq.id));
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                <Button
                    variant="text"
                    onClick={alternarTodas}
                    endIcon={todasAbiertas ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
                    sx={{ minHeight: 'auto', py: 1 }}
                >
                    {todasAbiertas ? 'Contraer todo' : 'Expandir todo'}
                </Button>
            </Box>

            <Box sx={{ borderTop: '1px solid #DADCE0' }}>
                {faqs.map((faq) => (
                    <ItemFaq
                        key={faq.id}
                        faq={faq}
                        abierta={abiertas.includes(faq.id)}
                        onAlternar={alternarUna}
                    />
                ))}
            </Box>
        </Box>
    );
}
