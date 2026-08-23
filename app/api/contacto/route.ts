// src/app/api/contacto/route.ts

import { NextRequest, NextResponse } from "next/server";
import { EnviarFormularioContactoUseCase } from "@/application/contacto/usecases/EnviarFormularioContactoUseCase";
import { GmailServicioDeCorreo } from "@/infrastructure/contacto/services/GmailServicioDeCorreo";
import { obtenerCorreoConfiguracion } from "@/infrastructure/contacto/configuracion/correoConfiguracion";
import { ErrorDeDominio } from "@/domain/shared/errors/ErrorDeDominio";

const MENSAJE_ERROR_INESPERADO =
    "No pudimos enviar tu solicitud en este momento. Vuelve a intentarlo en unos minutos.";

export async function POST(request: NextRequest) {
    let body: Record<string, unknown>;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { ok: false, mensaje: "La solicitud no tiene un formato válido." },
            { status: 400 }
        );
    }

    try {
        const useCase = new EnviarFormularioContactoUseCase({
            servicioDeCorreo: new GmailServicioDeCorreo(
                obtenerCorreoConfiguracion()
            ),
        });

        const resultado = await useCase.ejecutar({
            nombreApellidos: String(body.nombreApellidos ?? ""),
            correo: String(body.correo ?? ""),
            whatsapp: String(body.whatsapp ?? ""),
        });

        return NextResponse.json(resultado, { status: 200 });
    } catch (error) {
        // Datos que el visitante puede corregir: le devolvemos el motivo real.
        if (error instanceof ErrorDeDominio) {
            return NextResponse.json(
                { ok: false, mensaje: error.message },
                { status: 400 }
            );
        }

        // Fallo nuestro (configuración faltante, Gmail caído): al log, nunca al
        // visitante, para no filtrar detalles internos.
        console.error("[api/contacto] Error inesperado al enviar el formulario:", error);

        return NextResponse.json(
            { ok: false, mensaje: MENSAJE_ERROR_INESPERADO },
            { status: 500 }
        );
    }
}
