"use client";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import {
    CODIGOS_PAIS_LATAM,
    obtenerPaisPorIso,
} from "./codigosPaisLatam.data";
import { COLOR_ERROR_CAMPO, estilosCampoFormulario } from "./estilosCampo";

interface PropsCampoTelefonoFormulario {
    label: string;
    /** ISO del país seleccionado, por ejemplo "PE". */
    codigoPais: string;
    onCodigoPaisChange: (iso: string) => void;
    /** Número nacional, solo dígitos. */
    value: string;
    onChange: (value: string) => void;
    error?: boolean;
    helperText?: string;
}

export function CampoTelefonoFormulario({
    label,
    codigoPais,
    onCodigoPaisChange,
    value,
    onChange,
    error = false,
    helperText = "",
}: PropsCampoTelefonoFormulario) {
    const pais = obtenerPaisPorIso(codigoPais);
    const maximoDigitos = Math.max(...pais.digitos);

    // El número nacional no admite espacios ni signos: al escribir se descarta
    // todo lo que no sea dígito y se corta en el largo máximo del país.
    const manejarCambioNumero = (entrada: string) => {
        onChange(entrada.replace(/\D/g, "").slice(0, maximoDigitos));
    };

    return (
        <Box>
            <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
                <TextField
                    select
                    value={pais.iso}
                    onChange={(event) => onCodigoPaisChange(event.target.value)}
                    error={error}
                    sx={(theme) => ({
                        ...estilosCampoFormulario(theme),
                        width: { xs: 118, sm: 132 },
                        flexShrink: 0,
                    })}
                    slotProps={{
                        // Sin etiqueta visible (el prefijo ya se explica solo),
                        // pero el lector de pantalla necesita saber qué es. Va en
                        // htmlInput para que aterrice en el combobox y no en el
                        // div contenedor.
                        htmlInput: { "aria-label": "País" },
                        select: {
                            renderValue: (seleccionado) => {
                                const elegido = obtenerPaisPorIso(
                                    String(seleccionado)
                                );
                                return `${elegido.bandera} ${elegido.codigo}`;
                            },
                            MenuProps: {
                                slotProps: {
                                    paper: { sx: { maxHeight: 320 } },
                                },
                            },
                        },
                    }}
                >
                    {CODIGOS_PAIS_LATAM.map((opcion) => (
                        <MenuItem key={opcion.iso} value={opcion.iso}>
                            <Box
                                component="span"
                                sx={{ mr: 1 }}
                                aria-hidden="true"
                            >
                                {opcion.bandera}
                            </Box>
                            {opcion.nombre}
                            <Box
                                component="span"
                                sx={{ ml: 1, opacity: 0.6 }}
                            >
                                {opcion.codigo}
                            </Box>
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    fullWidth
                    label={label}
                    value={value}
                    onChange={(event) => manejarCambioNumero(event.target.value)}
                    autoComplete="tel-national"
                    inputMode="numeric"
                    error={error}
                    sx={estilosCampoFormulario}
                    slotProps={{
                        htmlInput: {
                            maxLength: maximoDigitos,
                            "aria-describedby": helperText
                                ? "ayuda-whatsapp"
                                : undefined,
                        },
                    }}
                />
            </Box>

            {helperText && (
                <Typography
                    id="ayuda-whatsapp"
                    variant="body2"
                    sx={{
                        mx: 2,
                        mt: 0.8,
                        fontSize: "0.75rem",
                        color: error ? COLOR_ERROR_CAMPO : "text.secondary",
                    }}
                >
                    {helperText}
                </Typography>
            )}
        </Box>
    );
}
