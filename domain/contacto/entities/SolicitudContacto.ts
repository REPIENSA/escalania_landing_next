// src/domain/contacto/entities/SolicitudContacto.ts

import { CorreoElectronico } from "../value-objects/CorreoElectronico";
import { NombreApellidos } from "../value-objects/NombreApellidos";
import { NumeroWhatsapp } from "../value-objects/NumeroWhatsapp";

export interface SolicitudContactoProps {
    nombreApellidos: NombreApellidos;
    correo: CorreoElectronico;
    whatsapp: NumeroWhatsapp;
}

export class SolicitudContacto {

    public readonly nombreApellidos: NombreApellidos;
    public readonly correo: CorreoElectronico;
    public readonly whatsapp: NumeroWhatsapp;

    constructor(props: SolicitudContactoProps) {
        this.nombreApellidos = props.nombreApellidos;
        this.correo = props.correo;
        this.whatsapp = props.whatsapp;
    }

    public toPrimitives() {
        return {
            nombreApellidos: this.nombreApellidos.value,
            correo: this.correo.value,
            whatsapp: this.whatsapp.value,
        };
    }
}
