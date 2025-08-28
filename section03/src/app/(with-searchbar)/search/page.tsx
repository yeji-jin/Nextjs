import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { IBookData } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

//set meta
export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q?: string }> }): Promise<Metadata> {
  // 현재페이지의 메타데이터를 동적으로 생성
  const { q } = await searchParams;
  console.log(q);
  return {
    title: `${q} : 검색결과 - NextJs Book Store`,
    description: `${q} : 검색결과 - NextJs Book Store`,
    openGraph: {
      title: `${q} : 검색결과 - NextJs Book Store`,
      description: `${q} : 검색결과 - NextJs Book Store`,
      images: ["/thumbnail.png"], //public dir
    },
  };
}

async function SearchResult({ q }: { q: string }) {
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
  return (
    <Suspense key={q || ""} fallback={<BookListSkeleton count={3} />}>
      <SearchResult q={q || ""} />
    </Suspense>
  );
}
