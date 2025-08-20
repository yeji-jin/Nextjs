import { IBookData } from "@/components/types";

export default async function fetchRandomBooks(): Promise<IBookData[]> {
  const url = `http://localhost:12345/book/random`;
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
