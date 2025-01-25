import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider value={theme}>
      <ThemeProvider
      attribute="class" 
      defaultTheme="light" 
      enableSystem={false} 
    >
      <Component {...pageProps} />
    </ThemeProvider>
    </ChakraProvider>
    
  );
}