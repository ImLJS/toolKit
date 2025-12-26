import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { Heart, Star } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface Tool {
	id: number;
	name: string;
	description: string;
	url: string;
	tags: string[];
	image: string;
}

export const ToolCard = ({ tool }: { tool: Tool }) => {
	const [isLiked, setIsLiked] = useState(false);
	const [isFavorited, setIsFavorited] = useState(false);

	return (
		<Link className="block h-full" to={tool.url}>
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
							aria-label="Like"
							className={`h-9 w-9 rounded-full backdrop-blur-md transition-all duration-200 ${
								isLiked
									? "bg-red-500 text-white hover:bg-red-600"
									: "bg-background/90 hover:scale-110 hover:bg-background"
							}`}
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								setIsLiked(!isLiked);
							}}
							size="sm"
							variant="ghost"
						>
							<Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
						</Button>

						<Button
							aria-label="Favourite"
							className={`h-9 w-9 rounded-full backdrop-blur-md transition-all duration-200 ${
								isFavorited
									? "bg-amber-500 text-white hover:bg-amber-600"
									: "bg-background/90 hover:scale-110 hover:bg-background"
							}`}
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								setIsFavorited(!isFavorited);
							}}
							size="sm"
							variant="ghost"
						>
							<Star
								className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`}
							/>
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
