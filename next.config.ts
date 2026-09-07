import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // La landing de Olivia pasó a ser la raíz del sitio. Mantenemos viva
        // la dirección anterior para no romper los enlaces ya compartidos.
        source: "/olivia",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
