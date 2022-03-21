import "../styles/globals.css";
import "normalize.css";
import type { AppProps } from "next/app";
import { FormProvider } from "../context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FormProvider>
      <Component {...pageProps} />
    </FormProvider>
  );
}

export default MyApp;
