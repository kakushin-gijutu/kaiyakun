import AppTabs from "@/components/AppTabs";
import CardListSection from "@/components/CardListSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import { client } from "@/lib/client";
import type { CategoryResponseType, ServiceResponseType } from "@/lib/type";

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

	const { contents: services } = await client.get<ServiceResponseType>({
		endpoint: "services",
		queries: {
			filters: category ? `category[contains]${category}` : undefined,
		},
	});

	return (
		<main className="min-h-screen text-black">
			<HeroSection />
			<div className="bg-base">
				<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
					<AppTabs categories={categories} activeCategory={category} />
					<CardListSection services={services || []} />
					<AppTabs categories={categories} activeCategory={category} />
				</div>
			</div>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<Footer />
			</div>
		</main>
	);
}
