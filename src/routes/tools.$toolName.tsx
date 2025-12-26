import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { lazy, Suspense } from "react";
import { InfoButton } from "@/components/common/info-button";
import { Spinner } from "@/components/ui/spinner";
import { TOOLS } from "@/constants/tools";

export const Route = createFileRoute("/tools/$toolName")({
	component: ToolComponent,
	validateSearch: (search: Record<string, unknown>) => ({
		category: (search.category as string) || "all",
	}),
});

function ToolComponent() {
	const { toolName } = Route.useParams();
	const { category } = Route.useSearch();
	const tool = TOOLS.find((t) => t.url === `/tools/${toolName}`);
	if (!tool) {
		return <div>Tool not found</div>;
	}
	const LazyTool = getToolComponent(toolName);
	return (
		<div className="container mx-auto">
			<div className="border-b py-4">
				<h1 className="mb-2 text-center font-bold text-3xl">{tool.name}</h1>
				<p className="text-center text-lg text-muted-foreground">
					{tool.description}
				</p>
			</div>
			<div className="container mb-6 flex items-center justify-between border-b px-2 py-3">
				<Link
					className="inline-flex items-center text-muted-foreground text-sm transition-colors hover:text-foreground"
					search={{ category }}
					to="/"
				>
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back to Tools
				</Link>
				<InfoButton tool={tool} />
			</div>
			<Suspense
				fallback={
					<div className="flex justify-center py-8">
						<Spinner className="h-8 w-8" />
					</div>
				}
			>
				<LazyTool />
			</Suspense>
		</div>
	);
}

function getToolComponent(toolName: string) {
	return lazy(async () => {
		try {
			return await import(`@/components/features/tools/${toolName}.tsx`);
		} catch {
			return { default: () => <div>Tool not found</div> };
		}
	});
}
