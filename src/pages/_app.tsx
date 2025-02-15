import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "@/components/ui/provider";
import { Theme } from "@chakra-ui/react";
import { DiagnoseProvider } from "@/context/diagnoseContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Theme appearance="light">
        <DiagnoseProvider>
          <Component {...pageProps} />
        </DiagnoseProvider>
      </Theme>
    </Provider>
  );
}
