import Link from "next/link";
import style from "./book-item.module.css";
import { IBookData } from "@/types";

export default function bookItem({ id, title, subTitle, description, author, publisher, coverImgUrl }: IBookData) {
  return (
    <Link href={`/book/${id}`} scroll={false} className={style.container}>
      <img src={coverImgUrl} alt="title" />
      <div>
        <h5 className={style.title}>{title}</h5>
        <div className={style.sub_title}>{subTitle}</div>
        <br />
        <div className={style.author}>
          {author} | {publisher}
        </div>
      </div>
    </Link>
  );
}
