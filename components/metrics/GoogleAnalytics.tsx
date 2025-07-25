"use client";

import {
	GoogleAnalytics as GoogleAnalyticsComponent,
	GoogleTagManager,
} from "@next/third-parties/google";

export default function GoogleAnalytics() {
	return (
		<>
			<GoogleAnalyticsComponent gaId="G-PH5F749L6L" />
			<GoogleTagManager gtmId="GTM-5N4T8KRC" />
		</>
	);
}
