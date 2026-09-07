// infrastructure/seo/configuracionSitio.ts

/**
 * URL pública del sitio. La usan el sitemap, el robots.txt y las imágenes de
 * Open Graph, que necesitan URLs absolutas.
 */
export const URL_SITIO =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://escalania.com";

/** Rutas públicas que deben aparecer en el sitemap. Agrega aquí cada landing nueva. */
export const RUTAS_PUBLICAS = ["/"] as const;
