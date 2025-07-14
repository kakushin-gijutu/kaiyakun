"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoryType } from "@/lib/type";
import { useRouter, useSearchParams } from "next/navigation";

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
		<Tabs defaultValue="video" className="w-full mb-2">
			<TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 gap-y-2">
				{categories.map((category) => (
					<TabsTrigger
						key={category.id}
						value={category.id}
						onClick={() => setActiveCategory(category.id)}
						className={`${
							activeCategory === category.id
								? "bg-orange-200 text-orange-800"
								: ""
						}  data-[state=active]:bg-orange-200 data-[state=active]:text-orange-800 `}
					>
						{category.title}
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
	);
};

export default AppTabs;
