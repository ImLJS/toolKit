import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/features/home/hero";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return <Hero />;
}
