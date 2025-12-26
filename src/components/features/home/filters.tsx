import { useNavigate, useSearch } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const CATEGORIES = [
	{ id: "all", name: "All Tools" },
	{ id: "formatters", name: "Formatters" },
	{ id: "encoders", name: "Encoders" },
];

export const FilterBadges = () => {
	const { category } = useSearch({ from: "/" });
	const navigate = useNavigate({ from: "/" });

	return (
		<div className="border-b bg-background/95 backdrop-blur">
			<div className="container">
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
							onClick={() => navigate({ search: { category: cat.id } })}
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
