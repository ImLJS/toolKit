import { InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

interface InfoButtonProps {
	tool: {
		name: string;
		info: string;
	};
}

export const InfoButton = ({ tool }: InfoButtonProps) => {
	return (
		<Dialog modal={false}>
			<DialogTrigger asChild>
				<Button size="icon" variant="outline">
					<InfoIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="mb-3">About {tool.name}</DialogTitle>
					<DialogDescription>{tool.info}</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
