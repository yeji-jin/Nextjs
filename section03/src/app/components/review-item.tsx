import { IReviewData } from "@/types";
import style from "./review-item.module.css";
import ReviewItemDeleteBtn from "@/components/review-item-delete-btn";

export default function ReviewItem({ id, content, author, createdAt, bookId }: IReviewData) {
  return (
    <div className={style.contianer}>
      <div className={style.author}>작성자 : {author}</div>
      <div className={style.content}>{content}</div>
      <div className={style.bottom_container}>
        <div className={style.date}>{new Date(createdAt).toLocaleString()}</div>
        <div className={style.delete_btn}>
          <ReviewItemDeleteBtn reviewId={id} bookId={bookId} />
        </div>
      </div>
    </div>
  );
}
