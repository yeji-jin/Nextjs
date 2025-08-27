"use client";

import DeleteReviewAction from "@/actions/deleteReviewAction";
import { useActionState, useEffect, useRef } from "react";

export default function ReviewItemDeleteBtn({ reviewId, bookId }: { reviewId: number; bookId: number }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(DeleteReviewAction, null);

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input type="text" name="reviewId" value={reviewId} readOnly hidden />
      <input type="text" name="bookId" value={bookId} readOnly hidden />
      {isPending ? <div>...</div> : <div onClick={() => formRef.current?.requestSubmit()}>삭제하기</div>}
    </form>
  );
}
