"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { CampoTextoFormulario } from "./CampoTextoFormulario";
import { CampoTelefonoFormulario } from "./CampoTelefonoFormulario";
import { BotonEnviarFormulario } from "./BotonEnviarFormulario";
import { COLOR_ERROR_CAMPO } from "./estilosCampo";
import { describirDigitos, obtenerPaisPorIso } from "./codigosPaisLatam.data";
import {FormularioContactoState, formularioContactoInicial,} from "./FormularioContactoState";

interface ErroresFormularioContacto {
    nombreApellidos: string;
    correo: string;
    whatsapp: string;
    formulario: string;
}

const erroresIniciales: ErroresFormularioContacto = {
    nombreApellidos: "",
    correo: "",
    whatsapp: "",
    formulario: "",
};

const TEXTO_BOTON_POR_DEFECTO = "Enviar mensaje";

interface PropsFormularioContacto {
    /** Texto del botón de envío. Cada landing usa su propia llamada a la acción. */
    boton?: string;
}

export function FormularioContacto({
    boton = TEXTO_BOTON_POR_DEFECTO,
}: PropsFormularioContacto = {}) {
    const router = useRouter();

    const [formulario, setFormulario] = useState<FormularioContactoState>(
        formularioContactoInicial
    );
    const [errores, setErrores] =
        useState<ErroresFormularioContacto>(erroresIniciales);
    const [loading, setLoading] = useState(false);

    const pais = obtenerPaisPorIso(formulario.codigoPais);

    const actualizarCampo = (
        campo: keyof FormularioContactoState,
        value: string
    ) => {
        setFormulario((prev) => ({
            ...prev,
            [campo]: value,
        }));

        setErrores((prev) => ({
            ...prev,
            [campo]: "",
            formulario: "",
        }));
    };

    const validarCampo = (
        campo: keyof FormularioContactoState,
        value: string
    ): string => {
        const valor = value.trim();

        if (campo === "nombreApellidos") {
            if (!valor) return "El nombre y apellidos es obligatorio.";
            if (valor.length < 3) {
                return "El nombre y apellidos debe tener al menos 3 caracteres.";
            }
            return "";
        }

        if (campo === "correo") {
            if (!valor) return "El correo es obligatorio.";

            const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexCorreo.test(valor)) {
                return "Ingresa un correo válido.";
            }

            return "";
        }

        if (campo === "whatsapp") {
            if (!valor) return "El WhatsApp es obligatorio.";

            // El campo solo deja escribir dígitos, así que basta con comprobar
            // que el largo sea uno de los válidos para el país elegido.
            if (!pais.digitos.includes(valor.length)) {
                return `El número de ${pais.nombre} debe tener ${describirDigitos(pais.digitos)}.`;
            }

            return "";
        }

        return "";
    };

    const validarFormulario = (): boolean => {
        const nuevosErrores: ErroresFormularioContacto = {
            nombreApellidos: validarCampo(
                "nombreApellidos",
                formulario.nombreApellidos
            ),
            correo: validarCampo("correo", formulario.correo),
            whatsapp: validarCampo("whatsapp", formulario.whatsapp),
            formulario: "",
        };

        setErrores(nuevosErrores);

        return !Object.values(nuevosErrores).some(Boolean);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (loading) return;

        const esValido = validarFormulario();

        if (!esValido) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/contacto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombreApellidos: formulario.nombreApellidos,
                    correo: formulario.correo,
                    whatsapp: `${pais.codigo} ${formulario.whatsapp}`,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrores((prev) => ({
                    ...prev,
                    formulario:
                        data?.mensaje ?? "No se pudo enviar el formulario.",
                }));
                return;
            }

            router.push("/gracias");
        } catch {
            setErrores((prev) => ({
                ...prev,
                formulario:
                    "Ocurrió un error inesperado al enviar el formulario.",
            }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2}>
                <CampoTextoFormulario
                    label="Nombre y apellidos"
                    value={formulario.nombreApellidos}
                    onChange={(value) =>
                        actualizarCampo("nombreApellidos", value)
                    }
                    autoComplete="name"
                    error={Boolean(errores.nombreApellidos)}
                    helperText={errores.nombreApellidos}
                />

                <CampoTextoFormulario
                    label="Correo"
                    type="email"
                    value={formulario.correo}
                    onChange={(value) =>
                        actualizarCampo("correo", value)
                    }
                    autoComplete="email"
                    error={Boolean(errores.correo)}
                    helperText={errores.correo}
                />

                <CampoTelefonoFormulario
                    label="WhatsApp"
                    codigoPais={formulario.codigoPais}
                    onCodigoPaisChange={(iso) => {
                        actualizarCampo("codigoPais", iso);
                        setErrores((prev) => ({
                            ...prev,
                            whatsapp: "",
                            formulario: "",
                        }));
                    }}
                    value={formulario.whatsapp}
                    onChange={(value) =>
                        actualizarCampo("whatsapp", value)
                    }
                    error={Boolean(errores.whatsapp)}
                    helperText={errores.whatsapp}
                />

                <BotonEnviarFormulario loading={loading} texto={boton} />

                {errores.formulario && (
                    <Typography
                        variant="body2"
                        sx={{
                            color: COLOR_ERROR_CAMPO,
                            mt: -0.5,
                            px: 0.5,
                        }}
                    >
                        {errores.formulario}
                    </Typography>
                )}
            </Stack>
        </Box>
    );
}
