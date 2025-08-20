import Link from "next/link";
import { IBookData } from "./types";
import style from "./book-item.module.css";

export default function BookItem({ id, title, subTitle, description, author, publisher, coverImgUrl }: IBookData) {
  return (
    <Link href={`book/${id}`} className={style.container}>
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
