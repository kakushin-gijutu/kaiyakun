import { Suspense } from "react";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import MainSection from "@/components/MainSection";
import Loading from "./loading";

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	return (
		<main className="min-h-screen text-black">
			<HeroSection />
			<Suspense fallback={<Loading />}>
				<MainSection searchParams={searchParams} />
			</Suspense>
			<Footer />
		</main>
	);
}
