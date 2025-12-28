import { Link } from "@tanstack/react-router";
import { FaGithub } from "react-icons/fa6";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { CommandMenu } from "../common/command-menu";
import { Button } from "../ui/button";

export const Header = () => {
	return (
		<header className="flex h-16 items-center justify-between border-b px-4">
			<Button className="rounded-full" variant="outline">
				<Link
					className="flex shrink-0 items-center"
					search={{ category: "all", filter: "all" }}
					to="/"
				>
					LJ
				</Link>
			</Button>
			<div className="flex items-center justify-center gap-3">
				<CommandMenu />
				<ThemeToggle />
				<Button size={"icon"} variant="ghost">
					<a
						aria-label="GitHub Repository"
						href="https://github.com/ImLJS/toolKit"
						rel="noreferrer"
						target="_blank"
					>
						<FaGithub size={18} />
					</a>
				</Button>
			</div>
		</header>
	);
};
