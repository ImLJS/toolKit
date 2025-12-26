import { createFileRoute } from "@tanstack/react-router";
import { FilterBadges } from "@/components/features/home/filters";
import { Hero } from "@/components/features/home/hero";
import { ToolCard } from "@/components/features/home/toolcard";
import { TOOLS } from "@/constants/tools";

export const Route = createFileRoute("/")({
	component: App,
	validateSearch: (search: Record<string, unknown>) => ({
		category: (search.category as string) || "all",
	}),
});

function App() {
	const { category } = Route.useSearch();
	const filteredTools =
		category === "all"
			? TOOLS
			: TOOLS.filter((tool) => tool.category === category);

	return (
		<>
			<Hero />
			<FilterBadges />
			<div className="grid gap-6 p-3 sm:grid-cols-2 lg:grid-cols-3">
				{filteredTools.map((tool) => (
					<ToolCard key={tool.id} tool={tool} />
				))}
			</div>
		</>
	);
}
