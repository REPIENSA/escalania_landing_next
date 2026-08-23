"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import { CardProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface PropsCardCambiante extends CardProps {
    colorBase?: string;
    colorVisible?: string;
    children: ReactNode;
}

export function CardCambiante({
    colorBase,
    colorVisible,
    children,
    sx,
    ...props
}: PropsCardCambiante) {
    const theme = useTheme();
    const ref = useRef<HTMLDivElement | null>(null);
    const [estaVisible, setEstaVisible] = useState(false);

    const fondoBase = colorBase ?? theme.palette.marca.acento;
    const fondoVisible = colorVisible ?? theme.palette.primary.main;

    useEffect(() => {
        const elemento = ref.current;
        if (!elemento) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setEstaVisible(entry.intersectionRatio >= 0.5);
            },
            {
                threshold: [0, 0.5, 1],
            }
        );

        observer.observe(elemento);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <Card
            ref={ref}
            sx={{
                //border: `5px solid ${theme.palette.marca.principal}`,
                backgroundColor: estaVisible ? fondoVisible : fondoBase,
                boxShadow: "none",
                borderRadius: "20px",
                transition: "background-color 0.5s ease",
                [theme.breakpoints.up("xs")]: {p: 3},
                [theme.breakpoints.up("md")]: {p: 5},
                [theme.breakpoints.up("lg")]: {p: 7},
                ...sx,
            }}
            {...props}
        >           
            {children}
        </Card>
    );
}