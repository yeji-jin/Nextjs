"use client";

import { useActionState, useEffect } from "react";
import style from "./review-editor.module.css";
import { createReviewAction } from "@/actions/createReview";

export default function ReviewEditor({ bookId }: { bookId: string }) {
  const [state, formAction, isPending] = useActionState(createReviewAction, null);
  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section>
      <form action={formAction} className={style.form_container}>
        <input type="text" name="bookId" value={bookId} hidden readOnly />
        <textarea required disabled={isPending} name="content" placeholder="review" />
        <div className={style.submit_container}>
          <input required disabled={isPending} type="text" name="author" placeholder="작성자" />
          <button type="submit" disabled={isPending}>
            {isPending ? "작성중.." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
}

// 서버액션을 사용하는 이유 ?
/*
    1. 코드가 매우 간결함
    2. 서버측에서만 실행되는 코드 -> 클라이언트 호출O , 전달X  -> 보안 good
    -> 조금 더 간결하고 편리하게 서버측에서 실행되는 동작을 정의
  */
