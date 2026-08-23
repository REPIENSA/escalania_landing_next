"use client";

import TextField from "@mui/material/TextField";

import { estilosCampoFormulario } from "./estilosCampo";

interface PropsCampoTextoFormulario {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    autoComplete?: string;
    error?: boolean;
    helperText?: string;
}

export function CampoTextoFormulario({
    label,
    value,
    onChange,
    type = "text",
    autoComplete,
    error = false,
    helperText = "",
}: PropsCampoTextoFormulario) {
    return (
        <TextField
            fullWidth
            label={label}
            value={value}
            type={type}
            autoComplete={autoComplete}
            onChange={(event) => onChange(event.target.value)}
            variant="outlined"
            error={error}
            helperText={helperText}
            sx={estilosCampoFormulario}
        />
    );
}
