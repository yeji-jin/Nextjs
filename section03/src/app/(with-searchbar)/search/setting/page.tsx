import { delay } from "@/util/delay";

export default async function page() {
  await delay(2000);
  return <div>setting page</div>;
}
