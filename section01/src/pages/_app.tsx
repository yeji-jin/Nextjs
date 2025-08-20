import type { AppProps } from "next/app";
import "@/styles/globals.css";
import GlobalLayout from "@/components/global-layout";
import { NextPage } from "next";
import { ReactNode } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};
export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPageWithLayout;
}) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page); //undefine일 경우 그냥 페이지 리턴
  return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>;
}
