import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "./dialog";

type CommandProps = React.ComponentProps<typeof CommandPrimitive>;

function Command(props: CommandProps) {
	const { className, ...rest } = props;

	return (
		<CommandPrimitive
			className={cn(
				"flex size-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
				className,
			)}
			data-slot="command"
			{...rest}
		/>
	);
}

type CommandDialogProps = React.ComponentProps<typeof Dialog> & {
	title?: string;
	description?: string;
	className?: string;
	showCloseButton?: boolean;
};

function CommandDialog(props: CommandDialogProps) {
	const {
		title = "Command Palette",
		description = "Search for a command to run...",
		children,
		className,
		showCloseButton = true,
		...rest
	} = props;

	return (
		<Dialog {...rest}>
			<DialogHeader className="sr-only">
				<DialogTitle>{title}</DialogTitle>
				<DialogDescription>{description}</DialogDescription>
			</DialogHeader>
			<DialogContent
				className={cn("overflow-hidden p-0", className)}
				showCloseButton={showCloseButton}
			>
				<Command
					className={cn(
						"**:data-[slot=command-input-wrapper]:h-12 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground **:[[cmdk-group]]:px-2 **:[[cmdk-input]]:h-12 **:[[cmdk-item]]:px-2 **:[[cmdk-item]]:py-3",
						"[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0",
						"[&_[cmdk-input-wrapper]_svg]:size-5",
						"[&_[cmdk-item]_svg]:size-5",
					)}
				>
					{children}
				</Command>
			</DialogContent>
		</Dialog>
	);
}

type CommandInputProps = React.ComponentProps<typeof CommandPrimitive.Input>;

function CommandInput(props: CommandInputProps) {
	const { className, ...rest } = props;

	return (
		<div
			className="flex h-9 items-center gap-2 border-b px-3"
			data-slot="command-input-wrapper"
		>
			<SearchIcon className="size-4 shrink-0 opacity-50" />
			<CommandPrimitive.Input
				className={cn(
					"flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden",
					"disabled:cursor-not-allowed disabled:opacity-50",
					"placeholder:text-muted-foreground",
					className,
				)}
				data-slot="command-input"
				{...rest}
			/>
		</div>
	);
}

type CommandListProps = React.ComponentProps<typeof CommandPrimitive.List>;

function CommandList(props: CommandListProps) {
	const { className, ...rest } = props;

	return (
		<CommandPrimitive.List
			className={cn(
				"max-h-75 scroll-py-1 overflow-y-auto overflow-x-hidden",
				className,
			)}
			data-slot="command-list"
			{...rest}
		/>
	);
}

type CommandEmptyProps = React.ComponentProps<typeof CommandPrimitive.Empty>;

function CommandEmpty(props: CommandEmptyProps) {
	const { className, ...rest } = props;

	return (
		<CommandPrimitive.Empty
			className={cn("py-6 text-center text-sm", className)}
			data-slot="command-empty"
			{...rest}
		/>
	);
}

type CommandGroupProps = React.ComponentProps<typeof CommandPrimitive.Group>;

function CommandGroup(props: CommandGroupProps) {
	const { className, ...rest } = props;

	return (
		<CommandPrimitive.Group
			className={cn(
				"overflow-hidden p-1 text-foreground",
				"**:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground **:[[cmdk-group-heading]]:text-xs",
				className,
			)}
			data-slot="command-group"
			{...rest}
		/>
	);
}

type CommandSeparatorProps = React.ComponentProps<
	typeof CommandPrimitive.Separator
>;

function CommandSeparator(props: CommandSeparatorProps) {
	const { className, ...rest } = props;

	return (
		<CommandPrimitive.Separator
			className={cn("-mx-1 h-px bg-border", className)}
			data-slot="command-separator"
			{...rest}
		/>
	);
}

type CommandItemProps = React.ComponentProps<typeof CommandPrimitive.Item>;

function CommandItem(props: CommandItemProps) {
	const { className, ...rest } = props;

	return (
		<CommandPrimitive.Item
			className={cn(
				"relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden",
				"data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
				"data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
				"[&_svg]:pointer-events-none [&_svg]:shrink-0",
				"[&_svg:not([class*='text-'])]:text-muted-foreground",
				"[&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			data-slot="command-item"
			{...rest}
		/>
	);
}

type CommandShortcutProps = React.ComponentProps<"span">;

function CommandShortcut(props: CommandShortcutProps) {
	const { className, ...rest } = props;

	return (
		<span
			className={cn(
				"ml-auto text-muted-foreground text-xs tracking-widest",
				className,
			)}
			data-slot="command-shortcut"
			{...rest}
		/>
	);
}

export {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
};
