"use client";

import { createTheme, Loader } from "@mantine/core";
import { CssLoader } from "./src/components/commons/LoadingPage/CssLoader"

export const theme = createTheme({
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