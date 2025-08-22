import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-onebook";
import { useRouter } from "next/router";
import Head from "next/head";

export const getStaticPaths = () => {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }, { params: { id: "3" } }],
    fallback: true,
    /**
     * fallback option
     * false : 404 Notfound 페이지 렌더링
     * "blocking" : 즉시생성 (SSR)
     *  -> 존재하지 않는페이지 SSR방식으로 생성, 그 이후는 SSG방식
     *  -> SSR과 SSG가 결합된 상태처럼 동작
     * true : 즉시생성 + 페이지만 미리 반환 (SSR + 데이터가 없는 fallback페이지 먼저 반환)
     * ㄴ 접속요청 -> (데이터가 없는 빈화면 렌더링)props가 없는 빈페이지반환 -> props계산 -> props만 따로 반환(데이터가 있는 화면 렌더링)
     */
  };
};
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));
  if (!book) {
    //없는 Id일때, notfound 렌더링
    return {
      notFound: true,
    };
  }
  return {
    props: {
      book,
    },
  };
};

export default function PageBookDetail({ book }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  //page 컴포넌트 fallback 상태일때
  if (router.isFallback)
    return (
      <>
        <Head>
          <title>NextJs Book Store</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="NextJs Book Store" />
          <meta property="og:description" content="한입북스에 등록된 도서들을 만나보세요!" />
        </Head>
        <div>데이터 로딩중...</div>
      </>
    );
  ///page 컴포넌트에서 존재하지 않는 book일때
  if (!book) return "문제가 발생했습니다. 다시 시도하세요!";
  const { id, title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <>
      <Head>
        <title>NextJs Book Store - {title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={style.container}>
        <div className={style.cover_img_container} style={{ backgroundImage: `url('${coverImgUrl}')` }}>
          <img src={coverImgUrl} alt={title} />
        </div>
        <div className={style.book_info}>
          <h5 className={style.title}>{title}</h5>
          <div className={style.sub_title}>{subTitle}</div>
          <div className={style.author}>
            {author} | {publisher}
          </div>
          <div className={style.description}>{description}</div>
        </div>
      </div>
    </>
  );
}
