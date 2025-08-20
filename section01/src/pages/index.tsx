import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

export const getStaticProps = async () => {
  // 컴포넌트보다 먼저 실행되어, 컴포넌트에 필요한 데이터를 불러오는 함수
  console.log("index page");
  const [allBooks, recomBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()]);

  // return값은 props라는 객체를 반환해야함
  return {
    props: {
      allBooks,
      recomBooks,
    },
    //시간기반 ISR방식
    // revalidate: 3, //3초 주기로 재검증
    //처음에 페이지를 정적으로 제공 → 빠른속도로 렌더링
    //일정시간을 주기로 데이터 갱신 가능
  };
};

export default function Home({ allBooks, recomBooks }: InferGetStaticPropsType<typeof getStaticProps>) {
  // console.log("data", allBooks, recomBooks);

  const handleRevalidate = async () => {
    try {
      const res = await fetch("/api/revalidate", {
        method: "POST",
      });
      const data = await res.json();
      console.log("Revalidation result:", data);
      // 필요하다면 새 데이터 fetch → 페이지 갱신
      location.reload(); // 가장 단순하게는 페이지 새로고침
    } catch (err) {
      console.error("Revalidate error:", err);
    }
  };

  return (
    <div className={style.container}>
      <section>
        <h3 style={{ display: "flex", justifyContent: "space-between" }}>
          지금 추천하는 도서
          <div>
            <button onClick={handleRevalidate}>🔁 다시 추천받기</button>
          </div>
        </h3>
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
