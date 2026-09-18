"use client";

import { useEffect, useRef } from "react";
import {
    registrarEventoMetaPixel,
    type EventoMetaPixel as NombreEvento,
} from "@/infrastructure/analitica/metaPixel";

interface PropsEventoMetaPixel {
    evento: NombreEvento;
}

/**
 * Registra un evento del píxel al montarse. Úsalo en páginas de conversión,
 * por ejemplo `<EventoMetaPixel evento="Lead" />` en la página de gracias.
 */
export function EventoMetaPixel({ evento }: PropsEventoMetaPixel) {
    // Evita registrar dos veces el mismo evento (React en desarrollo monta los efectos dos veces).
    const ultimoEventoRegistrado = useRef<NombreEvento | null>(null);

    useEffect(() => {
        if (ultimoEventoRegistrado.current === evento) return;
        ultimoEventoRegistrado.current = evento;
        registrarEventoMetaPixel(evento);
    }, [evento]);

    return null;
}
