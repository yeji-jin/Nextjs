import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import BookItem from "@/components/book-item";
import fetchBooks from "@/lib/fetch-books";
import { IBookData } from "@/components/types";

// (X)
// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   //빌드 타임에 한번만 실행됨으로 쿼리를 알아낼 수 없음 -> 검색결과를 서버로부터 불러올 수 없는 문제
//   // -> client측에서 직접 진행해야함
// };

export default function PageSearch() {
  const [books, setBooks] = useState<IBookData[]>([]);
  const router = useRouter();
  const { q } = router.query;

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      // 검색 결과를 불러오는 로직
      fetchSearchResult();
    }
  }, [q]);

  return (
    <div>
      검색결과 : {q}
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
PageSearch.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
