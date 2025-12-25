import { Link } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft, Check, Copy } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const JsonFormatter = () => {
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [error, setError] = useState("");
	const [copied, setCopied] = useState(false);

	const formatJson = useCallback(() => {
		try {
			const parsed = JSON.parse(input);
			const formatted = JSON.stringify(parsed, null, 2);
			setOutput(formatted);
			setError("");
		} catch (err) {
			setError(`Invalid JSON: ${(err as Error).message}`);
			setOutput("");
		}
	}, [input]);

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
		setInput("");
		setOutput("");
		setError("");
	};

	const loadExample = () => {
		setInput(
			'{"name":"John","age":30,"city":"New York","hobbies":["reading","coding","gaming"]}',
		);
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
				e.preventDefault();
				if (input) formatJson();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [input, formatJson]);

	return (
		<>
			<div className="container py-4 pl-2">
				<Link
					className="inline-flex items-center text-muted-foreground text-sm transition-colors hover:text-foreground"
					to="/"
				>
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back to Tools
				</Link>
			</div>

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
						onClick={formatJson}
						size="lg"
					>
						Format JSON
						<kbd className="ml-2 hidden rounded bg-black/20 px-1.5 py-0.5 font-mono text-xs sm:inline-block">
							⌘↵
						</kbd>
					</Button>
				</div>
			</div>
		</>
	);
};

export default JsonFormatter;
