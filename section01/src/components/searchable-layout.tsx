import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import style from "./searchable-layout.module.css";

export default function SearchableLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const q = router.query.q as string;

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onClickSearch = () => {
    //검색어가 없거나 queryString의 값이 search와 동일한 경우
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickSearch();
    }
  };

  return (
    <div>
      <div className={style.searchbar_container}>
        <input type="text" placeholder="검색어를 입력해주세요" value={search} onChange={onChangeSearch} onKeyDown={onKeyDown} />
        <button onClick={onClickSearch}>search</button>
      </div>
      {children}
    </div>
  );
}
