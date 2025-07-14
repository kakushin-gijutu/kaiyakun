import AppTabs from "@/components/AppTabs";
import CardListSection from "@/components/CardListSection";
import { client } from "@/lib/client";
import type { CategoryResponseType } from "@/lib/type";

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const { contents: categories } = await client.get<CategoryResponseType>({
		endpoint: "category",
	});
	const searchCategory = (await searchParams).category as string | undefined;
	const category = searchCategory || categories[0]?.id || "";

	return (
		<main className="min-h-screen bg-orange-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<h1 className="text-4xl font-bold text-center text-orange-800 mb-12">
					解約くん
				</h1>
				<p className="text-xl text-center text-orange-700 mb-12">
					面倒なサブスクの解約ページに一瞬で。
				</p>
				<AppTabs categories={categories} />
				<CardListSection category={category} />
				<div className="mt-12 text-center text-sm text-orange-700">
					<p>
						このサイトは情報提供のみを目的としています。各サービスの解約ポリシーは変更される可能性があります。
					</p>
					<p>
						このサイトは上記のサービスと正式に提携しているものではありません。
					</p>
				</div>
			</div>
		</main>
	);
}
