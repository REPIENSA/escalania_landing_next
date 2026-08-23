import { ImageResponse } from "next/og";
import { paletaMarca } from "@/ui/theme/colores";

export const alt = "Escalania · Agentes de IA para WhatsApp, Instagram y Facebook";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "80px",
                    backgroundColor: paletaMarca.principal,
                    color: "#fff",
                    fontFamily: "sans-serif",
                }}
            >
                <div style={{ fontSize: 40, fontWeight: 700, opacity: 0.85 }}>
                    Escalania
                </div>

                <div
                    style={{
                        fontSize: 76,
                        fontWeight: 800,
                        lineHeight: 1.15,
                        marginTop: 28,
                    }}
                >
                    Agente de IA para WhatsApp, Instagram y Facebook
                </div>

                <div style={{ fontSize: 36, marginTop: 32, opacity: 0.85 }}>
                    Atiende, resuelve y agenda 24/7.
                </div>
            </div>
        ),
        size
    );
}
