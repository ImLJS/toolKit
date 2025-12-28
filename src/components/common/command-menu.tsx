import { useNavigate } from "@tanstack/react-router";
import {
	Clock,
	Code2,
	FileJson,
	Hash,
	Key,
	Palette,
	TestTube2,
	Type,
} from "lucide-react";
import * as React from "react";
import { IoSearch } from "react-icons/io5";

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import { TOOLS } from "@/constants/tools";
import { Button } from "../ui/button";

const TOOL_ICONS: Record<string, React.ReactNode> = {
	"JSON Formatter": <FileJson className="mr-2 h-4 w-4" />,
	"Base64 Encoder & Decoder": <Code2 className="mr-2 h-4 w-4" />,
	"URL Encoder": <Code2 className="mr-2 h-4 w-4" />,
	"UUID Generator": <Hash className="mr-2 h-4 w-4" />,
	"Hash Generator": <Hash className="mr-2 h-4 w-4" />,
	"Text Case Converter": <Type className="mr-2 h-4 w-4" />,
	"Lorem Ipsum Generator": <Type className="mr-2 h-4 w-4" />,
	"Color Converter": <Palette className="mr-2 h-4 w-4" />,
	"Timestamp Converter": <Clock className="mr-2 h-4 w-4" />,
	"JWT Decoder": <Key className="mr-2 h-4 w-4" />,
	"HTML Entities Encoder": <Code2 className="mr-2 h-4 w-4" />,
	"Regex Tester": <TestTube2 className="mr-2 h-4 w-4" />,
};

export const CommandMenu = () => {
	const [open, setOpen] = React.useState(false);
	const navigate = useNavigate();

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	const handleSelectTool = (url: string) => {
		setOpen(false);
		navigate({ to: url });
	};

	const categories = {
		formatters: TOOLS.filter((t) => t.category === "formatters"),
		encoders: TOOLS.filter(
			(t) => t.category === "encoders" || t.category === "decoders",
		),
		generators: TOOLS.filter((t) => t.category === "generators"),
		converters: TOOLS.filter((t) => t.category === "converters"),
		testers: TOOLS.filter((t) => t.category === "testers"),
	};

	return (
		<>
			<Button onClick={() => setOpen(true)} size="icon" variant="ghost">
				<IoSearch size={18} />
			</Button>
			<CommandDialog onOpenChange={setOpen} open={open}>
				<CommandInput placeholder="Search for a tool..." />
				<CommandList>
					<CommandEmpty>No tools found.</CommandEmpty>

					{categories.formatters.length > 0 && (
						<>
							<CommandGroup heading="Formatters">
								{categories.formatters.map((tool) => (
									<CommandItem
										key={tool.id}
										onSelect={() => handleSelectTool(tool.url)}
									>
										{TOOL_ICONS[tool.name]}
										<span>{tool.name}</span>
									</CommandItem>
								))}
							</CommandGroup>
							<CommandSeparator />
						</>
					)}

					{categories.encoders.length > 0 && (
						<>
							<CommandGroup heading="Encoders & Decoders">
								{categories.encoders.map((tool) => (
									<CommandItem
										key={tool.id}
										onSelect={() => handleSelectTool(tool.url)}
									>
										{TOOL_ICONS[tool.name]}
										<span>{tool.name}</span>
									</CommandItem>
								))}
							</CommandGroup>
							<CommandSeparator />
						</>
					)}

					{categories.generators.length > 0 && (
						<>
							<CommandGroup heading="Generators">
								{categories.generators.map((tool) => (
									<CommandItem
										key={tool.id}
										onSelect={() => handleSelectTool(tool.url)}
									>
										{TOOL_ICONS[tool.name]}
										<span>{tool.name}</span>
									</CommandItem>
								))}
							</CommandGroup>
							<CommandSeparator />
						</>
					)}

					{categories.converters.length > 0 && (
						<>
							<CommandGroup heading="Converters">
								{categories.converters.map((tool) => (
									<CommandItem
										key={tool.id}
										onSelect={() => handleSelectTool(tool.url)}
									>
										{TOOL_ICONS[tool.name]}
										<span>{tool.name}</span>
									</CommandItem>
								))}
							</CommandGroup>
							<CommandSeparator />
						</>
					)}

					{categories.testers.length > 0 && (
						<CommandGroup heading="Testers">
							{categories.testers.map((tool) => (
								<CommandItem
									key={tool.id}
									onSelect={() => handleSelectTool(tool.url)}
								>
									{TOOL_ICONS[tool.name]}
									<span>{tool.name}</span>
								</CommandItem>
							))}
						</CommandGroup>
					)}
				</CommandList>
			</CommandDialog>
		</>
	);
};
