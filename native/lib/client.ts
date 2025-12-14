import Constants from "expo-constants";
import { createClient } from "microcms-js-sdk";

// Expoでは、EXPO_PUBLIC_プレフィックス付きの環境変数はprocess.envでアクセス可能
// または、app.config.tsのextraから取得
const getEnvVar = (key: string): string | undefined => {
	// まずEXPO_PUBLIC_プレフィックス付きを試す
	const expoPublicKey = `EXPO_PUBLIC_${key}`;
	if (process.env[expoPublicKey]) {
		return process.env[expoPublicKey];
	}
	// 次に通常の環境変数を試す（開発時のみ）
	if (__DEV__ && process.env[key]) {
		return process.env[key];
	}
	// 最後にConstants.expoConfig.extraから取得（ビルド時）
	return Constants.expoConfig?.extra?.[key] as string | undefined;
};

const microcmsDomain = getEnvVar("MICRO_CMS_DOMAIN");
const microcmsApiKey = getEnvVar("MICRO_CMS_API_KEY");

if (!microcmsDomain || !microcmsApiKey) {
	throw new Error(
		"MICRO_CMS_DOMAIN and MICRO_CMS_API_KEY must be set in environment variables",
	);
}

export const client = createClient({
	serviceDomain: microcmsDomain,
	apiKey: microcmsApiKey,
});
