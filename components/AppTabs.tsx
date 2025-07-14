import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CategoryType } from "@/lib/type";

interface AppTabsProps {
	categories: CategoryType[];
	activeCategory: string;
}

const AppTabs = ({ categories, activeCategory }: AppTabsProps) => {
	return (
		<Tabs value={activeCategory} className="w-full mb-28 md:mb-10">
			<TabsList className="w-full grid grid-cols-2 sm:grid-cols-5 gap-2 p-2 bg-orange-50 rounded-lg">
				{categories.map((category) => (
					<TabsTrigger
						key={category.id}
						value={category.id}
						asChild
						className={`
              py-2 px-4 text-sm font-medium rounded-md transition-all duration-200
              ${
								activeCategory === category.id
									? "bg-orange-100 text-orange-800 shadow-sm"
									: "bg-neutral-100 text-neutral-500 hover:bg-orange-200"
							}
              data-[state=active]:bg-orange-200 
              data-[state=active]:text-orange-800 
              data-[state=active]:shadow-sm
              whitespace-nowrap
            `}
					>
						<Link href={`/?category=${category.id}`}>{category.title}</Link>
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
	);
};

export default AppTabs;
