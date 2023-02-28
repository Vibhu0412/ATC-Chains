import "../styles/globals.css";
import { Poppins } from "@next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import Router from "next/router";
import { useState } from "react";
import GlobalLoader from "../components/Ui/common/GlobalLoader";
import StateManagement from "../context/StateManagement";
//internal imports

const poppins = Poppins({
  weight: "400",
});
export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  Router.events.on("routeChangeStart", (url) => {
    setIsLoading(true);
  });
  Router.events.on("routeChangeComplete", (url) => {
    setIsLoading(false);
  });

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {/* {isLoading && <GlobalLoader />} */}
      <AnimatePresence exitBeforeEnter>
        <div className={poppins.className}>
          <StateManagement>
            <Component {...pageProps} />
          </StateManagement>
        </div>
      </AnimatePresence>
    </QueryClientProvider>
  );
}
