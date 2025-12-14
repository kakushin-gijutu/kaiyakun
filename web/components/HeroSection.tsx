import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
	return (
		<div className="relative mb-[520px] space-y-24 rounded-b-[100px] bg-base py-12 md:mb-[240px] md:rounded-b-[420px]">
			<div className="space-y-2">
				<Link href="/" className="block">
					<Image
						src="/icons/logo.svg"
						alt="解約くん"
						width={300}
						height={50}
						fetchPriority="high"
						priority
						className="mx-auto object-contain"
					/>
				</Link>
				<p className="text-center font-medium text-xs">
					面倒なサブスクの解約ページに一瞬で。
				</p>
			</div>
			<div className="mx-auto grid max-w-4xl grid-cols-1 gap-12 px-4 pb-[40px] md:grid-cols-2 md:place-items-center md:gap-2 md:px-12 md:pb-[180px] lg:px-4">
				<div className="space-y-4">
					<h1 className="font-bold text-[42px] leading-[160%] tracking-[10%] lg:text-[60px]">
						退会、解約、
						<br />
						もう迷わない。
					</h1>
					<p className="font-bold text-2xl tracking-widest">
						サブスク整理、
						<br className="block md:hidden" />
						ここからはじめよう
					</p>
				</div>
				<Image
					src="/images/hero.svg"
					alt="hero"
					width={237}
					height={280}
					className="ml-auto h-[231px] w-[195px] object-contain md:h-[280px] md:w-[237px]"
					fetchPriority="high"
				/>
			</div>
			<Image
				src="/images/banner_SP.png"
				alt="banner"
				width={258}
				height={592}
				className="-translate-x-1/2 -bottom-[580px] absolute left-1/2 w-full object-contain px-2 md:hidden"
			/>
			<Image
				src="/images/banner_PC.png"
				alt="banner"
				width={608}
				height={355}
				className="-translate-x-1/2 -bottom-[150px] absolute left-1/2 hidden object-contain md:block"
			/>
		</div>
	);
}
