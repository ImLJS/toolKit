import { XIcon } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root>;

function Dialog(props: DialogProps) {
	return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

type DialogTriggerProps = React.ComponentProps<typeof DialogPrimitive.Trigger>;

function DialogTrigger(props: DialogTriggerProps) {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

type DialogPortalProps = React.ComponentProps<typeof DialogPrimitive.Portal>;

function DialogPortal(props: DialogPortalProps) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

type DialogCloseProps = React.ComponentProps<typeof DialogPrimitive.Close>;

function DialogClose(props: DialogCloseProps) {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

type DialogOverlayProps = React.ComponentProps<typeof DialogPrimitive.Overlay>;

function DialogOverlay(props: DialogOverlayProps) {
	const { className, ...rest } = props;

	return (
		<DialogPrimitive.Overlay
			className={cn(
				"fixed inset-0 z-50 bg-black/50",
				"data-[state=closed]:fade-out-0 data-[state=closed]:animate-out",
				"data-[state=open]:fade-in-0 data-[state=open]:animate-in",
				className,
			)}
			data-slot="dialog-overlay"
			{...rest}
		/>
	);
}

type DialogContentProps = React.ComponentProps<
	typeof DialogPrimitive.Content
> & {
	showCloseButton?: boolean;
};

function DialogContent(props: DialogContentProps) {
	const { className, children, showCloseButton = true, ...rest } = props;

	return (
		<DialogPortal data-slot="dialog-portal">
			<DialogOverlay />
			<DialogPrimitive.Content
				className={cn(
					"-translate-1/2 fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200",
					"sm:max-w-lg",
					"data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:animate-out",
					"data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:animate-in",
					className,
				)}
				data-slot="dialog-content"
				{...rest}
			>
				{children}
				{showCloseButton && (
					<DialogPrimitive.Close
						className={cn(
							"absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity",
							"hover:opacity-100",
							"focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2",
							"disabled:pointer-events-none",
							"data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
							"[&_svg]:pointer-events-none [&_svg]:shrink-0",
							"[&_svg:not([class*='size-'])]:size-4",
						)}
						data-slot="dialog-close"
					>
						<XIcon />
						<span className="sr-only">Close</span>
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Content>
		</DialogPortal>
	);
}

type DialogHeaderProps = React.ComponentProps<"div">;

function DialogHeader(props: DialogHeaderProps) {
	const { className, ...rest } = props;

	return (
		<div
			className={cn(
				"flex flex-col gap-2 text-center",
				"sm:text-left",
				className,
			)}
			data-slot="dialog-header"
			{...rest}
		/>
	);
}

type DialogFooterProps = React.ComponentProps<"div">;

function DialogFooter(props: DialogFooterProps) {
	const { className, ...rest } = props;

	return (
		<div
			className={cn(
				"flex flex-col-reverse gap-2",
				"sm:flex-row sm:justify-end",
				className,
			)}
			data-slot="dialog-footer"
			{...rest}
		/>
	);
}

type DialogTitleProps = React.ComponentProps<typeof DialogPrimitive.Title>;

function DialogTitle(props: DialogTitleProps) {
	const { className, ...rest } = props;

	return (
		<DialogPrimitive.Title
			className={cn("font-semibold text-lg leading-none", className)}
			data-slot="dialog-title"
			{...rest}
		/>
	);
}

type DialogDescriptionProps = React.ComponentProps<
	typeof DialogPrimitive.Description
>;

function DialogDescription(props: DialogDescriptionProps) {
	const { className, ...rest } = props;

	return (
		<DialogPrimitive.Description
			className={cn("text-muted-foreground text-sm", className)}
			data-slot="dialog-description"
			{...rest}
		/>
	);
}

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
};
