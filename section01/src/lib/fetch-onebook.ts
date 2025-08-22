import { IBookData } from "@/components/types";

export default async function fetchOneBook(id?: number): Promise<IBookData | null> {
  let url = `https://onebite-books-server-main-roan.vercel.app/book/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    } else {
      return await response.json();
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}
