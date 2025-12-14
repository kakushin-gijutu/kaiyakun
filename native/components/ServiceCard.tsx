import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import type { ServiceType } from "@/lib/type";

interface ServiceCardProps {
	service: ServiceType;
}

export default function ServiceCard({ service }: ServiceCardProps) {
	const router = useRouter();

	return (
		<View className="flex w-full items-center justify-center gap-4 p-4">
			<View className="relative h-[200px] w-[200px] rounded-full bg-white p-2">
				<View className="flex h-full w-full items-center justify-center rounded-full border-2 border-dotted border-orange p-4">
					<Image
						source={{ uri: service.image.url }}
						style={{ width: 200, height: 200 }}
						contentFit="contain"
					/>
				</View>
			</View>
			<View className="space-y-1">
				<Text className="text-center text-xl font-bold">{service.title}</Text>
				<Text className="text-center text-xs font-medium text-gray">
					{service.description}
				</Text>
			</View>
			<View className="flex-row items-center gap-4">
				<Pressable
					onPress={() => {
						router.push({
							pathname: "/cancel/[id]",
							params: { id: service.id },
						});
					}}
					className="rounded-2xl bg-red px-7 py-3 shadow-sm"
				>
					<Text className="font-bold text-black">解約する</Text>
				</Pressable>
				<Pressable
					onPress={() => {
						router.push({
							pathname: "/service/[id]",
							params: { id: service.id },
						});
					}}
					className="rounded-2xl bg-green px-7 py-3 shadow-sm"
				>
					<Text className="font-bold text-black">詳細</Text>
				</Pressable>
			</View>
		</View>
	);
}

