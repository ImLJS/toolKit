import { AlertCircle, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToolProcessor } from "@/hooks/useToolProcessor";

const processor = (input: string) => {
	const parsed = JSON.parse(input);
	return JSON.stringify(parsed, null, 2);
};

const examples = {
	format:
		'{"name":"John","age":30,"city":"New York","hobbies":["reading","coding","gaming"]}',
};

const JsonFormatter = () => {
	const {
		input,
		setInput,
		output,
		error,
		copied,
		process,
		copyToClipboard,
		clearAll,
		loadExample,
	} = useToolProcessor({
		processor,
		examples,
	});

	return (
		<div className="space-y-6">
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
						placeholder='Paste your JSON here... e.g. {"name":"John","age":30}'
						value={input}
					/>
				</Card>

				<Card className="p-6">
					<div className="mb-4 flex items-center justify-between">
						<h2 className="font-semibold text-xl">Output</h2>
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
					</div>

					<Textarea
						className="min-h-125 bg-muted font-mono text-sm"
						placeholder="Formatted JSON will appear here..."
						readOnly
						value={output}
					/>

					{error && (
						<div className="mt-4 flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-destructive text-sm">
							<AlertCircle className="h-5 w-5 shrink-0" />
							<span>{error}</span>
						</div>
					)}
				</Card>
			</div>

			<div className="flex justify-center px-2">
				<Button
					className="w-full max-w-xs bg-[#FF8C42] text-white hover:bg-[#FF7A29]"
					disabled={!input}
					onClick={process}
					size="lg"
				>
					Format JSON
					<kbd className="ml-2 hidden rounded bg-black/20 px-1.5 py-0.5 font-mono text-xs sm:inline-block">
						⌘↵
					</kbd>
				</Button>
			</div>
		</div>
	);
};

export default JsonFormatter;
