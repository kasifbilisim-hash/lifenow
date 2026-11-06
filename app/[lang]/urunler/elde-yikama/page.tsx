import CategoryPage from "@/components/CategoryPage";

export default function Page({ params }: { params: Promise<{ lang: string }> }) {
  return <CategoryPage params={params} id="elde-yikama" />;
}
