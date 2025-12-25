import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const CATEGORIES = [
	{ id: "all", name: "All Tools" },
	{ id: "formatters", name: "Formatters" },
	{ id: "converters", name: "Converters" },
	{ id: "validators", name: "Validators" },
	{ id: "generators", name: "Generators" },
	{ id: "utilities", name: "Utilities" },
];

export const FilterBadges = () => {
	const [selectedCategory, setSelectedCategory] = useState("all");

	return (
		<div className="border-b bg-background/95 backdrop-blur">
			<div className="container">
				<div className="scrollbar-hide flex flex-nowrap gap-2 overflow-x-auto py-4 md:flex-wrap md:justify-center md:overflow-x-visible">
					{CATEGORIES.map((category) => (
						<Badge
							className={cn(
								"cursor-pointer whitespace-nowrap px-4 py-4 transition-all hover:scale-105",
								selectedCategory === category.id
									? "bg-orange text-primary-foreground hover:bg-orange-secondary"
									: "",
							)}
							key={category.id}
							onClick={() => setSelectedCategory(category.id)}
							variant={"outline"}
						>
							{category.name}
						</Badge>
					))}
				</div>
			</div>
		</div>
	);
};
