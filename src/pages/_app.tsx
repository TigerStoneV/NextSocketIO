import type { AppProps } from "next/app";
import type { Metadata } from "next";
import { ThemeProvider } from "styled-components";
import { SocketProvider } from "@/components/socket-provider";
import { GlobalStyle } from "../styles/global-style";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <SocketProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </SocketProvider>
    </ThemeProvider>
  );
}

export default MyApp;
