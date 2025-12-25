import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { TOOLS } from "@/constants/tools";

export const Route = createFileRoute("/tools/$toolName")({
	component: ToolComponent,
});

function ToolComponent() {
	const { toolName } = Route.useParams();
	const tool = TOOLS.find((t) => t.url === `/tools/${toolName}`);
	if (!tool) {
		return <div>Tool not found</div>;
	}
	const LazyTool = getToolComponent(toolName);
	return (
		<div className="container mx-auto">
			<div className="mb-6 border-b py-4">
				<h1 className="mb-2 text-center font-bold text-3xl">{tool.name}</h1>
				<p className="text-center text-lg text-muted-foreground">
					{tool.description}
				</p>
			</div>
			<Suspense fallback={<div>Loading tool…</div>}>
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
