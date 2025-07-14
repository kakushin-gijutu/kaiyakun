"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CategoryType } from "@/lib/type";

const AppTabs = ({ categories }: { categories: CategoryType[] }) => {
	const searchParams = useSearchParams();
	const searchQuery = searchParams.get("category");
	const [activeCategory, setActiveCategory] = useState(
		searchQuery ?? categories[0].id,
	);
	const router = useRouter();

	useEffect(() => {
		router.push(`?category=${activeCategory}`);
	}, [activeCategory]);

	return (
		<Tabs defaultValue={activeCategory} className="w-full mb-28 md:mb-10">
			<TabsList className="w-full grid grid-cols-2 sm:grid-cols-5 gap-2 p-2 bg-orange-50 rounded-lg">
				{categories.map((category) => (
					<TabsTrigger
						key={category.id}
						value={category.id}
						onClick={() => setActiveCategory(category.id)}
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
						{category.title}
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
	);
};

export default AppTabs;
