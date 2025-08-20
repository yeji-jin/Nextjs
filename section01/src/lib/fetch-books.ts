import { IBookData } from "@/components/types";

export default async function fetchBooks(q?: string): Promise<IBookData[]> {
  let url = `http://localhost:12345/book`;
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
