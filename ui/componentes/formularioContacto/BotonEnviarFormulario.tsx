"use client";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

interface PropsBotonEnviarFormulario {
    loading: boolean;
    texto: string;
}

export function BotonEnviarFormulario({
    loading,
    texto,
}: PropsBotonEnviarFormulario) {
    return (
        <Button
            type="submit"
            fullWidth
            disabled={loading}
            // Mientras carga, el texto se reemplaza por el spinner: sin esto el
            // botón se queda sin nombre para un lector de pantalla.
            aria-label={texto}
        >
            {loading ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
                texto
            )}
        </Button>
    );
}
