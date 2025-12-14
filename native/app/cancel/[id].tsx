import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { WebView } from "react-native-webview";
import { client } from "@/lib/client";
import type { ServiceType } from "@/lib/type";

export default function CancelWebViewScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();
	const [service, setService] = useState<ServiceType | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [webViewLoading, setWebViewLoading] = useState(true);

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

	const handleGoBack = () => {
		router.back();
	};

	if (loading) {
		return (
			<View className="flex-1 items-center justify-center bg-base">
				<ActivityIndicator size="large" color="#000" />
				<Text className="mt-4 text-gray">読み込み中...</Text>
			</View>
		);
	}

	if (error || !service || !service.cancel_url) {
		return (
			<View className="flex-1 items-center justify-center bg-base px-4">
				<Text className="mb-4 text-center text-red-500">
					{error || "解約URLが見つかりませんでした"}
				</Text>
				<Pressable
					onPress={handleGoBack}
					className="rounded-lg bg-gray px-6 py-3"
				>
					<Text className="font-medium text-black">戻る</Text>
				</Pressable>
			</View>
		);
	}

	return (
		<View className="flex-1 bg-base">
			<View className="flex-row items-center justify-between border-b border-gray bg-white px-4 py-3">
				<Pressable onPress={handleGoBack} className="px-2 py-1">
					<Text className="text-base font-medium text-black">← 戻る</Text>
				</Pressable>
				<Text className="flex-1 text-center text-base font-bold">
					{service.title} 解約ページ
				</Text>
				<View className="w-16" />
			</View>

			{webViewLoading && (
				<View className="absolute inset-0 flex items-center justify-center bg-white">
					<ActivityIndicator size="large" color="#000" />
					<Text className="mt-4 text-gray">読み込み中...</Text>
				</View>
			)}

			<WebView
				source={{ uri: service.cancel_url }}
				onLoadStart={() => setWebViewLoading(true)}
				onLoadEnd={() => setWebViewLoading(false)}
				onError={(syntheticEvent) => {
					const { nativeEvent } = syntheticEvent;
					setError(`WebViewエラー: ${nativeEvent.description}`);
					setWebViewLoading(false);
				}}
				style={{ flex: 1 }}
				javaScriptEnabled={true}
				domStorageEnabled={true}
				startInLoadingState={true}
				scalesPageToFit={true}
			/>
		</View>
	);
}

