// src/domain/contacto/services/CrearSolicitudContacto.ts

import { SolicitudContacto } from "../entities/SolicitudContacto";
import { CorreoElectronico } from "../value-objects/CorreoElectronico";
import { NombreApellidos } from "../value-objects/NombreApellidos";
import { NumeroWhatsapp } from "../value-objects/NumeroWhatsapp";

export interface CrearSolicitudContactoParams {
    nombreApellidos: string;
    correo: string;
    whatsapp: string;
}

export function crearSolicitudContacto(
    params: CrearSolicitudContactoParams
): SolicitudContacto {
    return new SolicitudContacto({
        nombreApellidos: new NombreApellidos(params.nombreApellidos),
        correo: new CorreoElectronico(params.correo),
        whatsapp: new NumeroWhatsapp(params.whatsapp),
    });
}
