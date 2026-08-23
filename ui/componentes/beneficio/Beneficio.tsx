import { Box, Card, CardContent, Typography } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";
import { paletaMarca } from "@/ui/theme/colores";

export interface PropsBeneficio {
    icono: SvgIconComponent;
    titulo: string;
    subTitulo: string;
}

export function Beneficio({ icono: Icono, titulo, subTitulo }: PropsBeneficio) {
    return (
        <Card
            sx={{
                backgroundColor: paletaMarca.fondo1,
                borderRadius: 5,
                boxShadow: "none",
                width: "100%",
                height: "100%",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                transform: "translateY(0)",
                "&:hover": {
                    transform: "translateY(-12px)",
                },
            }}
        >
            <CardContent
                sx={{
                    p: { xs: 3, md: 4, lg: 4 },
                    textAlign: "center",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >

                <Typography variant="h4">
                    {titulo}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        my: 3,
                    }}
                >
                    <Icono sx={{ fontSize: 80, color: paletaMarca.principal }} />
                </Box>

                <Box sx={{ mt: "auto", mb: 2 }}>
                    <Typography variant="h6">
                        {subTitulo}
                    </Typography>
                </Box>
            </CardContent>
        </Card >
    )
}
