import { ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToolProcessor } from "@/hooks/useToolProcessor";

const processor = (input: string, mode?: "encode" | "decode"): string => {
	if (mode === "encode") {
		return input
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#39;")
			.replace(/\//g, "&#x2F;");
	} else {
		return input
			.replace(/&lt;/g, "<")
			.replace(/&gt;/g, ">")
			.replace(/&quot;/g, '"')
			.replace(/&#39;/g, "'")
			.replace(/&#x2F;/g, "/")
			.replace(/&amp;/g, "&");
	}
};

const examples = {
	encode: '<div class="example">Hello & Welcome!</div>',
	decode:
		"&lt;div class=&quot;example&quot;&gt;Hello &amp; Welcome!&lt;/div&gt;",
};

const HtmlEntitiesEncoderTool = () => {
	const {
		mode,
		setMode,
		input,
		setInput,
		output,
		copied,
		process,
		copyToClipboard,
		clearAll,
		loadExample,
		swapMode,
	} = useToolProcessor({
		processor,
		initialMode: "encode",
		examples,
	});

	return (
		<div className="space-y-6">
			<div className="flex justify-center px-2">
				<div className="inline-flex rounded-lg border p-1">
					<Button
						className="rounded-md"
						onClick={() => setMode("encode")}
						size="sm"
						variant={mode === "encode" ? "default" : "ghost"}
					>
						Encode
					</Button>
					<Button
						className="rounded-md"
						onClick={() => setMode("decode")}
						size="sm"
						variant={mode === "decode" ? "default" : "ghost"}
					>
						Decode
					</Button>
				</div>
			</div>

			<div className="grid gap-6 px-2 lg:grid-cols-2">
				<Card className="p-6">
					<div className="mb-4 flex items-center justify-between">
						<h2 className="font-semibold text-xl">Input</h2>
						<div className="flex gap-2">
							<Button onClick={loadExample} size="sm" variant="ghost">
								Example
							</Button>
							<Button onClick={clearAll} size="sm" variant="outline">
								Clear
							</Button>
						</div>
					</div>

					<Textarea
						className="min-h-125 font-mono text-sm"
						onChange={(e) => setInput(e.target.value)}
						placeholder={
							mode === "encode"
								? "Enter HTML to encode..."
								: "Enter encoded HTML entities..."
						}
						value={input}
					/>
				</Card>

				<Card className="p-6">
					<div className="mb-4 flex items-center justify-between">
						<h2 className="font-semibold text-xl">Output</h2>
						{output && (
							<Button onClick={copyToClipboard} size="sm" variant="outline">
								{copied ? "Copied!" : "Copy"}
							</Button>
						)}
					</div>

					<Textarea
						className="min-h-125 bg-muted font-mono text-sm"
						placeholder={
							mode === "encode"
								? "Encoded HTML entities will appear here..."
								: "Decoded HTML will appear here..."
						}
						readOnly
						value={output}
					/>
				</Card>
			</div>

			<div className="flex justify-center gap-3 px-2">
				<Button onClick={swapMode} size="lg" variant="outline">
					<ArrowLeftRight className="mr-2 h-5 w-5" />
					Swap
				</Button>
				<Button
					className="w-full max-w-xs"
					disabled={!input}
					onClick={process}
					size="lg"
				>
					{mode === "encode" ? "Encode" : "Decode"}
					<kbd className="ml-2 hidden rounded bg-primary-foreground/20 px-1.5 py-0.5 font-mono text-xs sm:inline-block">
						⌘↵
					</kbd>
				</Button>
			</div>
		</div>
	);
};

export default HtmlEntitiesEncoderTool;
