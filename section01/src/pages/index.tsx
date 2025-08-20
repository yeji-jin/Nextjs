import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import { InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

export const getServerSideProps = async () => {
  // 컴포넌트보다 먼저 실행되어, 컴포넌트에 필요한 데이터를 불러오는 함수
  const [allBooks, recomBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()]);

  // return값은 props라는 객체를 반환해야함
  return {
    props: {
      allBooks,
      recomBooks,
    },
  };
};

export default function Home({ allBooks, recomBooks }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log("data", allBooks, recomBooks);
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recomBooks.map((book) => (
          <BookItem key={book.id} {...book}></BookItem>
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book}></BookItem>
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
