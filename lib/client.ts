import { createClient } from "microcms-js-sdk";

export const client = createClient({
	serviceDomain: process.env.MICRO_CMS_DOMAIN as string,
	apiKey: process.env.MICRO_CMS_API_KEY as string,
});
