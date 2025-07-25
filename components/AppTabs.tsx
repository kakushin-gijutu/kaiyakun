import Image from "next/image";
import Link from "next/link";
import type { CategoryType } from "@/lib/type";
import { cn } from "@/lib/utils";

interface AppTabsProps {
	categories: CategoryType[];
	activeCategory: string;
	className?: string;
}

const AppTabs = ({ categories, activeCategory, className }: AppTabsProps) => {
	return (
		<div
			className={cn(
				"mb-8 flex flex-wrap justify-center gap-2 rounded-lg bg-base md:mb-12",
				className,
			)}
		>
			{categories.map((category) => (
				<Link
					key={category.id}
					href={`/?category=${category.id}`}
					scroll={false}
					className={`w-fit cursor-pointer whitespace-nowrap rounded-xl border-3 p-2 font-medium text-sm transition-all duration-200 ${
						activeCategory === category.id
							? "border-black text-black"
							: "border-gray text-gray hover:border-black hover:text-black"
					}`}
				>
					<div className="flex items-center justify-center gap-2">
						<Image
							src={category.icon.url}
							width={20}
							height={20}
							alt={category.title}
							className="object-contain"
						/>
						<p>{category.title}</p>
					</div>
				</Link>
			))}
		</div>
	);
};

export default AppTabs;
