import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useFavorites } from "@/hooks/useFavorites";

interface Tool {
	id: number;
	name: string;
	description: string;
	url: string;
	tags: string[];
	image: string;
}

export const ToolCard = ({
	tool,
	category,
}: {
	tool: Tool;
	category: string;
}) => {
	const { isFavorited, toggleFavorite } = useFavorites();
	const favorited = isFavorited(tool.id);

	return (
		<Link className="block h-full" search={{ category }} to={tool.url}>
			<Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
				<div className="relative h-48 w-full overflow-hidden">
					<div className="absolute inset-0 z-10 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
					<Image
						alt={tool.name}
						className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
						height={832}
						src={tool.image}
						width={1280}
					/>

					<div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
						<Button
							aria-label="Favourite"
							className={
								favorited
									? "h-9 w-9 rounded-full border-0 bg-amber-500 text-white backdrop-blur-md transition-all duration-200 hover:bg-amber-600 hover:text-white"
									: "h-9 w-9 rounded-full border-0 bg-background/90 text-foreground backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-background/90 hover:text-foreground"
							}
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								toggleFavorite(tool.id);
							}}
							size="sm"
						>
							<Star className={`h-4 w-4 ${favorited ? "fill-current" : ""}`} />
						</Button>
					</div>
				</div>

				<div className="flex flex-1 flex-col p-5">
					<CardHeader className="mb-3 p-0">
						<CardTitle className="mb-2 font-semibold text-xl transition-colors group-hover:text-[#FF8C42]">
							{tool.name}
						</CardTitle>
						<CardDescription className="text-sm leading-relaxed">
							{tool.description}
						</CardDescription>
					</CardHeader>

					<div className="mt-auto flex flex-wrap gap-2">
						{tool.tags.map((tag) => (
							<Badge
								className="rounded-full px-3 py-1 font-medium text-xs"
								key={tag}
								variant="secondary"
							>
								{tag}
							</Badge>
						))}
					</div>
				</div>
			</Card>
		</Link>
	);
};
