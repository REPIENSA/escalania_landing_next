// src/infrastructure/contacto/mappers/mapSolicitudContactoAGmailHtml.ts

import { SolicitudContacto } from "@/domain/contacto/entities/SolicitudContacto";

function escaparHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export function mapSolicitudContactoAGmailHtml(
    solicitudContacto: SolicitudContacto
): string {
    return `
        <div style="font-family: Arial, Helvetica, sans-serif; color: #111827; line-height: 1.6;">
            <h2 style="margin-bottom: 16px;">Nuevo lead desde la landing de Escalania</h2>

            <p><strong>Nombre y apellidos:</strong> ${escaparHtml(solicitudContacto.nombreApellidos.value)}</p>
            <p><strong>Correo:</strong> ${escaparHtml(solicitudContacto.correo.value)}</p>
            <p><strong>WhatsApp:</strong> ${escaparHtml(solicitudContacto.whatsapp.value)}</p>
        </div>
    `;
}

export function mapSolicitudContactoAGmailText(
    solicitudContacto: SolicitudContacto
): string {
    return [
        "Nuevo lead desde la landing de Escalania",
        "",
        `Nombre y apellidos: ${solicitudContacto.nombreApellidos.value}`,
        `Correo: ${solicitudContacto.correo.value}`,
        `WhatsApp: ${solicitudContacto.whatsapp.value}`,
    ].join("\n");
}