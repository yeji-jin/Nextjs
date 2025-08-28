import Link from "next/link";
import style from "./book-item.module.css";
import { IBookData } from "@/types";
import Image from "next/image";

export default function bookItem({ id, title, subTitle, description, author, publisher, coverImgUrl }: IBookData) {
  return (
    <Link href={`/book/${id}`} scroll={false} className={style.container}>
      <Image src={coverImgUrl} width={80} height={105} alt={`도서 ${title}의 표지 이미지`} />
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
