// ui/componentes/formularioContacto/estilosCampo.ts

import { alpha, Theme } from "@mui/material/styles";

export const COLOR_ERROR_CAMPO = "#b3261e";

/**
 * Estilo compartido por todos los campos del formulario de contacto.
 *
 * Se deja sin anotar el tipo de retorno a propósito: así se puede pasar tal
 * cual a `sx` y también expandir con spread para añadirle reglas por campo.
 */
export const estilosCampoFormulario = (theme: Theme) => ({
    "& .MuiOutlinedInput-root": {
        borderRadius: "10px",
        backgroundColor: alpha(theme.palette.marca.fondo2, 0.9),
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
            borderColor: COLOR_ERROR_CAMPO,
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
});
