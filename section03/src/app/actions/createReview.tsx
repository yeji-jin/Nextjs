"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function createReviewAction(_: any, formData: FormData) {
  console.log("server action called");
  console.log(formData);
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();
  console.log(bookId, content, author);

  if (!bookId || !content || !author) {
    return {
      status: false,
      error: "리뷰내용과 작성자를 입력해주세요",
    };
  }
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`, {
      method: "POST",
      body: JSON.stringify({ bookId, content, author }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    // revalidatePath(`/book/${bookId}`);
    revalidateTag(`review-${bookId}`);
    return {
      status: true,
      error: "",
    };
  } catch (err) {
    console.error(err);
    return {
      status: false,
      error: `리뷰 저장에 실패 , ${err}`,
    };
  }
}
