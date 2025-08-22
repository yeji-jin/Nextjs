export default async function PageBook({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <div>PageBook : page-{id} 입니다.</div>;
}
