import { NextResponse } from "next/server";
import { client } from "@/lib/client";
import type { ServiceResponseType } from "@/lib/type";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const category = searchParams.get("category") || "";
		const { contents } = await client.get<ServiceResponseType>({
			endpoint: "services",
			queries: {
				filters: category ? `category[contains]${category}` : undefined,
			},
		});
		return NextResponse.json({ contents: contents || [] });
	} catch (error) {
		console.error("Failed to fetch services", error);
		return NextResponse.json({ contents: [] }, { status: 500 });
	}
}
