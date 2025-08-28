import { notFound } from "next/navigation";
import style from "./page.module.css";
import { IBookData, IReviewData } from "@/types";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";
import Image from "next/image";

export async function generateStaticParams() {
  // 모든 도서의 페이지를 빌드타임에 정적생성
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const books: IBookData[] = await response.json();
  return books.map((book) => ({ id: [book.id.toString()] }));
}
// export const dynamicParams = false; //false 설정시, generateStaticParams에 선언된 페이지 외에는 404페이지 리다이렉션

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`, { cache: "force-cache" });
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const book: IBookData = await response.json();
  return {
    title: `${book.title} - NextJs Book Store`,
    description: `${book.description}`,
    openGraph: {
      title: `${book.title} - NextJs Book Store`,
      description: `${book.description}`,
      images: [book.coverImgUrl], //public dir
    },
  };
}

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
        <Image src={coverImgUrl} width={240} height={300} alt={`도서 ${title}의 표지 이미지`} />
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
