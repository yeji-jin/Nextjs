import { notFound } from "next/navigation";
import style from "./page.module.css";
import { IReviewData } from "@/types";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";

export function generateStaticParams() {
  return [{ id: ["1"] }, { id: ["2"] }, { id: ["3"] }];
}
// export const dynamicParams = false; //false 설정시, generateStaticParams에 선언된 페이지 외에는 404페이지 리다이렉션

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`);
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>데이터를 불러올 수 없습니다.</div>;
  }
  const book = await response.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <section>
      <div className={style.cover_img_container} style={{ backgroundImage: `url('${coverImgUrl}')` }}>
        <img src={coverImgUrl} alt={title} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`, { next: { tags: [`review-${bookId}`] } });
  if (!response.ok) {
    throw new Error(`review fetch failed : ${response.statusText}`);
  }
  const reviews: IReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={review.id} {...review} />
      ))}
    </section>
  );
}

export default async function PageBook({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className={style.container}>
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
      <ReviewList bookId={id} />
    </div>
  );
}
