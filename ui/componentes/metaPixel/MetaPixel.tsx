"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { registrarEventoMetaPixel } from "@/infrastructure/analitica/metaPixel";

/**
 * Carga el píxel de Meta y registra un `PageView` en cada cambio de ruta.
 * Va en el layout raíz: el snippet oficial solo dispara PageView al cargar la
 * página, pero las navegaciones de Next (router.push, <Link>) no recargan.
 */
export function MetaPixel() {
    const pathname = usePathname();
    // Evita registrar dos veces la misma ruta (React en desarrollo monta los efectos dos veces).
    const ultimaRutaRegistrada = useRef<string | null>(null);

    useEffect(() => {
        if (ultimaRutaRegistrada.current === pathname) return;
        ultimaRutaRegistrada.current = pathname;
        registrarEventoMetaPixel("PageView");
    }, [pathname]);

    return null;
}
