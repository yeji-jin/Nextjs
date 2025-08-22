import { IBookData } from "@/components/types";

export default async function fetchRandomBooks(): Promise<IBookData[]> {
  const url = `https://onebite-books-server-main-roan.vercel.app/book/random`;
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
