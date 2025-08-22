import { IBookData } from "@/components/types";

export default async function fetchBooks(q?: string): Promise<IBookData[]> {
  let url = `https://onebite-books-server-main-roan.vercel.app/book`;
  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    } else {
      return await response.json();
    }
  } catch (err) {
    console.error(err);
    return [];
  }
}
