import SimpleBackdrop from "@/components/loading";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import "react-quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Admin Pet Shop</title>
      </Head>
      <SimpleBackdrop />
      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
}
