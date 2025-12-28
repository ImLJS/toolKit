import { createFileRoute } from "@tanstack/react-router";
import { PackageOpen, Star } from "lucide-react";
import { FilterBadges } from "@/components/features/home/filters";
import { Hero } from "@/components/features/home/hero";
import { ToolCard } from "@/components/features/home/toolcard";
import { TOOLS } from "@/constants/tools";
import { useFavorites } from "@/hooks/useFavorites";

export const Route = createFileRoute("/")({
	component: App,
	validateSearch: (search: Record<string, unknown>) => ({
		category: (search.category as string) || "all",
		filter: (search.filter as string) || "all",
	}),
});

function App() {
	const { category, filter } = Route.useSearch();
	const { favoritedTools } = useFavorites();

	let filteredTools = TOOLS;

	// Filter by category
	if (category !== "all") {
		filteredTools = filteredTools.filter((tool) => tool.category === category);
	}

	// Filter by favorited status
	if (filter === "favorited") {
		filteredTools = filteredTools.filter((tool) => favoritedTools.has(tool.id));
	}

	return (
		<>
			<Hero />
			<FilterBadges />
			{filteredTools.length === 0 ? (
				<div className="flex min-h-100 flex-col items-center justify-center p-8 text-center">
					<div className="mb-4 rounded-full bg-muted p-6">
						{filter === "favorited" ? (
							<Star className="h-12 w-12 text-muted-foreground" />
						) : (
							<PackageOpen className="h-12 w-12 text-muted-foreground" />
						)}
					</div>
					<h3 className="mb-2 font-semibold text-xl">
						{filter === "favorited"
							? "No Favorited Tools Yet"
							: "No Tools Found"}
					</h3>
					<p className="max-w-md text-muted-foreground">
						{filter === "favorited"
							? "Start exploring and favorite your most-used tools for quick access."
							: `No tools found in the "${category}" category. Try selecting a different category.`}
					</p>
				</div>
			) : (
				<div className="grid gap-6 p-3 sm:grid-cols-2 lg:grid-cols-3">
					{filteredTools.map((tool, index) => (
						<div
							className="fade-in animate-in"
							key={`${category}-${filter}-${tool.id}`}
							style={{
								animationDuration: "0.5s",
								animationDelay: `${index * 0.05}s`,
								animationFillMode: "backwards",
							}}
						>
							<ToolCard category={category} tool={tool} />
						</div>
					))}
				</div>
			)}
		</>
	);
}
