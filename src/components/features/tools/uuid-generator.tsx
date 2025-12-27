import { Check, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const UUIDGeneratorTool = () => {
	const [output, setOutput] = useState("");
	const [copied, setCopied] = useState(false);

	const generate = () => {
		setOutput(crypto.randomUUID());
	};

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(output);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	const clearAll = () => {
		setOutput("");
	};

	return (
		<div className="space-y-6">
			<div className="grid gap-6 px-2 lg:grid-cols-1">
				<Card className="p-6">
					<div className="mb-4 flex items-center justify-between">
						<h2 className="font-semibold text-xl">Generated UUID</h2>
						<div className="flex gap-2">
							{output && (
								<Button onClick={copyToClipboard} size="sm" variant="outline">
									{copied ? (
										<>
											<Check className="mr-1 h-4 w-4" />
											Copied!
										</>
									) : (
										<>
											<Copy className="mr-1 h-4 w-4" />
											Copy
										</>
									)}
								</Button>
							)}
							<Button onClick={clearAll} size="sm" variant="outline">
								Clear
							</Button>
						</div>
					</div>

					<Textarea
						className="min-h-32 bg-muted font-mono text-sm"
						placeholder="Generated UUID will appear here..."
						readOnly
						value={output}
					/>
				</Card>
			</div>

			<div className="flex justify-center gap-3 px-2">
				<Button
					className="w-full max-w-xs"
					onClick={generate}
					size="lg"
					variant="default"
				>
					<RefreshCw className="mr-2 h-5 w-5" />
					Generate UUID
					<kbd className="ml-2 hidden rounded bg-primary-foreground/20 px-1.5 py-0.5 font-mono text-xs sm:inline-block">
						⌘↵
					</kbd>
				</Button>
			</div>
		</div>
	);
};

export default UUIDGeneratorTool;
