// src/domain/contacto/value-objects/CorreoElectronico.ts

import { ErrorDeDominio } from "@/domain/shared/errors/ErrorDeDominio";

export class CorreoElectronico {
    public readonly value: string;

    constructor(value: string) {
        const normalizado = value.trim().toLowerCase();

        if (!normalizado) {
            throw new ErrorDeDominio("El correo es obligatorio.");
        }

        if (normalizado.length > 150) {
            throw new ErrorDeDominio("El correo no puede superar los 150 caracteres.");
        }

        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexCorreo.test(normalizado)) {
            throw new ErrorDeDominio("El correo no tiene un formato válido.");
        }

        this.value = normalizado;
    }
}
