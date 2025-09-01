"use client";

import { useRouter } from "next/navigation";

export default function RefreshButton() {
  const router = useRouter();

  return <button onClick={() => router.refresh()}>🔁 다시 추천받기</button>;
}
