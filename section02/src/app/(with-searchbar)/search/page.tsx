import ClientComponent from "@/app/components/client-component";

export default async function PageSearch({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const { q } = await searchParams;
  console.log("Q", q);
  return (
    <div>
      검색결과 : {q}
      <ClientComponent>
        <div></div>
      </ClientComponent>
    </div>
  );
}
