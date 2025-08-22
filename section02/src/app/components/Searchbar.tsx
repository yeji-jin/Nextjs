"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Searchbar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onClickSearch = () => {
    router.push(`/search?q=${search}`);
  };
  //   const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //     if (e.key === "Enter") {
  //       onClickSearch();
  //     }
  //   };

  return (
    <div>
      <input type="text" placeholder="검색어를 입력해주세요" onChange={onChangeSearch} value={search} />
      <button onClick={onClickSearch}>검색</button>
    </div>
  );
}
