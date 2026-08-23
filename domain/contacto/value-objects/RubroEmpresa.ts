// src/domain/contacto/value-objects/RubroEmpresa.ts

import { ErrorDeDominio } from "@/domain/shared/errors/ErrorDeDominio";

export class RubroEmpresa {
    public readonly value: string;

    constructor(value: string) {
        const normalizado = value.trim();

        if (!normalizado) {
            throw new ErrorDeDominio("El rubro de la empresa es obligatorio.");
        }

        if (normalizado.length < 2) {
            throw new ErrorDeDominio("El rubro de la empresa debe tener al menos 2 caracteres.");
        }

        if (normalizado.length > 100) {
            throw new ErrorDeDominio("El rubro de la empresa no puede superar los 100 caracteres.");
        }

        this.value = normalizado;
    }
}
