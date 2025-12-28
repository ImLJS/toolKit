import { useNavigate, useSearch } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const CATEGORIES = [
	{ id: "all", name: "All Tools" },
	{ id: "formatters", name: "Formatters" },
	{ id: "encoders", name: "Encoders" },
	{ id: "decoders", name: "Decoders" },
	{ id: "generators", name: "Generators" },
	{ id: "converters", name: "Converters" },
	{ id: "testers", name: "Testers" },
];

export const FilterBadges = () => {
	const { category, filter } = useSearch({ from: "/" });
	const navigate = useNavigate({ from: "/" });

	const handleCategoryClick = (categoryId: string) => {
		navigate({ search: { category: categoryId, filter: filter || "all" } });
	};

	const handleFilterClick = (filterType: string) => {
		navigate({ search: { category: category || "all", filter: filterType } });
	};

	return (
		<div className="border-b bg-background/95 backdrop-blur">
			<div className="container">
				{/* Filter Type Toggles */}
				<div className="flex justify-center gap-2 border-b py-3">
					<Badge
						className={cn(
							"cursor-pointer p-4 transition-all hover:scale-105",
							(!filter || filter === "all") &&
								"bg-primary text-primary-foreground",
						)}
						onClick={() => handleFilterClick("all")}
						variant="outline"
					>
						All Tools
					</Badge>
					<Badge
						className={cn(
							"cursor-pointer gap-1.5 p-4 transition-all hover:scale-105",
							filter === "favorited" &&
								"bg-amber-500 text-white hover:bg-amber-600",
						)}
						onClick={() => handleFilterClick("favorited")}
						variant="outline"
					>
						<Star
							className={cn(
								"h-3.5 w-3.5",
								filter === "favorited" && "fill-current",
							)}
						/>
						Favorited
					</Badge>
				</div>

				{/* Category Filters */}
				<div className="scrollbar-hide flex flex-nowrap gap-2 overflow-x-auto py-4 md:flex-wrap md:justify-center md:overflow-x-visible">
					{CATEGORIES.map((cat) => (
						<Badge
							className={cn(
								"cursor-pointer whitespace-nowrap px-4 py-4 transition-all hover:scale-105",
								category === cat.id
									? "bg-orange text-primary-foreground hover:bg-orange-secondary"
									: "",
							)}
							key={cat.id}
							onClick={() => handleCategoryClick(cat.id)}
							variant={"outline"}
						>
							{cat.name}
						</Badge>
					))}
				</div>
			</div>
		</div>
	);
};
