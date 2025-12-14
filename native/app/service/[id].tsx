import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Pressable } from "react-native";
import { client } from "@/lib/client";
import type { ServiceType } from "@/lib/type";

export default function ServiceDetailScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();
	const [service, setService] = useState<ServiceType | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (id) {
			loadService();
		}
	}, [id]);

	const loadService = async () => {
		try {
			setLoading(true);
			setError(null);

			const response = await client.get<ServiceType>({
				endpoint: "services",
				contentId: id,
			});

			setService(response);
		} catch (err) {
			setError(err instanceof Error ? err.message : "サービスの取得に失敗しました");
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<View className="flex-1 items-center justify-center bg-base">
				<ActivityIndicator size="large" color="#000" />
			</View>
		);
	}

	if (error || !service) {
		return (
			<View className="flex-1 items-center justify-center bg-base px-4">
				<Text className="text-center text-red-500">
					{error || "サービスが見つかりませんでした"}
				</Text>
			</View>
		);
	}

	return (
		<ScrollView className="flex-1 bg-base">
			<View className="mx-auto w-full max-w-4xl px-4 py-8">
				<View className="mb-8 flex items-center justify-center">
					<View className="relative h-[200px] w-[200px] rounded-full bg-white p-2">
						<View className="flex h-full w-full items-center justify-center rounded-full border-2 border-dotted border-orange p-4">
							<Image
								source={{ uri: service.image.url }}
								style={{ width: 200, height: 200 }}
								contentFit="contain"
							/>
						</View>
					</View>
				</View>

				<View className="mb-6 space-y-4">
					<Text className="text-center text-3xl font-bold">{service.title}</Text>
					<Text className="text-center text-base text-gray">
						{service.description}
					</Text>
				</View>

				{service.category && service.category.length > 0 && (
					<View className="mb-6">
						<Text className="mb-2 text-sm font-medium text-gray">カテゴリ</Text>
						<View className="flex-row flex-wrap gap-2">
							{service.category.map((cat) => (
								<View
									key={cat.id}
									className="rounded-lg bg-white px-3 py-1"
								>
									<Text className="text-sm">{cat.title}</Text>
								</View>
							))}
						</View>
					</View>
				)}

				<View className="mb-6 space-y-4">
					<Text className="text-lg font-bold">解約手順</Text>
					<Text className="text-base leading-6">
						解約ページにアクセスして、手順に従って解約手続きを行ってください。
					</Text>
				</View>

				<View className="flex-row gap-4">
					<Pressable
						onPress={() => {
							router.push({
								pathname: "/cancel/[id]",
								params: { id: service.id },
							});
						}}
						className="flex-1 rounded-2xl bg-red px-7 py-4 shadow-sm"
					>
						<Text className="text-center font-bold text-black">
							解約ページへ進む
						</Text>
					</Pressable>
					{service.register_url && (
						<Pressable
							onPress={() => {
								WebBrowser.openBrowserAsync(service.register_url);
							}}
							className="flex-1 rounded-2xl bg-green px-7 py-4 shadow-sm"
						>
							<Text className="text-center font-bold text-black">
								登録ページ
							</Text>
						</Pressable>
					)}
				</View>
			</View>
		</ScrollView>
	);
}

