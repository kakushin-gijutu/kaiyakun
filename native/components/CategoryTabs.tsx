import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";
import type { CategoryType } from "@/lib/type";

interface CategoryTabsProps {
	categories: CategoryType[];
	activeCategory: string;
	onCategoryChange: (categoryId: string) => void;
}

export default function CategoryTabs({
	categories,
	activeCategory,
	onCategoryChange,
}: CategoryTabsProps) {
	return (
		<View className="mb-8 flex-row flex-wrap justify-center gap-2 rounded-lg bg-base px-4 py-4">
			{categories.map((category) => {
				const isActive = activeCategory === category.id;
				return (
					<Pressable
						key={category.id}
						onPress={() => onCategoryChange(category.id)}
						className={`rounded-xl border-2 px-3 py-2 ${
							isActive
								? "border-black bg-white"
								: "border-gray bg-transparent"
						}`}
					>
						<View className="flex-row items-center justify-center gap-2">
							<Image
								source={{ uri: category.icon.url }}
								style={{ width: 20, height: 20 }}
								contentFit="contain"
							/>
							<Text
								className={`text-sm font-medium ${
									isActive ? "text-black" : "text-gray"
								}`}
							>
								{category.title}
							</Text>
						</View>
					</Pressable>
				);
			})}
		</View>
	);
}

