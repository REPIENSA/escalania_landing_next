import { FormularioContacto } from '@/ui/componentes/formularioContacto/FormularioContacto';
import { Box, Card, Typography } from '@mui/material';
import { Titulo } from '@/ui/componentes/Titulo';
import { paletaMarca } from '@/ui/theme/colores';

export default function Hero2_2() {
    return (
        <Card
            id="contacto"
            sx={{
                borderRadius: 8 ,
                //backgroundColor: paletaMarca.fondo2,
                boxShadow: "none",
                p: { xs: 2.5, md: 4 },
            }}
        >

            <Box sx={{ mb:2 }}>
                <Titulo titulo="Déjanos tus datos" variant="h3"/>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" component="h5">
                    Completa el formulario y tendrás noticias nuestras en un máximo de 24 horas.
                </Typography>

            </Box>

            <FormularioContacto boton="Quiero hablar con Emilia" />
        </Card>
    );
}
