import Head from "next/head";

export default function Page404() {
  return (
    <>
      <Head>
        <title>NextJs Book Store</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="NextJs Book Store" />
        <meta property="og:description" content="한입북스에 등록된 도서들을 만나보세요!" />
      </Head>
      <div>존재하지 않는 페이지입니다.</div>
    </>
  );
}
