import {
  CalculatorControllerProvider,
} from "@/core/context";
import "@/styles/globals.css";
import RootLayout from "./layout/layout";

export default function App({ Component, pageProps }) {
  return (
    <>
      <CalculatorControllerProvider>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </CalculatorControllerProvider>
    </>
  );
}
