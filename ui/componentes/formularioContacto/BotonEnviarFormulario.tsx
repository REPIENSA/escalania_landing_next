"use client";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { alpha, useTheme } from "@mui/material/styles";

interface PropsBotonEnviarFormulario {
    loading: boolean;
}

export function BotonEnviarFormulario({
    loading,
}: PropsBotonEnviarFormulario) {
    const theme = useTheme();

    return (
        <Button
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
                mt: 1,
            }}
        >
            {loading ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
                "Enviar mensaje"
            )}
        </Button>
    );
}