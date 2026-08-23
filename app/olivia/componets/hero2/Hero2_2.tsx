import { FormularioContacto } from '@/ui/componentes/formularioContacto/FormularioContacto';
import { Box, Card, Typography } from '@mui/material';
import { Titulo } from '@/ui/componentes/Titulo';

export default function Hero2_2() {
    return (
        <Card
            sx={{
                borderRadius: 8 ,
                //backgroundColor: theme.palette.marca.secundario,
                boxShadow: "none",
                p: { xs: 2.5, md: 4 },
            }}
        >

            <Box sx={{ mb:2 }}>
                <Titulo titulo="Déjanos tus datos" variant="h3"/>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography component="p">
                    Apenas completes el formulario accederás a un botón para escribirle a Emilia por WhatsApp. Tú decides cuándo. Si se te pasa, ella te escribe.
                </Typography>

            </Box>

            <FormularioContacto boton="Quiero hablar con Emilia" />
        </Card>
    );
}
