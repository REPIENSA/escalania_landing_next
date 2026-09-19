// infrastructure/analitica/metaPixel.ts

/**
 * Identificador del conjunto de datos (píxel) de Meta. Se lee de una variable
 * pública porque el píxel corre en el navegador. Si está vacío, no se carga nada.
 */
export const ID_META_PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

/**
 * Eventos estándar de Meta que usamos.
 * - PageView: toda página (lo dispara el layout).
 * - ViewContent: vio la landing de Olivia.
 * - Lead: llegó a la página de gracias tras enviar el formulario.
 */
export type EventoMetaPixel = "PageView" | "ViewContent" | "Lead";

type FuncionFbq = ((...args: unknown[]) => void) & {
    callMethod?: (...args: unknown[]) => void;
    queue: unknown[];
    loaded: boolean;
    version: string;
    push: (...args: unknown[]) => void;
};

declare global {
    interface Window {
        fbq?: FuncionFbq;
        _fbq?: FuncionFbq;
    }
}

const URL_SCRIPT = "https://connect.facebook.net/en_US/fbevents.js";

/**
 * Equivalente al snippet oficial de Meta, escrito en TypeScript. Crea la
 * función `fbq` (que encola llamadas hasta que carga fbevents.js), hace el
 * `init` con nuestro píxel e inyecta el script. Es idempotente: se puede
 * llamar desde cualquier componente sin riesgo de inicializar dos veces.
 */
export function asegurarMetaPixel(): boolean {
    if (typeof window === "undefined" || !ID_META_PIXEL) return false;
    if (window.fbq) return true;

    const fbq = function (...args: unknown[]) {
        if (fbq.callMethod) {
            fbq.callMethod(...args);
        } else {
            fbq.queue.push(args);
        }
    } as FuncionFbq;
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.push = fbq;

    window.fbq = fbq;
    window._fbq = fbq;

    fbq("init", ID_META_PIXEL);

    const script = document.createElement("script");
    script.async = true;
    script.src = URL_SCRIPT;
    document.head.appendChild(script);

    return true;
}

/** Envía un evento estándar al píxel. No hace nada si el píxel no está configurado. */
export function registrarEventoMetaPixel(evento: EventoMetaPixel): void {
    if (!asegurarMetaPixel()) return;
    window.fbq?.("track", evento);
}
