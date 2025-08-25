import { notFound } from "next/navigation";
import style from "./page.module.css";

export function generateStaticParams() {
  return [{ id: ["1"] }, { id: ["2"] }, { id: ["3"] }];
}
// export const dynamicParams = false; //false 설정시, generateStaticParams에 선언된 페이지 외에는 404페이지 리다이렉션

export default async function PageBook({ params }: { params: Promise<{ id: string | string[] }> }) {
  const { id } = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`);
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>데이터를 불러올 수 없습니다.</div>;
  }
  const book = await response.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <div className={style.container}>
      <div className={style.cover_img_container} style={{ backgroundImage: `url('${coverImgUrl}')` }}>
        <img src={coverImgUrl} alt={title} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
