import type { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';

type VarianteTitulo = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type EtiquetaTitulo = VarianteTitulo | 'p' | 'span';

interface PropsTitulo {
    /** Acepta JSX para poder resaltar una palabra suelta dentro del título. */
    titulo: ReactNode;
    /** Tamaño visual, según la tipografía del tema. */
    variant?: VarianteTitulo;
    /** Etiqueta HTML. Por defecto, la que corresponde al `variant`. */
    component?: EtiquetaTitulo;
}

/**
 * Título de sección con el subrayado que se dibuja al pasar el cursor.
 *
 * El tamaño y la etiqueta van por separado a propósito: un título puede verse
 * como h3 y ser un h2 en el HTML, que es lo que mantiene la jerarquía correcta
 * dentro de cada página.
 */
export function Titulo({
    titulo,
    variant = 'h3',
    component,
}: PropsTitulo) {
    return (
        <Typography
            variant={variant}
            component={component ?? variant}
            sx={[
                {
                    // `inline` hace que el subrayado mida el texto y no el
                    // ancho completo de la línea.
                    display: 'inline',
                    backgroundImage: 'linear-gradient(currentColor, currentColor)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '0 100%',
                    backgroundSize: '0% 4px',
                    transition: 'background-size 0.5s cubic-bezier(0.22, 1, 0.36, 1)',

                    '@media (hover: hover)': {
                        '&:hover': {
                            backgroundSize: '100% 4px',
                        },
                    },

                    '@media (prefers-reduced-motion: reduce)': {
                        transition: 'none',
                    },
                },
            ]}
        >
            {titulo}
        </Typography>
    );
}
