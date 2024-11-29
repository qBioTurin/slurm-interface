import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "../../theme";
import { Notifications } from '@mantine/notifications';

export const metadata = {
  title: 'HPC4AI',
  description: ' An interface to manage the booking of resources on the HPC4AI system.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>

      <body>
        <MantineProvider theme={theme}>
          <Notifications />
          <main>{children}</main>
        </MantineProvider>
      </body>
    </html>
  );
}