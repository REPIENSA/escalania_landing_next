import type { MetadataRoute } from "next";
import { RUTAS_PUBLICAS, URL_SITIO } from "@/infrastructure/seo/configuracionSitio";

export default function sitemap(): MetadataRoute.Sitemap {
    const ultimaActualizacion = new Date();

    return RUTAS_PUBLICAS.map((ruta) => ({
        url: `${URL_SITIO}${ruta === "/" ? "" : ruta}`,
        lastModified: ultimaActualizacion,
        changeFrequency: "monthly",
        priority: ruta === "/" ? 1 : 0.8,
    }));
}
