// src/domain/contacto/value-objects/NumeroWhatsapp.ts

import { ErrorDeDominio } from "@/domain/shared/errors/ErrorDeDominio";

/**
 * Número de WhatsApp con código de país incluido, por ejemplo "+51 987654321".
 *
 * El mínimo de 8 dígitos y el máximo de 15 cubren cualquier combinación de
 * código de país + número nacional que el formulario permite seleccionar.
 */
export class NumeroWhatsapp {
    public readonly value: string;

    constructor(value: string) {
        const normalizado = value.trim().replace(/\s+/g, " ");

        if (!normalizado) {
            throw new ErrorDeDominio("El WhatsApp es obligatorio.");
        }

        if (normalizado.length > 25) {
            throw new ErrorDeDominio("El WhatsApp no puede superar los 25 caracteres.");
        }

        if (!normalizado.startsWith("+")) {
            throw new ErrorDeDominio("El WhatsApp debe incluir el código de país.");
        }

        const regexWhatsapp = /^\+[\d\s\-()]+$/;

        if (!regexWhatsapp.test(normalizado)) {
            throw new ErrorDeDominio("El WhatsApp solo puede contener números, espacios, guiones y paréntesis después del código de país.");
        }

        const soloDigitos = normalizado.replace(/\D/g, "");

        if (soloDigitos.length < 8) {
            throw new ErrorDeDominio("El WhatsApp debe tener al menos 8 dígitos.");
        }

        if (soloDigitos.length > 15) {
            throw new ErrorDeDominio("El WhatsApp no puede tener más de 15 dígitos.");
        }

        this.value = normalizado;
    }
}
