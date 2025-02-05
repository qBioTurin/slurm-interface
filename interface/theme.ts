"use client";

import { createTheme, Loader } from "@mantine/core";
import { CssLoader } from "./src/components/commons/LoadingPage/CssLoader"

export const theme = createTheme({
    fontFamily: 'Montserrat, sans-serif',
    headings: { fontFamily: 'Montserrat, sans-serif' },
    components: {
        Loader: Loader.extend({
            defaultProps: {
                loaders: { ...Loader.defaultLoaders, custom: CssLoader },
                type: 'custom',
            },
        }),
    },
    primaryColor: 'dark',
});