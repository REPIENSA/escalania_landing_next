// src/domain/contacto/value-objects/NombreApellidos.ts

import { ErrorDeDominio } from "@/domain/shared/errors/ErrorDeDominio";

export class NombreApellidos {
    public readonly value: string;

    constructor(value: string) {
        const normalizado = value.trim();

        if (!normalizado) {
            throw new ErrorDeDominio("El nombre y apellidos es obligatorio.");
        }

        if (normalizado.length < 3) {
            throw new ErrorDeDominio("El nombre y apellidos debe tener al menos 3 caracteres.");
        }

        if (normalizado.length > 120) {
            throw new ErrorDeDominio("El nombre y apellidos no puede superar los 120 caracteres.");
        }

        this.value = normalizado;
    }
}
