"use client";

import TextField from "@mui/material/TextField";
import { alpha, useTheme } from "@mui/material/styles";

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
    const theme = useTheme();

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
            sx={{
                "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    backgroundColor: alpha(theme.palette.marca.fondo2, 0.6),
                    //color: theme.palette.marca.primario,
                    transition: "all 0.25s ease",
                    "& fieldset": {
                        borderColor: "transparent",
                    },
                    "&:hover fieldset": {
                        borderColor: theme.palette.marca.principal,
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: theme.palette.marca.principal,
                        borderWidth: "1px",
                    },
                    "&.Mui-error fieldset": {
                        borderColor: "#b3261e",
                    },
                },
                "& .MuiInputLabel-root": {
                    color: theme.palette.marca.principal,
                },
                "& .MuiInputLabel-root.Mui-focused": {
                    color: theme.palette.marca.principal,
                },
                "& .MuiInputBase-input": {
                    py: 1.7,
                },
                "& .MuiFormHelperText-root": {
                    mx: 2,
                    mt: 0.8,
                },
            }}
        />
    );
}