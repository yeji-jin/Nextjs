import style from "./page.module.css";
import BookItem from "@/components/book-item";
import { IBookData } from "@/types";

async function AllBooks() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`);
  console.log(process.env.NEXT_PUBLIC_API_SERVER_URL);
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`);
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
        <h3>지금 추천하는 도서</h3>
        <RecomBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}
