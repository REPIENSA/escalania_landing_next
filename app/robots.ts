import type { MetadataRoute } from "next";
import { URL_SITIO } from "@/infrastructure/seo/configuracionSitio";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            // /olivia-gracias solo tiene sentido después de enviar el formulario.
            disallow: ["/api/", "/olivia-gracias"],
        },
        sitemap: `${URL_SITIO}/sitemap.xml`,
    };
}
