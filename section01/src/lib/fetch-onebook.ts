import { IBookData } from "@/components/types";

export default async function fetchOneBook(id?: number): Promise<IBookData | null> {
  let url = `http://localhost:12345/book/${id}`;

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
