import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "../../theme";
import { Shell } from "@/components/";
import { Notifications } from '@mantine/notifications';

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        {/* <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" /> */}
        <link rel="icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>

      <body>
        <MantineProvider theme={theme}>
          <Notifications />
          <Shell>
            {children}
          </Shell>
        </MantineProvider>
      </body>
    </html>
  );
}