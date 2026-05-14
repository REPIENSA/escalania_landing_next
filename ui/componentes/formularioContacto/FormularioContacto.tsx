"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import { CampoTextoFormulario } from "./CampoTextoFormulario";
import { BotonEnviarFormulario } from "./BotonEnviarFormulario";
import {
    FormularioContactoState,
    formularioContactoInicial,
} from "./FormularioContactoState";

interface ErroresFormularioContacto {
    nombreApellidos: string;
    correo: string;
    whatsapp: string;
    rubroEmpresa: string;
    formulario: string;
}

const erroresIniciales: ErroresFormularioContacto = {
    nombreApellidos: "",
    correo: "",
    whatsapp: "",
    rubroEmpresa: "",
    formulario: "",
};

export function FormularioContacto() {
    const theme = useTheme();
    const router = useRouter();

    const [formulario, setFormulario] = useState<FormularioContactoState>(
        formularioContactoInicial
    );
    const [errores, setErrores] =
        useState<ErroresFormularioContacto>(erroresIniciales);
    const [loading, setLoading] = useState(false);

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

            const regexWhatsapp = /^[+\d\s\-()]+$/;
            if (!regexWhatsapp.test(valor)) {
                return "Ingresa un número de WhatsApp válido.";
            }

            const soloDigitos = valor.replace(/\D/g, "");
            if (soloDigitos.length < 7) {
                return "El WhatsApp debe tener al menos 7 dígitos.";
            }

            return "";
        }

        if (campo === "rubroEmpresa") {
            if (!valor) return "El rubro de la empresa es obligatorio.";
            if (valor.length < 2) {
                return "El rubro de la empresa debe tener al menos 2 caracteres.";
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
            rubroEmpresa: validarCampo(
                "rubroEmpresa",
                formulario.rubroEmpresa
            ),
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
                body: JSON.stringify(formulario),
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
        <Card
            sx={{
                borderRadius: { xs: "2px", md: "20px" },
                backgroundColor: theme.palette.marca.secundario,
                boxShadow: "none",
            }}
        >
            <Box
                sx={{
                    px: { xs: 2.5, md: 4 },
                    py: { xs: 3, md: 4 },
                }}
            >
                <Typography variant="h3" color='primary' sx={{ mb: 1}}>
                    Agenda una demostración
                </Typography>

                <Typography variant="body1" sx={{ mb: 4}}>
                    Déjanos tus datos y te contactaremos para mostrarte cómo un
                    agente de IA puede atender a tus clientes por WhatsApp,
                    Instagram y Facebook.
                </Typography>

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

                        <CampoTextoFormulario
                            label="WhatsApp"
                            value={formulario.whatsapp}
                            onChange={(value) =>
                                actualizarCampo("whatsapp", value)
                            }
                            autoComplete="tel"
                            error={Boolean(errores.whatsapp)}
                            helperText={errores.whatsapp}
                        />

                        <CampoTextoFormulario
                            label="Rubro de la empresa"
                            value={formulario.rubroEmpresa}
                            onChange={(value) =>
                                actualizarCampo("rubroEmpresa", value)
                            }
                            error={Boolean(errores.rubroEmpresa)}
                            helperText={errores.rubroEmpresa}
                        />

                        <BotonEnviarFormulario loading={loading} />

                        {errores.formulario && (
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "#b3261e",
                                    mt: -0.5,
                                    px: 0.5,
                                }}
                            >
                                {errores.formulario}
                            </Typography>
                        )}
                    </Stack>
                </Box>
            </Box>
        </Card>
    );
}