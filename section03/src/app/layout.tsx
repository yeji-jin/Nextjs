import type { Metadata } from "next";
import "./globals.css";
import style from "./layout.module.css";
import Link from "next/link";
import { IBookData } from "./types";

export const metadata: Metadata = {
  title: "NextJs Book Store",
  description: "한입북스에 등록된 도서들을 만나보세요!",
};

async function Footer() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, { cache: "force-cache" });
  if (!response.ok) {
    return <footer className={style.footer}>제작 @yj.jin</footer>;
  }
  const allBooks: IBookData[] = await response.json();
  const bookCount = allBooks.length;
  return (
    <footer className={style.footer}>
      <div>제작 @yj.jin</div>
      <div>{bookCount}개의 도서가 등록되어 있습니다</div>
    </footer>
  );
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body>
        <div className={style.container}>
          <header className={style.header}>
            <Link href={"/"}>📚 NextJs Book Store</Link>
          </header>
          <main className={style.main}> {children}</main>
          <Footer />
        </div>
        {modal}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
