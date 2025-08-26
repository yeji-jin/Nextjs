import BookItem from "@/components/book-item";
import { IBookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  await delay(2000);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`, { cache: "force-cache" });
  if (!response.ok) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }
  const books: IBookData[] = await response.json();

  return (
    <div>
      검색결과 : {q}
      <br />
      <br />
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

// export default async function PageSearch({ searchParams }: { searchParams: { q?: string } }) {
//   return (
//     <Suspense fallback={<div key={searchParams.q || ""}>Loading중!! Loading중~~</div>}>
//       <SearchResult q={searchParams.q || ""} />
//     </Suspense>
//   );
// }

export default async function PageSearch({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  await delay(2000);
  return (
    <Suspense key={q || ""} fallback={<div>Loading중!! Loading중~~</div>}>
      <SearchResult q={q || ""} />
    </Suspense>
  );
}
