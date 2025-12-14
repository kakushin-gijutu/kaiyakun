import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import CategoryTabs from "@/components/CategoryTabs";
import ServiceCard from "@/components/ServiceCard";
import { client } from "@/lib/client";
import type {
	CategoryResponseType,
	ServiceResponseType,
} from "@/lib/type";

export default function HomeScreen() {
	const [categories, setCategories] = useState<CategoryResponseType["contents"]>(
		[]
	);
	const [services, setServices] = useState<ServiceResponseType["contents"]>([]);
	const [activeCategory, setActiveCategory] = useState<string>("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		loadData();
	}, []);

	useEffect(() => {
		if (activeCategory || categories.length > 0) {
			loadServices(activeCategory || categories[0]?.id || "");
		}
	}, [activeCategory, categories]);

	const loadData = async () => {
		try {
			setLoading(true);
			setError(null);

			const categoryResponse = await client.get<CategoryResponseType>({
				endpoint: "category",
			});

			setCategories(categoryResponse.contents);
			if (categoryResponse.contents.length > 0) {
				setActiveCategory(categoryResponse.contents[0].id);
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "データの取得に失敗しました");
		} finally {
			setLoading(false);
		}
	};

	const loadServices = async (categoryId: string) => {
		try {
			setLoading(true);
			setError(null);

			const serviceResponse = await client.get<ServiceResponseType>({
				endpoint: "services",
				queries: {
					filters: categoryId ? `category[contains]${categoryId}` : undefined,
				},
			});

			setServices(serviceResponse.contents || []);
		} catch (err) {
			setError(err instanceof Error ? err.message : "サービスの取得に失敗しました");
		} finally {
			setLoading(false);
		}
	};

	if (loading && categories.length === 0) {
		return (
			<View className="flex-1 items-center justify-center bg-base">
				<ActivityIndicator size="large" color="#000" />
			</View>
		);
	}

	if (error) {
		return (
			<View className="flex-1 items-center justify-center bg-base px-4">
				<Text className="text-center text-red-500">{error}</Text>
			</View>
		);
	}

	return (
		<ScrollView className="flex-1 bg-base">
			<View className="mx-auto w-full max-w-7xl px-4 py-12">
				{categories.length > 0 && (
					<CategoryTabs
						categories={categories}
						activeCategory={activeCategory}
						onCategoryChange={setActiveCategory}
					/>
				)}

				{services.length === 0 ? (
					<View className="flex min-h-[300px] items-center justify-center">
						<Text className="text-center">サービスが見つかりませんでした。</Text>
					</View>
				) : (
					<View className="gap-6">
						{services.map((service) => (
							<ServiceCard key={service.id} service={service} />
						))}
					</View>
				)}

				{categories.length > 0 && (
					<View className="mt-10">
						<CategoryTabs
							categories={categories}
							activeCategory={activeCategory}
							onCategoryChange={setActiveCategory}
						/>
					</View>
				)}
			</View>
		</ScrollView>
	);
}
