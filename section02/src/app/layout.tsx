import type { Metadata } from "next";
import "./globals.css";
import style from "./layout.module.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NextJs Book Store",
  description: "한입북스에 등록된 도서들을 만나보세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body>
        <div className={style.container}>
          <header className={style.header}>
            <Link href={"/"}>📚 NextJs Book Store</Link>
          </header>
          <main className={style.main}> {children}</main>
          <footer className={style.footer}>제작 @yj.jin</footer>
        </div>
      </body>
    </html>
  );
}
