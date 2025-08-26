import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import style from "./page.module.css";
import BookItem from "@/components/book-item";
import { IBookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
// 특정 페이지의 유형을 static / dynamic 페이지로 설정해주는 옵션
// 1. auto : 기본값, 아무것도 강제하지 않음
// 2. force-dynamic : 페이지를 강제로 dynamic 페이지로 설정
// 3. force-static : 페이지를 강제로 static 페이지로 설정
// 4. error : 페이지를 강제로 static 페이지로 설정(	dynamic 기능 금지, static만 허용. dynamic 사용 시 빌드 실패)

async function AllBooks() {
  await delay(1500);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, { cache: "force-cache" });
  if (!response.ok) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }
  const allBooks: IBookData[] = await response.json();
  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book}></BookItem>
      ))}
    </div>
  );
}
async function RecomBooks() {
  await delay(3000);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`, { next: { revalidate: 3 } });
  if (!response.ok) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }
  const recommBooks: IBookData[] = await response.json();
  return (
    <div>
      {recommBooks.map((book) => (
        <BookItem key={book.id} {...book}></BookItem>
      ))}
    </div>
  );
}

export default async function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>
          지금 추천하는 도서
          <button>🔁 다시 추천받기</button>
        </h3>

        <Suspense fallback={<BookListSkeleton count={3} />}>
          <RecomBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
